"use client";

import Link from "next/link";
import { CalendarCheck, DollarSign, Heart, Inbox, Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Empty,
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
import { BookingStatusBadge } from "@/components/booking/booking-status-badge";
import { useSession } from "@/components/providers/session-provider";
import { StudioCard } from "@/components/studio/studio-card";
import { useApiData } from "@/hooks/use-api-data";
import { apiFetch } from "@/lib/api";
import type { BookingStatus, IBooking, IDashboardStats } from "@/lib/types/booking";
import type { IStudio } from "@/lib/types/studio";

export function DashboardView() {
  const { user, ready } = useSession();
  const stats = useApiData<IDashboardStats>(ready ? "/dashboard" : null);
  const requests = useApiData<IBooking[]>(ready ? "/host-bookings" : null);
  const saved = useApiData<IStudio[]>(ready ? "/wishlist" : null);

  const updateStatus = async (booking: IBooking, status: BookingStatus) => {
    try {
      await apiFetch(`/bookings/${booking._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      requests.setData((current) =>
        (current || []).map((item) =>
          item._id === booking._id ? { ...item, status } : item,
        ),
      );
      stats.reload();
      toast.success(`Booking marked as ${status.toLowerCase()}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update the booking.");
    }
  };

  const cards = [
    { label: "My Listings", value: stats.data?.listings, icon: Store },
    { label: "My Bookings", value: stats.data?.myBookings, icon: CalendarCheck },
    { label: "Pending Requests", value: stats.data?.pendingRequests, icon: Inbox },
    { label: "Saved Studios", value: stats.data?.saved, icon: Heart },
    {
      label: "Host Earnings",
      value: stats.data ? `$${stats.data.earnings.toFixed(2)}` : undefined,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid gap-12">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome, {user?.name}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                <card.icon className="size-5" />
              </span>
              {card.value === undefined ? (
                <Skeleton className="mt-4 h-8 w-16" />
              ) : (
                <p className="mt-4 text-3xl font-bold text-foreground">{card.value}</p>
              )}
              <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-foreground">Booking Requests For Your Studios</h2>
        <div className="mt-6">
          {requests.loading ? (
            <Skeleton className="h-40 w-full rounded-2xl" />
          ) : !requests.data || requests.data.length === 0 ? (
            <Empty className="border py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Inbox />
                </EmptyMedia>
                <EmptyTitle className="text-xl font-semibold">No booking requests yet</EmptyTitle>
                <EmptyDescription>
                  When creators request a slot at one of your studios, it will show up here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Studio</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Slot</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.data.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="pl-4 font-semibold">{booking.studioTitle}</TableCell>
                      <TableCell>
                        <p>{booking.userName}</p>
                        <p className="text-xs text-muted-foreground">{booking.userEmail}</p>
                      </TableCell>
                      <TableCell>
                        <p>{booking.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </TableCell>
                      <TableCell className="font-semibold">${booking.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <BookingStatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell className="pr-4">
                        <div className="flex justify-end gap-2">
                          {booking.status === "Pending" && (
                            <>
                              <Button size="sm" onClick={() => updateStatus(booking, "Confirmed")}>
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateStatus(booking, "Cancelled")}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                          {booking.status === "Confirmed" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(booking, "Completed")}
                              >
                                Mark Completed
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateStatus(booking, "Cancelled")}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground">Saved Studios</h2>
        <div className="mt-6">
          {saved.loading ? (
            <Skeleton className="h-64 w-full rounded-2xl" />
          ) : !saved.data || saved.data.length === 0 ? (
            <Empty className="border py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Heart />
                </EmptyMedia>
                <EmptyTitle className="text-xl font-semibold">Nothing saved yet</EmptyTitle>
                <EmptyDescription>
                  Tap the heart on any studio card to keep it here for later.
                </EmptyDescription>
              </EmptyHeader>
              <Button render={<Link href="/studios" />} nativeButton={false}>
                Explore Studios
              </Button>
            </Empty>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {saved.data.map((studio) => (
                <StudioCard key={studio._id} studio={studio} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
