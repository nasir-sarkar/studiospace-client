import Link from "next/link";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IStudio } from "@/lib/types/studio";
import { RatingBadge } from "./rating-badge";
import { StudioImage } from "./studio-image";
import { WishlistButton } from "./wishlist-button";

export function StudioCard({ studio }: { studio: IStudio }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <StudioImage
          src={studio.imageUrl}
          alt={studio.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-ink/85 text-ink-foreground backdrop-blur-sm">
          {studio.category}
        </Badge>
        <div className="absolute top-3 right-3">
          <WishlistButton studioId={studio._id} />
        </div>
        <div className="absolute bottom-3 left-3">
          <RatingBadge rating={studio.rating} count={studio.reviewCount} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-xl font-semibold text-foreground">
          {studio.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="size-4 shrink-0" />
          Up to {studio.maxCapacity} people
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-2xl font-bold text-foreground">
            ${studio.hourlyRate}
            <span className="text-sm font-normal text-muted-foreground"> / hr</span>
          </p>
          <Button render={<Link href={`/studios/${studio._id}`} />} nativeButton={false}>
            View Details
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </article>
  );
}
