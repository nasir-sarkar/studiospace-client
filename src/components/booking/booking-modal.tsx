"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, Clock3, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/components/providers/session-provider";
import { apiFetch } from "@/lib/api";
import { timeOptions } from "@/lib/constants";
import type { IStudio } from "@/lib/types/studio";

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export function BookingModal({ studio }: { studio: IStudio }) {
  const router = useRouter();
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isOwner = user?.email === studio.ownerEmail;
  const hours = Math.max(0, (toMinutes(endTime) - toMinutes(startTime)) / 60);
  const subtotal = hours * studio.hourlyRate;
  const total = subtotal + studio.securityDeposit;
  const endOptions = timeOptions.filter((time) => toMinutes(time) > toMinutes(startTime));
  const today = new Date().toISOString().slice(0, 10);

  const handleOpen = () => {
    if (!user) {
      toast.info("Please login to book this studio.");
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }
    if (isOwner) {
      toast.error("You cannot book your own studio.");
      return;
    }
    setError("");
    setOpen(true);
  };

  const handleStartChange = (value: string | null) => {
    const next = value ?? "10:00";
    setStartTime(next);
    if (toMinutes(endTime) <= toMinutes(next)) {
      const bumped = timeOptions.find((time) => toMinutes(time) >= toMinutes(next) + 60);
      setEndTime(bumped ?? next);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (hours < 1) {
      setError("Please choose at least one hour for your session.");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({
          studioId: studio._id,
          date,
          startTime,
          endTime,
          note,
        }),
      });
      toast.success("Booking request sent. The host will confirm your slot soon.");
      setOpen(false);
      router.push("/my-bookings");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Booking failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button size="lg" className="w-full" onClick={handleOpen}>
        <CalendarCheck data-icon="inline-start" />
        Book Workspace Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Book {studio.title}</DialogTitle>
            <DialogDescription>
              Choose your shoot hours. The host reviews every request and
              confirmed slots are protected from double-booking.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="booking-date">Date</Label>
              <Input
                id="booking-date"
                type="date"
                min={today}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start time</Label>
                <Select value={startTime} onValueChange={handleStartChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.slice(0, -2).map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>End time</Label>
                <Select value={endTime} onValueChange={(value) => setEndTime(value ?? endTime)}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {endOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="booking-note">Note for the host (optional)</Label>
              <Textarea
                id="booking-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Tell the host about your crew size, gear or setup needs"
                className="min-h-20"
              />
            </div>

            <div className="rounded-xl bg-muted p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock3 className="size-4" />
                  {hours} {hours === 1 ? "hour" : "hours"} × ${studio.hourlyRate}
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="size-4" />
                  Security deposit
                </span>
                <span className="font-medium">${studio.securityDeposit.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={submitting}>
              {submitting && <Spinner />}
              {submitting ? "Sending Request" : "Confirm Booking Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
