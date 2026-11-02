"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, Download, MapPin, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IBooking } from "@/lib/types/booking";
import { downloadInvoice } from "@/lib/invoice";
import { BookingStatusBadge } from "./booking-status-badge";

interface MyBookingCardProps {
  booking: IBooking;
  onCancel: (booking: IBooking) => void;
}

export function MyBookingCard({ booking, onCancel }: MyBookingCardProps) {
  const canDownload = booking.status === "Confirmed" || booking.status === "Completed";

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full shrink-0 bg-muted md:h-auto md:w-64">
          {booking.studioImage && (
            <Image
              src={booking.studioImage}
              alt={booking.studioTitle}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link
                href={`/studios/${booking.studioId}`}
                className="text-xl font-semibold text-foreground hover:text-primary"
              >
                {booking.studioTitle}
              </Link>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {booking.studioLocation}
              </p>
            </div>
            <BookingStatusBadge status={booking.status} />
          </div>

          <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              {booking.date}
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="size-4" />
              {booking.startTime} - {booking.endTime} ({booking.hours} hrs)
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-bold text-foreground">${booking.totalPrice.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">
                Includes ${booking.securityDeposit.toFixed(2)} security deposit
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {canDownload && (
                <Button variant="outline" onClick={() => downloadInvoice(booking)}>
                  <Download data-icon="inline-start" />
                  Invoice PDF
                </Button>
              )}
              {booking.status === "Pending" && (
                <Button variant="destructive" onClick={() => onCancel(booking)}>
                  <XCircle data-icon="inline-start" />
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
