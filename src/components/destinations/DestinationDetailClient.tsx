"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Sparkles,
  Camera,
  ShieldAlert,
  Utensils,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Sun,
  Star,
} from "lucide-react";
import type { Destination } from "@/lib/types";
import { hotelsData, shopsData } from "@/data/transport";
import { destinationsData } from "@/data/destinations";
import { MultilingualNarrative } from "@/components/multilingual/MultilingualNarrative";
import { destinationTranslations } from "@/data/translations";
import { WeatherChart } from "@/components/common/WeatherChart";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShareButton } from "@/components/common/ShareButton";
import { cn } from "@/lib/utils";

interface DestinationDetailClientProps {
  destination: Destination;
}

export function DestinationDetailClient({ destination }: DestinationDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "cuisine" | "markets" | "weather" | "photo">("overview");

  const hotels = hotelsData.filter((h) => h.destinationSlug === destination.slug);
  const shops = shopsData.filter((s) => s.destinationSlug === destination.slug);
  const translations = destinationTranslations[destination.slug] || [];

  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] bg-black text-white overflow-hidden flex items-end">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

        <div className="relative container-site section-pad pb-14 pt-36 w-full space-y-4">
          <Breadcrumbs
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: destination.name },
            ]}
          />

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-turmeric/20 px-3 py-1 font-mono text-xs font-bold text-turmeric uppercase border border-turmeric/40 backdrop-blur-md">
              {destination.region} India · {destination.state}
            </span>
            {destination.status && (
              <span className="rounded-full bg-rani/20 px-3 py-1 font-mono text-xs font-bold text-rani uppercase border border-rani/40 backdrop-blur-md">
                {destination.status}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black text-warm-white tracking-tight">
            {destination.name}
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-zinc-200 leading-relaxed font-body">
            {destination.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <ShareButton title={`${destination.name} Travel Guide`} text={destination.summary} />
            <Link
              href={`/compare?dest1=${destination.slug}`}
              className="btn-secondary !py-1.5 text-xs"
            >
              Compare with Another Destination
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container-site section-pad mt-8 space-y-12">
        {/* Multilingual Voice Narrative */}
        {translations.length > 0 && (
          <MultilingualNarrative
            destinationName={destination.name}
            translations={translations}
          />
        )}

        {/* Quick Facts Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-turmeric/15 text-turmeric">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-gray uppercase block">Best Season</span>
              <span className="font-semibold text-warm-white text-sm">{destination.bestTime}</span>
            </div>
          </div>

          <div className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-gray uppercase block">Recommended Stay</span>
              <span className="font-semibold text-warm-white text-sm">{destination.duration}</span>
            </div>
          </div>

          <div className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rani/15 text-rani">
              <Compass className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-gray uppercase block">Budget Tier</span>
              <span className="font-semibold text-warm-white text-sm">{destination.budget}</span>
            </div>
          </div>

          <div className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-gray uppercase block">State & Region</span>
              <span className="font-semibold text-warm-white text-sm">{destination.state} ({destination.region})</span>
            </div>
          </div>
        </div>

        {/* Detailed Section Tabs */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
            {[
              { id: "overview", label: "Overview & Highlights" },
              { id: "history", label: "History & Architecture" },
              { id: "cuisine", label: "Local Cuisine" },
              { id: "markets", label: "Bazaars & Hotels" },
              { id: "weather", label: "12-Month Climate" },
              { id: "photo", label: "Photography & Advice" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "chip !py-2 !px-4 text-xs font-semibold cursor-pointer",
                  activeTab === tab.id && "chip-active"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
                <h2 className="font-display text-2xl font-bold text-warm-white">
                  About {destination.name}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-body">
                  {destination.description}
                </p>
                {destination.significance && (
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-body pt-2 border-t border-white/5">
                    {destination.significance}
                  </p>
                )}
              </div>

              <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
                <h3 className="font-display text-xl font-bold text-warm-white">
                  Key Highlights & Must-Visit Monuments
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {destination.highlights.map((hl) => (
                    <div
                      key={hl}
                      className="rounded-xl border border-white/5 bg-black/40 p-4 text-xs font-semibold text-zinc-200 flex items-center gap-2.5"
                    >
                      <Sparkles className="h-4 w-4 text-white shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HISTORY & ARCHITECTURE */}
          {activeTab === "history" && (
            <div className="space-y-6 animate-fade-in">
              {destination.history && (
                <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-3">
                  <h3 className="font-display text-xl font-bold text-warm-white">
                    Historical Chronicles
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-body">
                    {destination.history}
                  </p>
                </div>
              )}

              {destination.architecture && (
                <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-3">
                  <h3 className="font-display text-xl font-bold text-warm-white">
                    Architectural Marvels & Geometry
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-body">
                    {destination.architecture}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUISINE */}
          {activeTab === "cuisine" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid gap-6 sm:grid-cols-2">
                {destination.localCuisine?.map((food: any) => (
                  <div
                    key={food.name}
                    className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl space-y-3"
                  >
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/50">
                      <Image
                        src={food.image || "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"}
                        alt={food.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {food.mustTry && (
                        <span className="absolute top-2.5 right-2.5 rounded-full bg-turmeric px-2.5 py-0.5 text-[10px] font-bold text-black font-mono">
                          Must Try
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-lg font-bold text-warm-white">{food.name}</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">{food.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MARKETS & HOTELS */}
          {activeTab === "markets" && (
            <div className="space-y-8 animate-fade-in">
              {/* Markets */}
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-warm-white">
                  Historic Bazaars & Shopping
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {destination.localMarkets?.map((m: any) => (
                    <div
                      key={m.name}
                      className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl space-y-2"
                    >
                      <h4 className="font-display text-base font-bold text-warm-white">{m.name}</h4>
                      <p className="text-xs text-muted-gray">{m.location} · {m.timings}</p>
                      <p className="text-xs text-zinc-300">{m.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Stays */}
              {hotels.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-warm-white">
                    Curated Heritage Stays
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {hotels.map((h: any) => (
                      <div
                        key={h.id}
                        className="card-surface p-5 bg-white/[0.03] border-white/10 rounded-2xl space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-display text-base font-bold text-warm-white">{h.name}</h4>
                          <span className="font-mono text-xs text-turmeric font-bold">{h.rating} ★</span>
                        </div>
                        <p className="text-xs text-zinc-300">{h.description}</p>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs">
                          <span className="text-muted-gray">{h.pricePerNight}</span>
                          <span className="text-turmeric font-semibold">{h.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: WEATHER */}
          {activeTab === "weather" && (
            <div className="animate-fade-in">
              <WeatherChart
                destinationName={destination.name}
                monthlyData={destination.weather}
              />
            </div>
          )}

          {/* TAB 6: PHOTOGRAPHY & ADVICE */}
          {activeTab === "photo" && (
            <div className="space-y-6 animate-fade-in">
              {destination.photography && (
                <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
                  <h3 className="font-display text-xl font-bold text-warm-white flex items-center gap-2">
                    <Camera className="h-5 w-5 text-white" />
                    Photography Golden Hour & Prime Spots
                  </h3>
                  <p className="text-xs text-turmeric font-mono">
                    Best Timing: {destination.photography.bestTime}
                  </p>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {destination.photography.bestSpots?.map((spot: string) => (
                      <li key={spot} className="flex items-center gap-2">
                        <span className="text-turmeric">•</span>
                        <span>{spot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {destination.dosAndDonts && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="card-surface p-6 bg-emerald-950/20 border-emerald-500/30 rounded-2xl space-y-3">
                    <h4 className="font-display text-base font-bold text-emerald-400">
                      Do&apos;s for Travelers
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {destination.dosAndDonts.dos?.map((d: string) => (
                        <li key={d} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-surface p-6 bg-rose-950/20 border-rose-500/30 rounded-2xl space-y-3">
                    <h4 className="font-display text-base font-bold text-rose-400">
                      Don&apos;ts for Travelers
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {destination.dosAndDonts.donts?.map((d: string) => (
                        <li key={d} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">✗</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Community Reviews Section */}
        <div className="pt-8 border-t border-white/10">
          <ReviewSection
            targetType="destination"
            targetSlug={destination.slug}
            targetName={destination.name}
          />
        </div>
      </div>
    </div>
  );
}

