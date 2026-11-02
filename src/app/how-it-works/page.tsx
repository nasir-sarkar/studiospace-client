import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
};

const creatorSteps = [
  { title: "Search and filter", text: "Browse studios by category, city and hourly budget. Save favourites with the heart icon." },
  { title: "Pick your hours", text: "Open a studio, choose a date and time window, and see the full price including the deposit." },
  { title: "Send your request", text: "Your booking starts as Pending. You can cancel it any time before the host confirms." },
  { title: "Show up and create", text: "Once confirmed, download your PDF invoice and arrive ready to work." },
];

const hostSteps = [
  { title: "List your space", text: "Add photos, amenities, your hourly rate and a security deposit in a single form." },
  { title: "Review requests", text: "Confirm or decline requests from your dashboard. Overlapping confirmed slots are blocked automatically." },
  { title: "Host and complete", text: "Mark sessions as completed and watch your earnings build up." },
];

export default function HowItWorksPage() {
  return (
    <main className="section-space">
      <div className="page-container">
        <p className="eyebrow">How It Works</p>
        <h1 className="section-title mt-2">Booking and hosting, made simple</h1>
        <p className="section-subtitle">
          StudioSpace connects creators with spaces in a few clear steps, with
          transparent pricing on both sides.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {[
            { heading: "For creators", steps: creatorSteps },
            { heading: "For hosts", steps: hostSteps },
          ].map((group) => (
            <section key={group.heading}>
              <h2 className="text-2xl font-semibold text-foreground">{group.heading}</h2>
              <ol className="mt-6 grid gap-4">
                {group.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button render={<Link href="/studios" />} nativeButton={false} size="lg">
            Explore Studios
          </Button>
          <Button render={<Link href="/add-studio" />} nativeButton={false} size="lg" variant="outline">
            Host Your Space
          </Button>
        </div>
      </div>
    </main>
  );
}
