"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, MapPin, Sparkles, ArrowRight, Filter } from "lucide-react";
import type { Festival } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FestivalHubClientProps {
  festivals: Festival[];
}

const MONTHS = [
  "All",
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

const TYPES = [
  { id: "all", label: "All Traditions" },
  { id: "Cultural", label: "Cultural & Folk" },
  { id: "Religious", label: "Sacred & Temple" },
  { id: "Music & Dance", label: "Music & Dance" },
  { id: "Harvest", label: "Harvest & Seasonal" },
];

export function FestivalHubClient({ festivals }: FestivalHubClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const filteredFestivals = useMemo(() => {
    return festivals.filter((fest) => {
      const q = searchQuery.toLowerCase().trim();
      const statesList = fest.states || (fest.state ? [fest.state] : []);
      const matchesSearch =
        !q ||
        fest.name.toLowerCase().includes(q) ||
        (fest.nameHi && fest.nameHi.includes(q)) ||
        statesList.some((s: string) => s.toLowerCase().includes(q));

      const matchesType = selectedType === "all" || fest.type === selectedType;
      const matchesMonth = selectedMonth === "All" || fest.date?.month === selectedMonth;

      return matchesSearch && matchesType && matchesMonth;
    });
  }, [festivals, searchQuery, selectedType, selectedMonth]);

  return (
    <div className="space-y-10">
      {/* Search & Filters Bar */}
      <div className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-gray" />
          <input
            type="text"
            placeholder="Search festivals by name, state, deity, or tradition (e.g. Diwali, Onam, Rajasthan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-black/60 pl-12 pr-4 py-3.5 text-sm text-warm-white outline-none focus:border-turmeric"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Type Tabs */}
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedType(t.id)}
                className={cn(
                  "chip !py-1.5 !px-3.5 text-xs font-semibold cursor-pointer",
                  selectedType === t.id && "chip-active"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Month Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-gray uppercase">Month:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-xl border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-warm-white outline-none focus:border-turmeric"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFestivals.map((fest) => {
          const statesList = fest.states || (fest.state ? [fest.state] : []);
          return (
            <Link
              key={fest.slug}
              href={`/festivals/${fest.slug}`}
              className="group card-surface block overflow-hidden rounded-2xl bg-white/[0.03] border-white/10 transition duration-300 hover:scale-[1.02] hover:border-turmeric/50 hover:shadow-xl hover:shadow-turmeric/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src={fest.gallery?.[0] || fest.image || "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80"}
                  alt={fest.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 rounded-full bg-black/75 px-2.5 py-0.5 font-mono text-[10px] font-bold text-turmeric uppercase border border-turmeric/30 backdrop-blur-md">
                  {fest.date?.gregorianApprox || fest.date?.approximateString || fest.date?.month || "Seasonal"}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-zinc-400">
                    {fest.type} {fest.religion ? `· ${fest.religion}` : ""}
                  </span>
                  <span className="font-mono text-[10px] text-teal-400">
                    {fest.duration || `${fest.durationDays} Days`}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-warm-white group-hover:text-turmeric transition-colors flex items-center justify-between">
                  <span>{fest.name}</span>
                  <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-turmeric group-hover:translate-x-1 transition-all" />
                </h3>

                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {fest.significance}
                </p>

                <div className="border-t border-white/5 pt-3 flex flex-wrap gap-1.5">
                  {statesList.slice(0, 3).map((st: string) => (
                    <span key={st} className="chip !py-0.5 !px-2 text-[10px]">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
