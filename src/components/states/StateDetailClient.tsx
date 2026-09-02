"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Train,
  Car,
  Utensils,
  PartyPopper,
  Compass,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShareButton } from "@/components/common/ShareButton";
import { useTranslation } from "@/lib/i18n";
import type { StateDetails } from "@/lib/types";

export function StateDetailClient({ state }: { state: StateDetails }) {
  const { t } = useTranslation();
  const touristFeatures = state.highlights && state.highlights.length > 0
    ? state.highlights
    : [state.summary, ...(state.cuisine || []).slice(0, 3)];

  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      <section className="relative min-h-[60vh] bg-black text-white overflow-hidden flex items-end">
        <Image
          src={state.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"}
          alt={state.name}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

        <div className="relative container-site section-pad pb-14 pt-36 w-full space-y-4">
          <Breadcrumbs
            items={[
              { label: t?.state?.states || "States", href: "/states" },
              { label: state.name },
            ]}
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-turmeric/20 px-3 py-1 font-mono text-xs font-bold text-turmeric uppercase border border-turmeric/40 backdrop-blur-md">
              {state.region} India
            </span>
            <span className="text-xs text-zinc-300">
              {t?.state?.capital || "Capital"}: <strong className="text-warm-white">{state.capital}</strong>
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight">
            {state.name}
          </h1>
          <p className="max-w-3xl text-sm sm:text-base leading-relaxed font-body">
            {state.description}
          </p>

          <div className="pt-2">
            <ShareButton title={`${state.name} Guide`} text={state.summary} />
          </div>
        </div>
      </section>

      <div className="container-site section-pad mt-12 grid gap-10 lg:grid-cols-12">
        <main className="lg:col-span-8 space-y-10">
          {state.culture && (
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-turmeric" />
                {t?.state?.livingCulture || "Living Culture & Traditions"}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-body">
                {state.culture}
              </p>
            </div>
          )}

          {touristFeatures.length > 0 && (
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <Compass className="h-5 w-5 text-turmeric" />
                {t?.state?.touristFeatures || "Tourist Features & Signature Experiences"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {touristFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="chip !py-2 !px-4 text-xs font-semibold border-turmeric/30 text-turmeric"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {state.cuisine && state.cuisine.length > 0 && (
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <Utensils className="h-5 w-5 text-rani" />
                {t?.state?.cuisine || "Signature Cuisine & Delicacies"}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {state.cuisine.map((dish) => (
                  <div
                    key={dish}
                    className="rounded-xl border border-white/5 bg-black/40 p-4 text-xs font-semibold text-zinc-200 flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-turmeric shrink-0" />
                    <span>{dish}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {state.festivals && state.festivals.length > 0 && (
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-4">
              <h2 className="font-display text-2xl font-bold flex items-center gap-2">
                <PartyPopper className="h-5 w-5 text-teal-400" />
                {t?.state?.festivals || "Major State Festivals"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {state.festivals.map((fest) => (
                  <span
                    key={fest}
                    className="chip !py-2 !px-4 text-xs font-semibold border-teal-500/30 text-teal-300"
                  >
                    {fest}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Compass className="h-5 w-5 text-turmeric" />
              {t?.state?.travelCircuits || "Curated Travel Circuits"}
            </h2>
            {state.itineraries && state.itineraries.length > 0 && (
              <div className="space-y-4">
                {state.itineraries.map((itin) => (
                  <div
                    key={itin.title}
                    className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold">
                        {itin.title}
                      </h3>
                      <span className="font-mono text-xs text-turmeric bg-turmeric/10 px-2.5 py-0.5 rounded-full border border-turmeric/30">
                        {itin.days} Days
                      </span>
                    </div>
                    <p className="text-xs text-muted-gray">{itin.summary}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-zinc-300">
                      <span className="font-mono text-zinc-400">{t?.state?.route || "Route:"}</span>
                      {itin.route?.map((stop, idx) => (
                        <span key={stop} className="flex items-center gap-1.5">
                          <span className="font-semibold">{stop}</span>
                          {idx < (itin.route?.length || 0) - 1 && <span className="text-turmeric">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-6">
          <div className="card-surface p-6 sm:p-7 bg-white/[0.04] border-white/10 rounded-3xl space-y-6">
            <h3 className="font-display text-xl font-bold border-b border-white/10 pb-3">
              {t?.state?.transport || "Transport & Hubs"}
            </h3>

            <div className="space-y-4 text-xs">
              {state.transportHubs?.airport && (
                <div>
                  <span className="text-muted-gray font-mono flex items-center gap-1.5 mb-1">
                    <Plane className="h-3.5 w-3.5 text-turmeric" />
                    {t?.state?.airports || "Major Airports:"}
                  </span>
                  <p className="text-zinc-200 leading-relaxed">{state.transportHubs.airport}</p>
                </div>
              )}

              {state.transportHubs?.railway && (
                <div>
                  <span className="text-muted-gray font-mono flex items-center gap-1.5 mb-1">
                    <Train className="h-3.5 w-3.5 text-teal-400" />
                    {t?.state?.railway || "Key Railway Junctions:"}
                  </span>
                  <p className="text-zinc-200 leading-relaxed">{state.transportHubs.railway}</p>
                </div>
              )}

              {state.transportHubs?.highways && state.transportHubs.highways.length > 0 && (
                <div>
                  <span className="text-muted-gray font-mono flex items-center gap-1.5 mb-1">
                    <Car className="h-3.5 w-3.5 text-rani" />
                    {t?.state?.highways || "National Highways:"}
                  </span>
                  <p className="text-zinc-200 leading-relaxed">{state.transportHubs.highways.join(", ")}</p>
                </div>
              )}
            </div>

            <Link
              href={`/plan?state=${state.slug}`}
              className="btn-primary w-full justify-center !py-2.5 text-xs mt-4"
            >
              {t?.state?.planTrip || "Plan"} {state.name} {t?.state?.trip || "Trip"}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
