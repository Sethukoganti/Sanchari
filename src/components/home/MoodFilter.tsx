"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { cn } from "@/lib/utils";

const MOODS = [
  { id: "relax", label: "Relax & Coast", emoji: "🏖️", filterTheme: "Beaches & Islands" },
  { id: "adventure", label: "Adventure & Treks", emoji: "🏔️", filterTheme: "Adventure & Trekking" },
  { id: "spiritual", label: "Spiritual & Sacred", emoji: "🙏", filterTheme: "Spiritual & Pilgrimage" },
  { id: "festivals", label: "Festivals & Heritage", emoji: "🎉", filterTheme: "Heritage & Culture" },
  { id: "foodie", label: "Foodie & Culinary Trails", emoji: "🍛", filterTheme: "Cuisine & Food Trails" },
  { id: "luxury", label: "Luxury & Palaces", emoji: "👑", filterTheme: "Luxury Escapes" },
];

export function MoodFilter() {
  const [activeMood, setActiveMood] = useState(MOODS[0].id);

  const currentMood = MOODS.find((m) => m.id === activeMood) || MOODS[0];

  const filtered = destinationsData
    .filter((d) => d.themes.some((t) => t.toLowerCase() === currentMood.filterTheme.toLowerCase()))
    .slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-turmeric block mb-1">
            Intuitive Discovery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-white">
            Discover India by Mood
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-gray">
            Choose what your soul is craving right now, and let us reveal the ideal bases.
          </p>
        </div>
      </div>

      {/* Mood Selector Tabs Ribbon */}
      <div className="flex flex-wrap gap-2">
        {MOODS.map((mood) => {
          const isActive = activeMood === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => setActiveMood(mood.id)}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer",
                isActive
                  ? "bg-turmeric text-black shadow-lg shadow-turmeric/25 scale-105"
                  : "border border-white/10 bg-white/5 text-zinc-300 hover:border-turmeric/40 hover:bg-white/10",
              )}
            >
              <span className="text-base">{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filtered Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((dest) => (
          <Link
            key={dest.id}
            href={`/destinations/${dest.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-turmeric/50"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 text-xs text-zinc-200 font-medium drop-shadow flex items-center gap-1">
                <MapPin className="h-3 w-3 text-white" />
                <span>{dest.state}</span>
              </div>
            </div>

            <div className="p-4 flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-warm-white group-hover:text-turmeric transition-colors">
                  {dest.name}
                </h3>
                <p className="mt-1 text-xs text-muted-gray line-clamp-2 leading-relaxed font-body">
                  {dest.tagline || dest.summary}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-xs text-turmeric font-semibold group-hover:underline">
                <span>Explore Base</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

