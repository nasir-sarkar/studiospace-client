import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedStudios } from "@/lib/server-api";
import type { IStudio } from "@/lib/types/studio";
import { StudioCard } from "@/components/studio/studio-card";
import { StudioGridSkeleton } from "@/components/studio/studio-card-skeleton";

async function FeaturedStudios() {
  let studios: IStudio[];

  try {
    studios = await getFeaturedStudios();
  } catch {
    return (
      <p role="status" className="py-16 text-center text-muted-foreground">
        Featured studios are unavailable right now. Please try again shortly.
      </p>
    );
  }

  if (!Array.isArray(studios) || studios.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        New studios are on their way. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

export default function Featured() {
  return (
    <section aria-labelledby="featured-heading" className="section-space">
      <div className="page-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Top Rated And Newest</p>
            <h2 id="featured-heading" className="section-title mt-2">
              Featured Studios
            </h2>
            <p className="section-subtitle">
              Hand-picked creative spaces loved by the community, ready to book
              for your next shoot, session or class.
            </p>
          </div>
          <Button
            render={<Link href="/studios" />}
            nativeButton={false}
            variant="outline"
          >
            All Studios
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <Suspense fallback={<StudioGridSkeleton />}>
          <FeaturedStudios />
        </Suspense>
      </div>
    </section>
  );
}
