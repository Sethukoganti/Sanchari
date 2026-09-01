"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Compass, ShieldCheck, MapPin, Check } from "lucide-react";

export function AIPlannerCTA() {
  return (
    <section className="container-site section-pad">
      <div className="relative overflow-hidden card-ai p-8 sm:p-14 rounded-3xl border border-ai-violet/40 shadow-2xl space-y-6">
        {/* Background glow orb */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-ai-violet/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-violet/20 border border-ai-violet/40 text-ai-light text-xs font-mono font-bold">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
            <span>AI TRIP ARCHITECT ENGINE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-warm-white tracking-tight leading-tight">
            Stop Planning for Days. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-amber-300 to-ai-light">
              Let AI Build Your Perfect Itinerary in Seconds.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed max-w-2xl">
            Input your travel style, budget, and passion points. Our AI engine sequences chronological morning-to-night timelines, calculates dynamic budget breakdowns, and integrates verified local partners.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-muted-gray">
            <span className="flex items-center gap-1.5 text-warm-white">
              <Check className="h-4 w-4 text-emerald-accent" />
              Route Optimization
            </span>
            <span className="flex items-center gap-1.5 text-warm-white">
              <Check className="h-4 w-4 text-emerald-accent" />
              Transparent Budgets
            </span>
            <span className="flex items-center gap-1.5 text-warm-white">
              <Check className="h-4 w-4 text-emerald-accent" />
              &quot;Why We Recommend This&quot; Trust Badges
            </span>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/plan"
              className="btn-ai !py-3.5 !px-8 text-sm font-bold flex items-center gap-2 shadow-xl shadow-ai-violet/30 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch 7-Step AI Planner</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/budget-calculator"
              className="btn-secondary !py-3.5 !px-6 text-sm font-bold cursor-pointer"
            >
              <span>Estimate Budget First</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

