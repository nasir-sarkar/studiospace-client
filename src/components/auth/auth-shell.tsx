import { Suspense } from "react";
import { Aperture } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Aperture className="size-7" />
            </span>
            <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">{description}</p>
          </div>
          <Suspense fallback={<Skeleton className="h-72 w-full" />}>{children}</Suspense>
        </div>
      </div>
    </main>
  );
}
