import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="page-container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <svg
        viewBox="0 0 320 220"
        role="img"
        aria-label="An empty film studio with a camera on a tripod and a spotlight"
        className="w-full max-w-sm"
      >
        <ellipse cx="160" cy="196" rx="130" ry="12" className="fill-muted" />
        <g className="stroke-foreground" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M120 196 150 120" />
          <path d="M200 196 170 120" />
          <path d="M160 196V120" />
        </g>
        <rect x="108" y="70" width="104" height="58" rx="10" className="fill-ink" />
        <rect x="212" y="84" width="34" height="30" rx="6" className="fill-ink" />
        <circle cx="150" cy="99" r="20" className="fill-primary" />
        <circle cx="150" cy="99" r="9" className="fill-ink" />
        <circle cx="128" cy="60" r="14" className="fill-ink" />
        <circle cx="180" cy="60" r="14" className="fill-ink" />
        <g className="stroke-primary" strokeWidth="4" strokeLinecap="round">
          <path d="M40 40 62 62" />
          <path d="M26 74 56 78" />
          <path d="M70 16 76 46" />
        </g>
        <rect x="14" y="20" width="36" height="22" rx="6" transform="rotate(35 32 31)" className="fill-foreground" />
      </svg>
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="section-title mt-2">This set is empty</h1>
      <p className="section-subtitle">
        The page you are looking for has wrapped and left the building. Head
        back home and find your next studio.
      </p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        size="lg"
        className="mt-8"
      >
        <Home data-icon="inline-start" />
        Return to Home
      </Button>
    </main>
  );
}
