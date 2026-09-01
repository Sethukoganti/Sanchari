"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, Play, Eye, RotateCw } from "lucide-react";

const VIRTUAL_SPOTS = [
  {
    id: "taj-360",
    title: "Taj Mahal Marble Promenade",
    location: "Agra, Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    description: "Experience 360° sunlight reflections across the ivory marble reflecting pools.",
    slug: "varanasi",
  },
  {
    id: "pangong-360",
    title: "Pangong Tso Crystal Shores",
    location: "Ladakh (4,225m Altitude)",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    description: "Look across the high-altitude sapphire salt waters bordered by the Karakoram.",
    slug: "leh",
  },
  {
    id: "kerala-360",
    title: "Vembanad Backwater Lagoon",
    location: "Alleppey, Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    description: "Glide silently aboard a floating wooden Kettuvallam through lotus channels.",
    slug: "alleppey",
  },
];

export function VirtualTourTeaser() {
  const [activeSpot, setActiveSpot] = useState(VIRTUAL_SPOTS[0]);

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111111] via-[#0D0D0D] to-[#0A0A0A] p-6 sm:p-10 shadow-2xl overflow-hidden relative">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400 block mb-1">
            Immersive 360° Previews
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-warm-white">
            Virtual Subcontinent Exploration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-gray">
            Preview iconic heritage marvels and tranquil landscapes before setting foot in India.
          </p>
        </div>

        {/* Spot Selector Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {VIRTUAL_SPOTS.map((spot) => (
            <button
              key={spot.id}
              type="button"
              onClick={() => setActiveSpot(spot)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                activeSpot.id === spot.id
                  ? "bg-teal-500 text-black font-bold shadow-md shadow-teal-500/20"
                  : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              {spot.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main 360 Stage */}
      <div className="mt-8 relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden rounded-2xl border border-white/15 group">
        <Image
          src={activeSpot.image}
          alt={activeSpot.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Interactive Overlay Center Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href={`/destinations/${activeSpot.slug}`}
            className="flex items-center gap-2 rounded-2xl border border-teal-400/40 bg-black/75 px-5 py-3 text-xs sm:text-sm font-bold text-teal-300 backdrop-blur-xl transition-all hover:scale-110 hover:border-teal-400 hover:bg-teal-500 hover:text-black shadow-2xl"
          >
            <RotateCw className="h-4 w-4 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Enter Full Virtual Tour</span>
          </Link>
        </div>

        {/* Bottom Details */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow">
              {activeSpot.title}
            </h3>
            <p className="text-xs text-zinc-300">{activeSpot.location}</p>
            <p className="mt-1 text-xs text-muted-gray hidden sm:block max-w-md">
              {activeSpot.description}
            </p>
          </div>

          <Link
            href={`/destinations/${activeSpot.slug}`}
            className="btn-primary !py-2 !px-4 text-xs"
          >
            Explore Destination →
          </Link>
        </div>
      </div>
    </section>
  );
}

