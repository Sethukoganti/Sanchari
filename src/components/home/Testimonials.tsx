"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [paused]);

  const item = testimonials[index] || testimonials[0];

  return (
    <section
      className="relative section-pad py-20 lg:py-28 bg-navy-deep text-[#F8FAFC] border-t border-white/5 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-saffron block mb-1">
              Explorer Letters & Community Stories
            </span>
            <h2
              id="testimonials-heading"
              className="font-display text-3xl sm:text-4xl font-extrabold text-warm-white"
            >
              Stories from Fellow Travelers
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:border-saffron hover:bg-saffron hover:text-black transition-all cursor-pointer"
              aria-label="Previous testimonial"
              onClick={() =>
                setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:border-saffron hover:bg-saffron hover:text-black transition-all cursor-pointer"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 card-surface p-8 sm:p-12 bg-navy-surface/60 border-white/10 grid gap-8 lg:grid-cols-12 lg:items-center rounded-3xl">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-1.5" aria-label={`${item.rating || 5} out of 5 stars`}>
              {Array.from({ length: item.rating || 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-300 text-amber-300"
                />
              ))}
            </div>

            <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-warm-white leading-snug">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 pt-2">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-saffron/30">
                <Image
                  src={item.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-warm-white">{item.name}</p>
                <p className="text-xs text-muted-gray">
                  {item.location} · <span className="text-saffron">{item.trip || item.destination}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            {testimonials.map((tm, i) => (
              <button
                key={tm.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "rounded-2xl border p-4 text-left text-xs font-semibold transition-all cursor-pointer",
                  i === index
                    ? "border-saffron/50 bg-saffron/15 text-warm-white shadow-md shadow-saffron/10"
                    : "border-white/5 bg-navy-dark/60 text-muted-gray hover:border-white/20 hover:text-white",
                )}
              >
                <p className="font-display text-sm font-bold text-warm-white">{tm.name}</p>
                <p className="text-[11px] text-muted-gray">{tm.trip || tm.destination}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
