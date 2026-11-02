import { Aperture } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
    >
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
        <Aperture className="size-9 animate-spin [animation-duration:1.6s]" />
      </span>
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        Setting up the studio lights
      </p>
    </div>
  );
}
