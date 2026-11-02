import { CalendarClock, Clapperboard, Search, Zap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Spaces",
    text: "Filter by category, location and hourly budget to shortlist studios that fit your production.",
  },
  {
    icon: CalendarClock,
    title: "Select Shoot Hours",
    text: "Pick your date and time window and see the full price with the security deposit up front.",
  },
  {
    icon: Zap,
    title: "Book Instantly",
    text: "Send your request in one click. Hosts confirm quickly and double-bookings are blocked automatically.",
  },
  {
    icon: Clapperboard,
    title: "Create & Produce",
    text: "Arrive, set up and make something great. Download your invoice once the booking is confirmed.",
  },
];

export function HowBookingWorks() {
  return (
    <section aria-labelledby="how-heading" className="section-space">
      <div className="page-container">
        <div className="text-center">
          <p className="eyebrow">How Booking Works</p>
          <h2 id="how-heading" className="section-title mt-2">
            From search to set in four steps
          </h2>
          <p className="section-subtitle mx-auto">
            Booking a studio should take minutes, not days of back-and-forth.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="absolute top-5 right-6 font-heading text-5xl font-bold text-primary/15">
                {index + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
