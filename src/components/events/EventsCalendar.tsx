"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { events, REGIONS } from "@/data/content";
import type { Region } from "@/lib/types";
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
  const [region, setRegion] = useState<string>("All");

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        if (month === 0) return true;
        const targetMonth = monthNames[month];
        return e.date?.month === targetMonth;
      })
      .filter((e) => (region === "All" ? true : (e.state || "").toLowerCase().includes(region.toLowerCase())));
  }, [month, region]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {monthNames.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setMonth(i)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer",
              month === i
                ? "bg-saffron text-black font-bold shadow-md shadow-saffron/20"
                : "bg-navy-surface/80 border border-white/10 text-muted-gray hover:text-white"
            )}
            aria-pressed={month === i}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={cn("chip !py-1 !px-3 text-xs cursor-pointer", region === "All" && "chip-active")}
          onClick={() => setRegion("All")}
          aria-pressed={region === "All"}
        >
          All States
        </button>
        {["Telangana", "Rajasthan", "Uttar Pradesh", "Nagaland", "Arunachal Pradesh"].map((r) => (
          <button
            key={r}
            type="button"
            className={cn("chip !py-1 !px-3 text-xs cursor-pointer", region === r && "chip-active")}
            onClick={() => setRegion(r)}
            aria-pressed={region === r}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="card-surface p-8 text-muted-gray md:col-span-2 text-center text-xs">
            No festivals in this window. Try another month or region.
          </p>
        ) : (
          filtered.map((event) => (
            <article
              key={event.id}
              id={event.slug}
              className="card-surface overflow-hidden bg-navy-surface/60 border-white/10 rounded-3xl"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={event.image || "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron font-mono">
                  {event.date?.approximateString || event.date?.month || "Seasonal"} · {event.state}
                </p>
                <h3 className="font-display text-xl font-bold text-warm-white">
                  {event.name}
                </h3>
                <p className="text-xs font-medium text-emerald-accent">
                  {event.location}
                </p>
                <p className="text-xs leading-relaxed text-zinc-300 font-body">
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
