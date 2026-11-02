"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { syncSession } from "@/lib/api";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface SessionContextValue {
  user: SessionUser | null;
  ready: boolean;
}

const SessionContext = createContext<SessionContextValue>({
  user: null,
  ready: false,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const user = (session?.user as SessionUser | undefined) ?? null;
  const userId = user?.id;
  const userEmail = user?.email;
  const [syncedFor, setSyncedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let active = true;

    const verifyCookie = async () => {
      const res = await fetch("/server-api/auth/me", {
        credentials: "include",
      });
      const me = res.ok ? await res.json() : null;
      if (!me || me.email !== userEmail) {
        await syncSession();
      }
      if (active) {
        setSyncedFor(userId);
      }
    };

    verifyCookie().catch(() => {
      if (active) {
        setSyncedFor(userId);
      }
    });

    return () => {
      active = false;
    };
  }, [userId, userEmail]);

  const ready = !isPending && (!userId || syncedFor === userId);

  return (
    <SessionContext.Provider value={{ user, ready }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
