"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, PlusCircle, Store, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "@/components/providers/session-provider";
import { useApiData } from "@/hooks/use-api-data";
import { apiFetch } from "@/lib/api";
import type { IStudio } from "@/lib/types/studio";
import { RatingBadge } from "./rating-badge";
import { StudioImage } from "./studio-image";

export function MyListingsView() {
  const { ready } = useSession();
  const { data, loading, error, setData } = useApiData<IStudio[]>(
    ready ? "/my-studios" : null,
  );
  const [target, setTarget] = useState<IStudio | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!target) {
      return;
    }

    setDeleting(true);
    try {
      await apiFetch(`/studios/${target._id}`, { method: "DELETE" });
      setData((current) => (current || []).filter((item) => item._id !== target._id));
      toast.success(`"${target.title}" was deleted from your listings.`);
      setTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete this studio.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div role="status" aria-label="Loading your listings" className="grid gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p role="alert" className="py-12 text-center text-destructive">{error}</p>;
  }

  if (!data || data.length === 0) {
    return (
      <Empty className="border py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Store />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold">You have no studio listings yet</EmptyTitle>
          <EmptyDescription>
            List your first space and start earning from the hours it would
            otherwise sit empty.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/add-studio" />} nativeButton={false}>
            <PlusCircle data-icon="inline-start" />
            Add New Studio
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-64 pl-4">Studio</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="pr-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((studio) => (
              <TableRow key={studio._id}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <StudioImage src={studio.imageUrl} alt={studio.title} sizes="56px" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/studios/${studio._id}`}
                        className="line-clamp-1 font-semibold text-foreground hover:text-primary"
                      >
                        {studio.title}
                      </Link>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{studio.location}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{studio.category}</Badge>
                </TableCell>
                <TableCell className="font-semibold">${studio.hourlyRate} / hr</TableCell>
                <TableCell>{studio.maxCapacity}</TableCell>
                <TableCell>
                  <RatingBadge rating={studio.rating} count={studio.reviewCount} />
                </TableCell>
                <TableCell className="pr-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      render={<Link href={`/studios/edit/${studio._id}`} />}
                      nativeButton={false}
                      variant="outline"
                      size="sm"
                    >
                      <Pencil data-icon="inline-start" />
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setTarget(studio)}
                    >
                      <Trash2 data-icon="inline-start" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={Boolean(target)} onOpenChange={(open) => !open && setTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this studio listing?</AlertDialogTitle>
            <AlertDialogDescription>
              {target
                ? `"${target.title}" and its reviews will be permanently removed. This action cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Keep Listing</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Deleting" : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
