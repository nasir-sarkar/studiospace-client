import type { Metadata } from "next";
import { MyBookingsView } from "@/components/booking/my-bookings-view";

export const metadata: Metadata = {
  title: "My Bookings",
};

export default function MyBookingsPage() {
  return (
    <main className="section-space">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <p className="eyebrow">Your Reservations</p>
        <h1 className="section-title mt-2">My bookings</h1>
        <p className="section-subtitle">
          Track every request, cancel pending slots and download invoices for
          confirmed sessions.
        </p>
        <div className="mt-10">
          <MyBookingsView />
        </div>
      </div>
    </main>
  );
}
