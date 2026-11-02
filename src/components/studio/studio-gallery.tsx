"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "cn";
import { StudioImage } from "./studio-image";

export function StudioGallery({ images, title }: { images: string[]; title: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        opts={{ loop: images.length > 1 }}
        aria-label={`${title} photo gallery`}
        className="overflow-hidden rounded-2xl"
      >
        <CarouselContent className="ml-0">
          {images.map((image, index) => (
            <CarouselItem key={`${image}-${index}`} className="pl-0">
              <div className="relative aspect-[16/10] w-full bg-muted">
                <StudioImage
                  src={image}
                  alt={`${title} photo ${index + 1}`}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-3 size-10 border-0 bg-background/90" />
            <CarouselNext className="right-3 size-10 border-0 bg-background/90" />
            <span className="absolute right-3 bottom-3 rounded-md bg-ink/80 px-2.5 py-1 text-xs font-medium text-ink-foreground">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={`${image}-thumb-${index}`}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Show photo ${index + 1}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg border-2 bg-muted transition-opacity",
                current === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <StudioImage src={image} alt="" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
