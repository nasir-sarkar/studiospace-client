"use client";

import { useState } from "react";
import Image from "next/image";
import { Aperture } from "lucide-react";
import { cn } from "cn";

interface StudioImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function StudioImage({ src, alt, sizes, priority, className }: StudioImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-muted text-primary",
          className,
        )}
      >
        <Aperture className="size-10" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setFailedSrc(src)}
    />
  );
}
