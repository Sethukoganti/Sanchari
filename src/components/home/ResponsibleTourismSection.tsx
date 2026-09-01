"use client";

import { Leaf, ShieldCheck, Heart, Trash2, Camera, Compass } from "lucide-react";

export function ResponsibleTourismSection() {
  const guidelines = [
    {
      icon: Leaf,
      title: "Support Indigenous Livelihoods",
      desc: "Buy handicrafts and spices directly from artisan cooperatives and dine at local family-run kitchens.",
    },
    {
      icon: Trash2,
      title: "Zero Waste & Plastic Neutral",
      desc: "Carry reusable water bottles, reject single-use plastic covers, and pack out all trash in sensitive mountain trails.",
    },
    {
      icon: Camera,
      title: "Respect Sacred Protocols",
      desc: "Always ask permission before photographing tribal community elders and remove footwear before entering holy sanctums.",
    },
    {
      icon: Compass,
      title: "Choose Low-Impact Transport",
      desc: "Opt for Indian Railways trains, public electric ferries, and bicycle exploration to lower your travel carbon footprint.",
    },
  ];

  return (
    <section className="container-site section-pad">
      <div className="card-surface p-8 sm:p-12 bg-emerald-950/20 border-emerald-500/30 rounded-3xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div>
            <span className="badge-hidden-gem">🌱 Sustainable Tourism Pledge</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-warm-white mt-1">
              Travel Responsibly Across Bharat
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl font-body">
              Leave gentle footprints. Safeguard delicate Himalayan ecologies, ancient monument stone carvings, and sacred indigenous heritage.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guidelines.map((g) => (
            <div key={g.title} className="p-4 rounded-2xl bg-navy-dark/60 border border-emerald-500/15 space-y-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <g.icon className="h-4 w-4" />
              </span>
              <h3 className="font-display text-sm font-bold text-warm-white">{g.title}</h3>
              <p className="text-[11px] text-zinc-300 leading-relaxed font-body">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

