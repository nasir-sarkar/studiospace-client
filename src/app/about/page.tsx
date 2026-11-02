import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
};

const values = [
  { title: "Creators first", text: "Every feature starts with the question: does this help someone make their work sooner?" },
  { title: "Honest pricing", text: "Hourly rate, deposit and total are shown before you book. No hidden fees." },
  { title: "Trusted spaces", text: "Verified accounts, clear reviews and double-booking protection keep sessions smooth." },
];

export default function AboutPage() {
  return (
    <main className="section-space">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <p className="eyebrow">About Us</p>
        <h1 className="section-title mt-2">A marketplace built for people who make things</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          StudioSpace is a peer-to-peer marketplace for creative workspaces.
          Photographers, filmmakers, podcasters, musicians and artists find
          the right room by the hour, while hosts turn idle studio time into
          income.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We started StudioSpace because renting a studio often meant long
          phone calls, unclear rates and last-minute surprises. Our platform
          puts availability, pricing and host details in one place so creators
          can book with confidence.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">{value.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>

        <Button render={<Link href="/studios" />} nativeButton={false} size="lg" className="mt-12">
          Start Exploring
        </Button>
      </div>
    </main>
  );
}
