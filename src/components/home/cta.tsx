import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="section-space">
      <div className="page-container">
        <div className="flex flex-col items-center rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:py-16">
          <h2
            id="cta-heading"
            className="max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Got a space that creators would love?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed opacity-90">
            List your studio in minutes, set your own hourly rate and start
            earning from the hours your space would otherwise sit empty.
          </p>
          <Button
            render={<Link href="/add-studio" />}
            nativeButton={false}
            size="lg"
            variant="secondary"
            className="mt-8"
          >
            List Your Studio
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
