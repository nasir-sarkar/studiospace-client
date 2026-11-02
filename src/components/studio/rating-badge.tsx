import { Star } from "lucide-react";

export function RatingBadge({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-background/95 px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
      <Star className="size-3.5 fill-amber-400 text-amber-400" />
      {rating > 0 ? rating.toFixed(1) : "New"}
      {count ? (
        <span className="font-normal text-muted-foreground">({count})</span>
      ) : null}
    </span>
  );
}
