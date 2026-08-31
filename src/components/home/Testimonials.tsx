"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const item = testimonials[index];

  return (
    <section
      className="bg-navy py-20 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-site section-pad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-turmeric">
              Traveler letters
            </p>
            <h2
              id="testimonials-heading"
              className="mt-2 font-display text-3xl sm:text-4xl"
            >
              {t.home.testimonials}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/25 hover:border-turmeric hover:text-turmeric"
              aria-label="Previous testimonial"
              onClick={() =>
                setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/25 hover:border-turmeric hover:text-turmeric"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-turmeric text-turmeric"
                  aria-hidden
                />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-2xl leading-snug sm:text-3xl lg:text-4xl">
              “{item.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </span>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-warm-white/60">
                  {item.location} · {item.trip}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="flex gap-2 lg:flex-col">
              {testimonials.map((tm, i) => (
                <button
                  key={tm.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-sm transition",
                    i === index
                      ? "border-turmeric bg-turmeric/10 text-warm-white"
                      : "border-warm-white/15 text-warm-white/60 hover:border-warm-white/30",
                  )}
                  aria-current={i === index}
                >
                  {tm.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
