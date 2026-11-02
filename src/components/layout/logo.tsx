import Link from "next/link";
import { Aperture } from "lucide-react";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="StudioSpace home">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Aperture className="size-6" aria-hidden="true" />
      </span>
      <span
        className={`font-heading text-2xl font-bold tracking-tight ${
          inverted ? "text-white" : "text-foreground"
        }`}
      >
        Studio<span className="text-primary">Space</span>
      </span>
    </Link>
  );
}
