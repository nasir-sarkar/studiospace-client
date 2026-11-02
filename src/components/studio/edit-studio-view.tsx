"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/components/providers/session-provider";
import { useApiData } from "@/hooks/use-api-data";
import type { IStudio } from "@/lib/types/studio";
import { StudioForm, studioToFormValues } from "./studio-form";

export function EditStudioView({ studioId }: { studioId: string }) {
  const router = useRouter();
  const { user, ready } = useSession();
  const { data: studio, loading, error } = useApiData<IStudio>(
    ready ? `/studios/${studioId}` : null,
  );

  const notAllowed = Boolean(studio && user && studio.ownerEmail !== user.email);

  useEffect(() => {
    if (notAllowed) {
      toast.error("You can only edit studios that you own.");
      router.replace("/my-listings");
    }
  }, [notAllowed, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.replace("/my-listings");
    }
  }, [error, router]);

  if (loading || !studio || notAllowed) {
    return (
      <div role="status" aria-label="Loading studio" className="grid gap-5 rounded-2xl border border-border bg-card p-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <StudioForm
      mode="edit"
      studioId={studio._id}
      initialValues={studioToFormValues(studio)}
    />
  );
}
