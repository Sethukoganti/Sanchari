"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDepartures } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function FlipText({ text, active }: { text: string; active: boolean }) {
  const chars = text.padEnd(Math.max(text.length, 1), " ").slice(0, 18).split("");
  return (
    <span className="inline-flex gap-[2px]" aria-hidden={!active}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}-${active}`}
          className={cn(
            "flip-char",
            active && "animate-[pulse_0.45s_ease-in-out]",
          )}
          style={{ animationDelay: `${i * 18}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export function DeparturesBoard() {
  const { t } = useLanguage();
  const rows = getDepartures();
  const [tick, setTick] = useState(0);
  const [highlight, setHighlight] = useState(0);
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
      setTick((v) => v + 1);
      setHighlight((v) => (v + 1) % rows.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduced, rows.length]);

  return (
    <section
      className="relative z-10 -mt-10 px-4 sm:-mt-14 sm:px-6 lg:px-10"
      aria-labelledby="departures-heading"
    >
      <div className="container-site overflow-hidden rounded-2xl border border-white/10 bg-charcoal shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-warm-white/10 px-4 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-turmeric">
              Explore India Rail · Board 01
            </p>
            <h2
              id="departures-heading"
              className="mt-1 font-display text-2xl text-warm-white sm:text-3xl"
            >
              {t.home.departures}
            </h2>
            <p className="text-sm text-warm-white/60">{t.home.departuresSub}</p>
          </div>
          <div className="font-mono text-xs text-warm-white/50">
            CLK {String((tick % 24)).padStart(2, "0")}:
            {String((tick * 7) % 60).padStart(2, "0")} IST
          </div>
        </div>

        <div className="hidden grid-cols-[88px_1.4fr_1fr_1.1fr_72px] gap-2 border-b border-warm-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-warm-white/40 sm:grid sm:px-6">
          <span>Code</span>
          <span>Destination</span>
          <span>Region</span>
          <span>Status</span>
          <span>PF</span>
        </div>

        <ul className="divide-y divide-warm-white/5">
          {rows.map((row, index) => {
            const active = index === highlight;
            return (
              <li key={row.code}>
                <Link
                  href={`/destinations/${row.slug}`}
                  className={cn(
                    "grid grid-cols-1 gap-2 px-4 py-3 transition sm:grid-cols-[88px_1.4fr_1fr_1.1fr_72px] sm:items-center sm:px-6",
                    active ? "bg-turmeric/10" : "hover:bg-warm-white/5",
                  )}
                >
                  <span className="font-mono text-xs text-warm-white/70">
                    {row.code}
                  </span>
                  <span className="board-row">
                    <span className="sr-only">{row.destination}</span>
                    <FlipText text={row.destination} active={active && !reduced} />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wide text-peacock sm:text-warm-white/80">
                    {row.region}
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wide text-turmeric">
                    {row.status}
                  </span>
                  <span className="font-mono text-xs text-warm-white/60">
                    {row.platform}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
