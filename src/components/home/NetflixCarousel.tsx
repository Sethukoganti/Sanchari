"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NetflixCarouselProps {
  title: string;
  subtitle?: string;
  destinations: Destination[];
  viewAllHref?: string;
  badge?: string;
}

export function NetflixCarousel({
  title,
  subtitle,
  destinations,
  viewAllHref,
  badge,
}: NetflixCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-4">
      {/* Header Row with Arrows */}
      <div className="flex items-end justify-between gap-4">
        <div>
          {badge && (
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-turmeric block mb-1">
              {badge}
            </span>
          )}
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-warm-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-muted-gray">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Actions: View All & Carousel Arrows */}
        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-xs font-bold text-turmeric hover:underline hidden sm:inline"
            >
              Explore all →
            </Link>
          )}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:border-turmeric hover:bg-turmeric hover:text-black transition-all cursor-pointer shadow-md"
              title="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:border-turmeric hover:bg-turmeric hover:text-black transition-all cursor-pointer shadow-md"
              title="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 hide-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {destinations.map((dest) => (
          <Link
            key={dest.id}
            href={`/destinations/${dest.slug}`}
            className="group relative flex-none w-[280px] sm:w-[320px] lg:w-[360px] snap-start rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-turmeric/50 hover:shadow-2xl hover:shadow-turmeric/15"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />

              {/* Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-full bg-black/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-turmeric border border-turmeric/30 backdrop-blur-md">
                  {dest.region}
                </span>
                <span className="rounded-full bg-black/80 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-teal-300 border border-teal-500/30 backdrop-blur-md">
                  {dest.status}
                </span>
              </div>

              <div className="absolute bottom-2.5 left-3 text-xs text-zinc-300 font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3 text-turmeric" />
                <span>{dest.state}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-warm-white group-hover:text-turmeric transition-colors">
                    {dest.name}
                  </h3>
                  <span className="font-hindi text-sm font-semibold text-turmeric/80">
                    {dest.nameHi}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-gray line-clamp-2 leading-relaxed font-body">
                  {dest.tagline || dest.summary}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2.5 text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3 text-turmeric" />
                  {dest.duration}
                </span>
                <span className="text-turmeric font-semibold group-hover:underline">
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

