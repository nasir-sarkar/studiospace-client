import { cn } from "cn";
import type { BookingStatus } from "@/lib/types/booking";

const styles: Record<BookingStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
  Confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  Completed: "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300",
  Cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}
