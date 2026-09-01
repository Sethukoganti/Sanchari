"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Navigation,
  MapPin,
  ShieldAlert,
  PhoneCall,
  CloudSun,
  Compass,
  AlertTriangle,
  Heart,
  Volume2,
  Sparkles,
} from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

const EMERGENCY_HELPLINES = [
  { name: "National Emergency All-in-One", number: "112", icon: "🚨", desc: "Pan-India emergency for Police, Fire, Ambulance" },
  { name: "Tourist Helpline (24x7 Multi-lingual)", number: "1800 11 1363", icon: "🇮🇳", desc: "Toll-free Ministry of Tourism helpline (12 languages)" },
  { name: "Women Traveler Helpline", number: "1091", icon: "🛡️", desc: "Dedicated safety and grievance support line" },
  { name: "Railway Security Helpline", number: "139", icon: "🚆", desc: "Instant assistance on trains and railway platforms" },
  { name: "Medical Ambulance & Trauma", number: "108", icon: "🚑", desc: "National emergency medical response" },
];

export default function TravelSmartPage() {
  const [activeLocation, setActiveLocation] = useState("Hampi");
  const dest = destinationsData.find((d) => d.name.includes(activeLocation)) || destinationsData[0];

  return (
    <div className="min-h-screen pb-24 text-[#F8FAFC]">
      <PageHero
        eyebrow="On-Ground Intelligence"
        title="Travel Smart Live Assistant"
        description="Real-time proximity radar, verified emergency helplines, seasonal weather alerts, and cultural safety advisories for your journey."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Travel Smart" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-12">
          {/* Active Proximity Radar Simulation */}
          <div className="card-surface p-6 sm:p-8 bg-navy-surface/80 border-saffron/40 rounded-3xl space-y-6 shadow-2xl shadow-saffron/5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
                </span>
                <div>
                  <span className="font-mono text-xs text-saffron uppercase font-bold tracking-wider block">
                    Live Proximity Radar Active
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-warm-white">
                    You&apos;re currently near: <strong className="text-emerald-accent">{dest.name} ({dest.state})</strong>
                  </h3>
                </div>
              </div>

              {/* Location Switcher for Testing */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-gray hidden sm:inline">Simulate Location:</span>
                <select
                  value={activeLocation}
                  onChange={(e) => setActiveLocation(e.target.value)}
                  className="rounded-xl border border-white/15 bg-navy-dark px-3 py-1.5 text-xs text-warm-white outline-none focus:border-saffron"
                >
                  <option value="Hampi">Hampi, Karnataka</option>
                  <option value="Hyderabad">Hyderabad, Telangana</option>
                  <option value="Varanasi">Varanasi, UP</option>
                  <option value="Goa">Goa</option>
                  <option value="Araku">Araku Valley, AP</option>
                  <option value="Ziro">Ziro, Arunachal</option>
                </select>
              </div>
            </div>

            {/* Nearby Highlights Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-2xl bg-navy-dark/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-saffron font-bold uppercase flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Nearby Attractions:
                </span>
                <p className="text-xs text-warm-white font-semibold">{dest.highlights[0] || "Ancient Temple Complex"}</p>
                <span className="text-[11px] text-muted-gray block">Distance: ~0.8 km · 10 min walk</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-dark/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-emerald-accent font-bold uppercase flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" />
                  Verified Food Trail:
                </span>
                <p className="text-xs text-warm-white font-semibold">{dest.localCuisine[0]?.name || "Traditional Regional Meal"}</p>
                <span className="text-[11px] text-muted-gray block">Distance: ~0.4 km · Highly Recommended</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-dark/60 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-ai-light font-bold uppercase flex items-center gap-1.5">
                  <CloudSun className="h-3.5 w-3.5" />
                  Current Climate & Best Time:
                </span>
                <p className="text-xs text-warm-white font-semibold">{dest.bestTime}</p>
                <span className="text-[11px] text-muted-gray block">Crowd: {dest.crowdLevel || "Moderate"}</span>
              </div>
            </div>
          </div>

          {/* Emergency SOS Numbers Directory */}
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-3">
              <h2 className="font-display text-2xl font-bold text-warm-white flex items-center gap-2">
                <ShieldAlert className="h-6 w-6 text-rose-400" />
                Verified National Emergency Helplines (24x7)
              </h2>
              <p className="text-xs text-muted-gray mt-1">
                Toll-free emergency numbers accessible across all Indian mobile operators and payphones without SIM.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {EMERGENCY_HELPLINES.map((sos) => (
                <div
                  key={sos.number}
                  className="card-surface p-5 bg-navy-surface/60 border-white/10 rounded-2xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{sos.icon}</span>
                      <h4 className="font-display font-bold text-sm text-warm-white">{sos.name}</h4>
                    </div>
                    <p className="text-xs text-zinc-300 font-body">{sos.desc}</p>
                  </div>

                  <a
                    href={`tel:${sos.number}`}
                    className="btn-secondary w-full justify-center !py-2 text-xs flex items-center gap-2 font-mono font-bold text-rose-300 hover:border-rose-400"
                  >
                    <PhoneCall className="h-3.5 w-3.5 text-rose-400" />
                    <span>Call {sos.number}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Women Traveler & Solo Safety Advisories */}
          <div className="card-surface p-6 sm:p-8 bg-navy-surface/60 border-white/10 rounded-3xl space-y-4">
            <h3 className="font-display text-xl font-bold text-warm-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-saffron" />
              Solo & Women Traveler Field Guidelines
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 text-xs text-zinc-300 font-body leading-relaxed">
              <ul className="space-y-2 list-disc pl-4">
                <li>Use app-based registered cabs (Uber / Ola / BluSmart) or government prepaid taxi counters at airports and railway stations.</li>
                <li>Download offline Google Maps and save emergency contacts on speed dial before embarking on remote mountain passes.</li>
                <li>Keep photocopies of your passport, visa, and hotel booking vouchers separate from your digital phone storage.</li>
              </ul>
              <ul className="space-y-2 list-disc pl-4">
                <li>When using Indian Railways, lock your luggage beneath your berth with a cable lock and verify your coach number on official NTES app.</li>
                <li>Carry emergency cash notes (₹100, ₹200) as remote rural valleys may experience intermittent mobile tower connectivity for UPI.</li>
                <li>Respect regional temple dress codes (covering shoulders and knees) to ensure smooth access into sacred sanctums.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

