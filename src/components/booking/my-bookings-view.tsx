"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarX2 } from "lucide-react";
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
import { useSession } from "@/components/providers/session-provider";
import { useApiData } from "@/hooks/use-api-data";
import { apiFetch } from "@/lib/api";
import type { IBooking } from "@/lib/types/booking";
import { MyBookingCard } from "./my-booking-card";

export function MyBookingsView() {
  const { ready } = useSession();
  const { data, loading, error, setData } = useApiData<IBooking[]>(
    ready ? "/my-bookings" : null,
  );
  const [target, setTarget] = useState<IBooking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!target) {
      return;
    }

    setCancelling(true);
    try {
      await apiFetch(`/bookings/${target._id}/cancel`, { method: "PATCH" });
      setData((current) =>
        (current || []).map((item) =>
          item._id === target._id ? { ...item, status: "Cancelled" } : item,
        ),
      );
      toast.success("Your booking request was cancelled.");
      setTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not cancel this booking.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div role="status" aria-label="Loading your bookings" className="grid gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-48 w-full rounded-2xl" />
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
            <CalendarX2 />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold">No bookings yet</EmptyTitle>
          <EmptyDescription>
            Your reserved studio slots will appear here. Find a space and lock
            in your next session.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/studios" />} nativeButton={false}>
            Explore Studios
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      <div className="grid gap-5">
        {data.map((booking) => (
          <MyBookingCard key={booking._id} booking={booking} onCancel={setTarget} />
        ))}
      </div>

      <AlertDialog open={Boolean(target)} onOpenChange={(open) => !open && setTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              {target
                ? `Your pending request for "${target.studioTitle}" on ${target.date} will be cancelled and the slot released.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelling}>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={cancelling}
              onClick={handleCancel}
            >
              {cancelling ? "Cancelling" : "Yes, Cancel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
