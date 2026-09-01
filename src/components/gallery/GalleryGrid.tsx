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
            className="group relative w-full overflow-hidden rounded-2xl border border-[color:var(--surface-border)] text-left shadow-lg transition duration-300 hover:border-[#C41E3A] cursor-pointer"
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
            <span className="absolute inset-0 bg-gradient-to-t from-[#140508]/90 via-[#140508]/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-white opacity-0 transition group-hover:opacity-100">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#D4AF37]">
                {item.category} · {item.location}
              </span>
              <span className="font-display text-xl font-bold">{item.title}</span>
            </span>
          </button>
        ))}
      </div>

      {current && active !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0E0507]/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#8E162C] hover:border-[#C41E3A] cursor-pointer"
            aria-label="Close lightbox"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#1A070B]/80 text-white transition hover:bg-[#8E162C] hover:border-[#C41E3A] sm:left-6 cursor-pointer"
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
            className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#1A070B]/80 text-white transition hover:bg-[#8E162C] hover:border-[#C41E3A] sm:right-6 cursor-pointer"
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
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[rgba(230,57,86,0.3)] bg-black/40 shadow-2xl">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 text-center text-white">
              <p className="font-display text-2xl font-bold">{current.title}</p>
              <p className="mt-1 text-sm text-zinc-300">
                {current.caption} · <span className="text-[#D4AF37]">{current.location}</span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
