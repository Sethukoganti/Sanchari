"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, Check, X, MapPin, Calendar, Clock, DollarSign, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { destinationsData } from "@/data/destinations";

export default function ComparePage() {
  const [dest1Slug, setDest1Slug] = useState<string>("jaipur");
  const [dest2Slug, setDest2Slug] = useState<string>("varanasi");

  const d1 = destinationsData.find((d) => d.slug === dest1Slug) || destinationsData[0];
  const d2 = destinationsData.find((d) => d.slug === dest2Slug) || destinationsData[1];

  return (
    <div className="min-h-screen pb-24 text-zinc-900 dark:text-[#F7F3EC]">
      <PageHero
        eyebrow="Side-by-Side Analysis"
        title="Compare Destinations"
        description="Evaluate climates, ideal seasons, signature cuisines, heritage highlights, and estimated budgets between any two Indian destinations."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Compare" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-8">
          {/* Selectors Bar */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface p-4 bg-white/[0.04] border-white/10 rounded-2xl">
              <label htmlFor="dest1" className="text-xs font-mono uppercase text-turmeric font-bold block mb-2">
                First Destination
              </label>
              <select
                id="dest1"
                value={dest1Slug}
                onChange={(e) => setDest1Slug(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-warm-white outline-none focus:border-turmeric"
              >
                {destinationsData.map((d) => (
                  <option key={d.slug} value={d.slug} disabled={d.slug === dest2Slug}>
                    {d.name} ({d.state})
                  </option>
                ))}
              </select>
            </div>

            <div className="card-surface p-4 bg-white/[0.04] border-white/10 rounded-2xl">
              <label htmlFor="dest2" className="text-xs font-mono uppercase text-teal-400 font-bold block mb-2">
                Second Destination
              </label>
              <select
                id="dest2"
                value={dest2Slug}
                onChange={(e) => setDest2Slug(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-sm text-warm-white outline-none focus:border-turmeric"
              >
                {destinationsData.map((d) => (
                  <option key={d.slug} value={d.slug} disabled={d.slug === dest1Slug}>
                    {d.name} ({d.state})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {[d1, d2].map((dest) => (
              <div
                key={dest.slug}
                className="card-surface bg-white/[0.03] border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 space-y-6"
              >
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded-full bg-turmeric/20 px-3 py-0.5 font-mono text-[10px] font-bold text-turmeric uppercase border border-turmeric/40 backdrop-blur-md">
                      {dest.region} India · {dest.state}
                    </span>
                    <h3 className="font-display text-3xl font-bold text-warm-white mt-1">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 text-xs divide-y divide-white/10">
                  <div className="pt-2 flex justify-between">
                    <span className="text-muted-gray">Best Season:</span>
                    <span className="font-semibold text-warm-white">{dest.bestTimeToVisit || dest.bestTime}</span>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <span className="text-muted-gray">Recommended Duration:</span>
                    <span className="font-semibold text-warm-white">{dest.idealDurationDays ? `${dest.idealDurationDays} Days` : dest.duration}</span>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <span className="text-muted-gray">Budget Category:</span>
                    <span className="font-semibold text-turmeric">{dest.budgetTier || dest.budget || "Moderate"}</span>
                  </div>

                  <div className="pt-3">
                    <span className="text-muted-gray block mb-2">Key Themes:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.themes.map((t) => (
                        <span key={t} className="chip !py-1 !px-2.5 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <span className="text-muted-gray block mb-2">Top Highlights:</span>
                    <ul className="space-y-1.5 text-zinc-300">
                      {dest.highlights.slice(0, 4).map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-white shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3">
                    <span className="text-muted-gray block mb-2">Signature Dish:</span>
                    <p className="text-warm-white font-medium">
                      {dest.localFoodSpecialities?.[0] || "Authentic Regional Thali"}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/destinations/${dest.slug}`}
                  className="btn-primary w-full justify-center !py-2.5 text-xs"
                >
                  Explore Complete {dest.name} Guide
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
