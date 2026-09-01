"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides, SITE } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [reduced]);

  const slide = heroSlides[index];

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-navy text-white">
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(196,30,58,0.32),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(212,175,55,0.12),transparent_40%),linear-gradient(to_right,rgba(14,5,7,0.94),rgba(20,5,8,0.74),rgba(14,5,7,0.3))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0507] via-transparent to-black/40" />
        </div>
      ))}

      <div className="relative container-site section-pad flex min-h-[92vh] flex-col justify-end pb-24 pt-32 lg:pb-32">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            {SITE.name} · {slide.subtitle}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.8rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-balance text-white drop-shadow-md">
            {lang !== "en" ? t.tagline : slide.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            {lang === "hi"
              ? "सिनेमाई मार्ग, जीवंत उत्सव, और असली रफ़्तार वाली यात्रा योजनाएँ—ब्रोशर की भागदौड़ नहीं।"
              : "Cinematic routes, living festivals, and itineraries paced for real transfer times—not brochure sprints across a billion stories."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/destinations" className="btn-primary">
              {t.home.explore}
            </Link>
            <Link href="/plan" className="btn-secondary">
              {t.home.plan}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex gap-2" role="tablist" aria-label="Hero slides">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}: ${s.subtitle}`}
              className={cn(
                "h-1.5 rounded-full transition-all cursor-pointer",
                i === index
                  ? "w-10 bg-gradient-to-r from-[#D4AF37] to-[#F7EAC8] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                  : "w-3 bg-white/30 hover:bg-white/60",
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
