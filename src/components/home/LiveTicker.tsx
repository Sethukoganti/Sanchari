"use client";

import Link from "next/link";
import { Sparkles, Flame, Calendar, ArrowRight } from "lucide-react";
import { getUpcomingFestivals } from "@/data/content";

export function LiveTicker() {
  const upcoming = getUpcomingFestivals();

  return (
    <div className="border-y border-white/10 bg-black/60 backdrop-blur-xl py-3 px-4 overflow-hidden relative z-20">
      <div className="container-site flex items-center gap-4">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full bg-rani/20 px-3 py-1 text-xs font-bold text-rani-light border border-rani/30 shrink-0 font-mono">
          <Flame className="h-3.5 w-3.5 animate-pulse text-rani" />
          <span>WHAT&apos;S HAPPENING NOW</span>
        </div>

        {/* Marquee / Ticker items */}
        <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar text-xs text-zinc-300 whitespace-nowrap">
          {upcoming.map((fest) => (
            <Link key={fest.id}
              href={`/festivals/${fest.slug}`}
              className="flex items-center gap-2 transition-colors hover:text-white group"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-turmeric shrink-0" />
              <strong className="text-warm-white group-hover:text-turmeric">
                {fest.name}:
              </strong>
              <span className="text-muted-gray">
                {fest.date?.gregorianApprox || fest.date?.approximateString || fest.date?.month || "Upcoming"} ({fest.states?.[0] || fest.state || "India"})
              </span>
              <span className="text-turmeric text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link href="/festivals"
          className="hidden sm:flex items-center gap-1 text-xs font-bold text-white hover:underline shrink-0 ml-auto"
        >
          <span>50+ Calendar</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
