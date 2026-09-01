"use client";

import { ShieldCheck, Sparkles, HeartHandshake, Navigation, Compass, Users } from "lucide-react";

export function WhySanchariSection() {
  const pillars = [
    {
      icon: Sparkles,
      color: "text-ai-light",
      bg: "bg-ai-violet/15 border-ai-violet/30",
      title: "Transparent AI Reasoning",
      desc: "Every recommendation includes 'Why we recommend this' context based on your pace, budget, and real seasonal conditions.",
    },
    {
      icon: Compass,
      color: "text-emerald-accent",
      bg: "bg-emerald-950/30 border-emerald-500/30",
      title: "Promoting Hidden Gems",
      desc: "Actively redirects travelers away from commercial overcrowding toward pristine, culturally rich off-beat sanctuaries.",
    },
    {
      icon: HeartHandshake,
      color: "text-saffron",
      bg: "bg-saffron/15 border-saffron/30",
      title: "Empowering Local Economies",
      desc: "Direct verification for indigenous guides, tribal coffee cooperatives, and rural homestays with zero middleman commissions.",
    },
    {
      icon: ShieldCheck,
      color: "text-teal-400",
      bg: "bg-teal-950/30 border-teal-500/30",
      title: "Field-Tested Trust & Safety",
      desc: "Verified local helpline numbers, women traveler ratings, and live regional travel advisories updated regularly.",
    },
  ];

  return (
    <section className="container-site section-pad space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="font-mono text-xs text-saffron uppercase font-bold tracking-widest block">
          Platform Architecture & Values
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-warm-white">
          Why Sanchari Bharat?
        </h2>
        <p className="text-xs sm:text-sm text-muted-gray font-body">
          Built to solve scattered travel information, over-tourism, and complex itinerary planning across the Indian subcontinent.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="card-surface p-6 bg-navy-surface/60 border-white/10 rounded-3xl space-y-4 hover:border-white/20 transition duration-300"
          >
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${p.bg} ${p.color}`}>
              <p.icon className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-bold text-warm-white">{p.title}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-body">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

