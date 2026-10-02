"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, MapPin, Compass, ArrowRight, ShieldCheck, Users } from "lucide-react";
import { getHiddenGems } from "@/data/destinations";
import { cn } from "@/lib/utils";

export function HiddenGemsSection() {
  const hiddenGems = getHiddenGems();

  return (
    <section className="container-site section-pad space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge-hidden-gem">💎 Off-Beat Sanctuary</span>
            <span className="text-xs text-muted-gray font-mono">Reduce Overcrowding</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-warm-white mt-1">
            Discover India&apos;s Hidden Gems
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray mt-1 max-w-2xl font-body">
            Promoting lesser-known cultural destinations, serene mountain valleys, and rural homestays with zero commercial crowd congestion.
          </p>
        </div>

        <Link
          href="/destinations?filter=hidden-gems"
          className="text-xs font-semibold text-emerald-accent hover:underline flex items-center gap-1.5"
        >
          <span>View All Hidden Gems</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hiddenGems.map((gem) => (
          <div
            key={gem.id}
            className="group card-surface overflow-hidden bg-navy-surface/60 border-white/10 hover:border-emerald-500/40 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Image with Badges */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={gem.image}
                  alt={gem.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/30" />

                <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                  <span className="badge-hidden-gem backdrop-blur-md">
                    Hidden Gem
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1 text-white font-semibold drop-shadow-md">
                    <MapPin className="h-3.5 w-3.5 text-white" />
                    {gem.state}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-300 font-mono text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <Users className="h-3 w-3" />
                    {gem.crowdLevel || "Low / Serene"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="font-display text-xl font-bold text-warm-white group-hover:text-emerald-accent transition-colors">
                  {gem.name}
                </h3>
                <p className="text-xs text-zinc-300 font-body leading-relaxed line-clamp-2">
                  {gem.whyVisitHiddenGem || gem.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-muted-gray border-t border-white/5">
                  <span>Best Season: <strong className="text-warm-white">{gem.bestTime}</strong></span>
                  <span>Est. Budget: <strong className="text-saffron">₹{gem.averageDailyBudget || 2500}/day</strong></span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 flex items-center gap-2">
              <Link
                href={`/destinations/${gem.slug}`}
                className="btn-secondary w-full justify-center !py-2 text-xs font-bold hover:border-emerald-500/40"
              >
                <span>Discover Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

