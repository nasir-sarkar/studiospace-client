"use client";

import { Heart } from "lucide-react";
import { cn } from "cn";
import { useWishlist } from "@/components/providers/wishlist-provider";

export function WishlistButton({ studioId }: { studioId: string }) {
  const { savedIds, toggle } = useWishlist();
  const isSaved = savedIds.includes(studioId);

  return (
    <button
      type="button"
      onClick={() => toggle(studioId)}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from saved studios" : "Save studio"}
      className="flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
    >
      <Heart
        className={cn("size-5", isSaved ? "fill-primary text-primary" : "text-foreground")}
      />
    </button>
  );
}
