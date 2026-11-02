import { Suspense } from "react";
import type { Metadata } from "next";
import { StudioCard } from "@/components/studio/studio-card";
import { StudioGridSkeleton } from "@/components/studio/studio-card-skeleton";
import { EmptyStudios } from "@/components/studio/empty-studios";
import { StudioFilters } from "@/components/studio/studio-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { getStudios, type StudioFilters as Filters } from "@/lib/server-api";
import type { IStudio } from "@/lib/types/studio";

export const metadata: Metadata = {
  title: "Explore Studios",
};

async function StudioResults({ filters }: { filters: Filters }) {
  let studios: IStudio[];

  try {
    studios = await getStudios(filters);
  } catch {
    return (
      <p role="status" className="py-16 text-center text-muted-foreground">
        We could not load studios right now. Please refresh in a moment.
      </p>
    );
  }

  if (studios.length === 0) {
    return <EmptyStudios />;
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {studios.length} {studios.length === 1 ? "studio" : "studios"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <StudioCard key={studio._id} studio={studio} />
        ))}
      </div>
    </>
  );
}

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const filters: Filters = {
    search: params.search,
    category: params.category,
    sort: params.sort,
    maxRate: params.maxRate,
  };

  return (
    <main className="section-space">
      <div className="page-container">
        <p className="eyebrow">Explore Studios</p>
        <h1 className="section-title mt-2">Every creative space, one search</h1>
        <p className="section-subtitle">
          Filter by category, location and budget to find a studio that fits
          your next shoot, session or class.
        </p>

        <div className="mt-10">
          <Suspense fallback={<Skeleton className="h-[74px] w-full rounded-2xl" />}>
            <StudioFilters />
          </Suspense>
        </div>

        <div className="mt-8">
          <Suspense key={JSON.stringify(filters)} fallback={<StudioGridSkeleton />}>
            <StudioResults filters={filters} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
