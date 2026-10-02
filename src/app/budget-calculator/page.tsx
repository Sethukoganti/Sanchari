"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Compass,
  Users,
  Calendar,
  Sparkles,
  DollarSign,
  Hotel,
  Utensils,
  Train,
  ShoppingBag,
  ShieldCheck,
  Printer,
  ChevronRight,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { destinationsData } from "@/data/destinations";

const RATES = {
  Budget: {
    stay: 1200,
    food: 600,
    transport: 400,
    activities: 300,
    shopping: 300,
  },
  "Mid-Range": {
    stay: 4500,
    food: 1600,
    transport: 1200,
    activities: 900,
    shopping: 800,
  },
  Luxury: {
    stay: 18000,
    food: 4500,
    transport: 3500,
    activities: 2500,
    shopping: 2500,
  },
};

const SEASON_MULTIPLIERS = {
  "Off-Peak": 0.85,
  Regular: 1.0,
  "Peak Festival": 1.35,
};

export default function BudgetCalculatorPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(destinationsData[0]?.slug || "jaipur");
  const [days, setDays] = useState<number>(5);
  const [travelers, setTravelers] = useState<number>(2);
  const [style, setStyle] = useState<"Budget" | "Mid-Range" | "Luxury">("Mid-Range");
  const [season, setSeason] = useState<"Off-Peak" | "Regular" | "Peak Festival">("Regular");

  const destination = useMemo(
    () => destinationsData.find((d) => d.slug === selectedSlug) || destinationsData[0],
    [selectedSlug]
  );

  const calculation = useMemo(() => {
    const base = RATES[style];
    const mult = SEASON_MULTIPLIERS[season];

    const stayTotal = Math.round(base.stay * Math.ceil(travelers / 2) * days * mult);
    const foodTotal = Math.round(base.food * travelers * days * mult);
    const transportTotal = Math.round(base.transport * travelers * days * mult);
    const activitiesTotal = Math.round(base.activities * travelers * days * mult);
    const shoppingTotal = Math.round(base.shopping * travelers * mult);
    const subtotal = stayTotal + foodTotal + transportTotal + activitiesTotal + shoppingTotal;
    const contingency = Math.round(subtotal * 0.1);
    const total = subtotal + contingency;

    const inrToUsd = 0.012;
    const inrToEur = 0.011;

    return {
      stayTotal,
      foodTotal,
      transportTotal,
      activitiesTotal,
      shoppingTotal,
      contingency,
      total,
      perPersonPerDay: Math.round(total / (travelers * days)),
      approxUSD: Math.round(total * inrToUsd),
      approxEUR: Math.round(total * inrToEur),
    };
  }, [days, travelers, style, season]);

  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Interactive Travel Planner"
        title="Trip Budget & Cost Calculator"
        description="Estimate realistic expenses for accommodation, royal dining, train travel, local guides, and shopping across Indian destinations."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Budget Calculator" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          {/* Controls Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-2xl space-y-6">
              <h2 className="font-display text-2xl font-bold text-warm-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-white" />
                Customize Parameters
              </h2>

              {/* Destination Select */}
              <div>
                <label htmlFor="dest-select" className="text-xs font-semibold text-zinc-300 block mb-2">
                  Destination
                </label>
                <select
                  id="dest-select"
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-warm-white outline-none focus:border-turmeric"
                >
                  {destinationsData.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-teal-400" />
                    Trip Duration
                  </span>
                  <span className="font-mono text-turmeric text-sm">{days} Days</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-turmeric cursor-pointer"
                />
              </div>

              {/* Travelers Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-rani" />
                    Number of Travelers
                  </span>
                  <span className="font-mono text-turmeric text-sm">{travelers} Person{travelers > 1 ? "s" : ""}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full accent-turmeric cursor-pointer"
                />
              </div>

              {/* Travel Style Buttons */}
              <div>
                <span className="text-xs font-semibold text-zinc-300 block mb-2">Travel Style</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Budget", "Mid-Range", "Luxury"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`rounded-xl py-2.5 text-xs font-semibold transition cursor-pointer border ${
                        style === s
                          ? "bg-turmeric text-black font-bold border-turmeric shadow-lg shadow-turmeric/20"
                          : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Season Select */}
              <div>
                <span className="text-xs font-semibold text-zinc-300 block mb-2">Travel Season</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Off-Peak", "Regular", "Peak Festival"] as const).map((seas) => (
                    <button
                      key={seas}
                      type="button"
                      onClick={() => setSeason(seas)}
                      className={`rounded-xl py-2.5 text-xs font-semibold transition cursor-pointer border ${
                        season === seas
                          ? "bg-teal-500 text-black font-bold border-teal-500"
                          : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                      }`}
                    >
                      {seas}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-6 space-y-6">
            <div className="card-surface p-6 sm:p-8 bg-white/[0.04] border-white/10 rounded-2xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-turmeric">
                    Estimated Total Budget
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-warm-white mt-1">
                    ₹{calculation.total.toLocaleString("en-IN")}
                  </h3>
                  <p className="text-xs text-muted-gray mt-1">
                    ≈ ${calculation.approxUSD.toLocaleString()} USD · €{calculation.approxEUR.toLocaleString()} EUR
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block">Per Day / Person</span>
                  <span className="font-mono text-lg font-bold text-teal-400">
                    ₹{calculation.perPersonPerDay.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <Hotel className="h-4 w-4 text-white" />
                    Stay & Accommodation
                  </span>
                  <span className="font-mono font-bold text-warm-white">
                    ₹{calculation.stayTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <Utensils className="h-4 w-4 text-rani" />
                    Meals & Street Food
                  </span>
                  <span className="font-mono font-bold text-warm-white">
                    ₹{calculation.foodTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <Train className="h-4 w-4 text-teal-400" />
                    Transport & Cabs
                  </span>
                  <span className="font-mono font-bold text-warm-white">
                    ₹{calculation.transportTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <Compass className="h-4 w-4 text-white" />
                    Guided Tours & Monument Entry
                  </span>
                  <span className="font-mono font-bold text-warm-white">
                    ₹{calculation.activitiesTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <ShoppingBag className="h-4 w-4 text-purple-400" />
                    Bazaars & Souvenirs
                  </span>
                  <span className="font-mono font-bold text-warm-white">
                    ₹{calculation.shoppingTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Emergency Buffer (10%)
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    ₹{calculation.contingency.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  href={`/plan?destination=${destination.slug}&days=${days}&travelers=${travelers}&budget=${style}`}
                  className="btn-primary flex-1 justify-center !py-3 text-xs"
                >
                  Create {destination.name} Itinerary
                </Link>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-secondary !py-3 !px-4 text-xs"
                  title="Print Budget Breakdown"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

