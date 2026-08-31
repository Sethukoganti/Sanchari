"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/data/content";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(gallery.map((g) => g.category)))];

export function GalleryGrid() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () =>
      category === "All"
        ? gallery
        : gallery.filter((g) => g.category === category),
    [category],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setActive(
          (i) => (i === null ? i : (i - 1 + items.length) % items.length),
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, items.length]);

  const current = active !== null ? items[active] : null;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              setActive(null);
            }}
            className={cn("chip", category === c && "chip-active")}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="masonry">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="group relative w-full overflow-hidden rounded-[14px] text-left shadow-md"
            onClick={() => setActive(index)}
            aria-label={`Open ${item.title}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={index % 3 === 0 ? 1000 : 700}
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-dusk-ink/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 p-4 text-warm-white opacity-0 transition group-hover:opacity-100">
              <span className="block text-xs uppercase tracking-wider text-turmeric">
                {item.category} · {item.location}
              </span>
              <span className="font-display text-xl">{item.title}</span>
            </span>
          </button>
        ))}
      </div>

      {current && active !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-warm-white/10 text-warm-white hover:bg-warm-white/20"
            aria-label="Close lightbox"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-warm-white/10 text-warm-white hover:bg-warm-white/20 sm:left-6"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) =>
                i === null ? i : (i - 1 + items.length) % items.length,
              );
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-warm-white/10 text-warm-white hover:bg-warm-white/20 sm:right-6"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? i : (i + 1) % items.length));
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 text-center text-warm-white">
              <p className="font-display text-2xl">{current.title}</p>
              <p className="mt-1 text-sm text-warm-white/70">
                {current.caption} · {current.location}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
