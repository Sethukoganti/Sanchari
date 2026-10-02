"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { gallery } from "@/data/content";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: string[] = [
  "All",
  ...Array.from(new Set(gallery.map((g: GalleryItem) => g.category))),
];

export function GalleryGrid() {
  const [category, setCategory] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () =>
      category === "All"
        ? gallery
        : gallery.filter((g: GalleryItem) => g.category === category),
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
        {categories.map((c: string) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              setActive(null);
            }}
            className={cn("chip !py-1.5 !px-3.5 text-xs font-semibold", category === c && "chip-active")}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="masonry">
        {items.map((item: GalleryItem, index: number) => (
          <button
            key={item.id}
            type="button"
            className="group relative w-full overflow-hidden rounded-2xl border border-white/10 text-left shadow-lg transition duration-300 hover:scale-[1.02] hover:border-turmeric cursor-pointer bg-black/60"
            onClick={() => setActive(index)}
            aria-label={`Open ${item.title || item.caption || "photo"}`}
          >
            <Image
              src={item.image}
              alt={item.title || item.caption || "India travel photography"}
              width={800}
              height={index % 3 === 0 ? 1000 : 700}
              className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-white opacity-0 transition group-hover:opacity-100">
              <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-turmeric">
                {item.category} · {item.location}
              </span>
              <span className="font-display text-xl font-bold">{item.title || item.caption}</span>
            </span>
          </button>
        ))}
      </div>

      {current && active !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={current.title || current.caption || "Image"}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-turmeric hover:text-black cursor-pointer"
            aria-label="Close lightbox"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white transition hover:bg-turmeric hover:text-black sm:left-6 cursor-pointer"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) =>
                i === null ? i : (i - 1 + items.length) % items.length,
              );
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white transition hover:bg-turmeric hover:text-black sm:right-6 cursor-pointer"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? i : (i + 1) % items.length));
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-turmeric/30 bg-black/80 shadow-2xl">
              <Image
                src={current.image}
                alt={current.title || current.caption || "Gallery photo"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 text-center text-white">
              <p className="font-display text-2xl font-bold">{current.title || current.caption}</p>
              <p className="mt-1 text-sm text-zinc-300">
                {current.caption} · <span className="text-turmeric">{current.location}</span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
