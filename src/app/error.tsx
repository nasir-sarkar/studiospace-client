"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="page-container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="section-title">Something went off script</h1>
      <p className="section-subtitle">
        The page hit an unexpected problem. Try again and we will reset the
        scene.
      </p>
      <Button className="mt-8" onClick={reset}>
        Try Again
      </Button>
    </main>
  );
}
