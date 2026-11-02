"use client";

import Link from "next/link";
import Image from "next/image";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/constants";

export function Banner() {
  return (
    <section className="relative w-full bg-ink">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper h-[calc(100svh-4rem)] min-h-[560px]"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
              <div className="page-container relative z-10 flex h-full items-center">
                <div className="max-w-2xl text-white">
                  <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-4 font-heading text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                    {slide.text}
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Button
                      render={<Link href="/studios" />}
                      nativeButton={false}
                      size="lg"
                    >
                      Explore Studios
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                    <Button
                      render={<Link href="/studios" />}
                      nativeButton={false}
                      size="lg"
                      variant="outline"
                      className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                    >
                      Host Your Space
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
