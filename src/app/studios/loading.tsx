import { StudioGridSkeleton } from "@/components/studio/studio-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="section-space">
      <div className="page-container">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-4 h-10 w-full max-w-lg" />
        <Skeleton className="mt-10 h-[74px] w-full rounded-2xl" />
        <div className="mt-8">
          <StudioGridSkeleton />
        </div>
      </div>
    </main>
  );
}
