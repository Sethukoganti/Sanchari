"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { events, REGIONS } from "@/data/content";
import type { Region } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import { cn } from "@/lib/utils";

const monthNames = [
  "All year",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function EventsCalendar() {
  const [month, setMonth] = useState(0);
  const [region, setRegion] = useState<Region | "All">("All");

  const filtered = useMemo(() => {
    return events
      .filter((e) => (month === 0 ? true : e.month === month))
      .filter((e) => (region === "All" ? true : e.region === region))
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
  }, [month, region]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {monthNames.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setMonth(i)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
              month === i
                ? "bg-saffron text-white"
                : "bg-warm-white text-dusk-ink hover:bg-surface-elevated",
            )}
            aria-pressed={month === i}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={cn("chip", region === "All" && "chip-active")}
          onClick={() => setRegion("All")}
          aria-pressed={region === "All"}
        >
          All regions
        </button>
        {REGIONS.map((r) => (
          <button
            key={r}
            type="button"
            className={cn("chip", region === r && "chip-active")}
            onClick={() => setRegion(r)}
            aria-pressed={region === r}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="card-surface p-8 text-ink-muted md:col-span-2">
            No festivals in this window. Try another month or region.
          </p>
        ) : (
          filtered.map((event) => (
            <article
              key={event.id}
              id={event.slug}
              className="card-surface overflow-hidden scroll-mt-28"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={event.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-peacock">
                  {formatDateRange(event.startDate, event.endDate)} · {event.region}
                </p>
                <h3 className="mt-2 font-display text-2xl text-dusk-ink">
                  {event.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">
                  {event.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {event.description}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
