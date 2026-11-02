"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { IStudio } from "@/lib/types/studio";
import { useSession } from "./session-provider";

interface WishlistContextValue {
  savedIds: string[];
  toggle: (studioId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue>({
  savedIds: [],
  toggle: async () => {},
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user, ready } = useSession();
  const [saved, setSaved] = useState<{ email: string; ids: string[] }>({
    email: "",
    ids: [],
  });
  const email = user?.email;

  useEffect(() => {
    if (!ready || !email) {
      return;
    }

    let active = true;

    apiFetch<IStudio[]>("/wishlist")
      .then((studios) => {
        if (active) {
          setSaved({ email, ids: studios.map((studio) => studio._id) });
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [ready, email]);

  const savedIds = useMemo(
    () => (email && saved.email === email ? saved.ids : []),
    [email, saved],
  );

  const toggle = useCallback(
    async (studioId: string) => {
      if (!email) {
        toast.info("Please login to save studios to your wishlist.");
        return;
      }

      const isSaved = savedIds.includes(studioId);
      setSaved({
        email,
        ids: isSaved
          ? savedIds.filter((id) => id !== studioId)
          : [...savedIds, studioId],
      });

      try {
        await apiFetch(`/wishlist/${studioId}`, {
          method: isSaved ? "DELETE" : "POST",
        });
        toast.success(
          isSaved ? "Removed from your saved studios." : "Studio saved to your wishlist.",
        );
      } catch (error) {
        setSaved({ email, ids: savedIds });
        toast.error(
          error instanceof Error ? error.message : "Could not update your wishlist.",
        );
      }
    },
    [email, savedIds],
  );

  return (
    <WishlistContext.Provider value={{ savedIds, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
