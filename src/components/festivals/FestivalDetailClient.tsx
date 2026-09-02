"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Utensils,
  Music,
  Heart,
  Share2,
  Check,
  Bell,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import type { Festival } from "@/lib/types";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShareButton } from "@/components/common/ShareButton";
import { isValidEmail } from "@/lib/utils";

interface FestivalDetailClientProps {
  festival: Festival;
}

export function FestivalDetailClient({ festival }: FestivalDetailClientProps) {
  const [reminderEmail, setReminderEmail] = useState("");
  const [reminderState, setReminderState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleReminderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(reminderEmail)) return;

    setReminderState("loading");
    try {
      const res = await fetch("/api/festival-reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          festivalSlug: festival.slug,
          festivalName: festival.name,
          email: reminderEmail,
        }),
      });
      if (res.ok) setReminderState("success");
      else setReminderState("error");
    } catch {
      setReminderState("error");
    }
  };

  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      {/* Hero Header */}
      <section className="relative min-h-[60vh] bg-black text-white overflow-hidden flex items-end">
        <Image
          src={festival.gallery?.[0] || festival.image || "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1200&q=80"}
          alt={festival.name}
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

        <div className="relative container-site section-pad pb-14 pt-36 w-full space-y-4">
          <Breadcrumbs
            items={[
              { label: "Festivals", href: "/festivals" },
              { label: festival.name },
            ]}
          />

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-turmeric/20 px-3 py-1 font-mono text-xs font-bold text-turmeric uppercase border border-turmeric/40 backdrop-blur-md">
              {festival.type} {festival.religion ? `· ${festival.religion}` : ""}
            </span>
            <span className="text-xs text-zinc-300">
              Duration: <strong className="text-warm-white">{festival.duration || `${festival.durationDays} Days`}</strong>
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black text-warm-white tracking-tight">
            {festival.name}
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-zinc-200 leading-relaxed font-body">
            {festival.significance}
          </p>

          <div className="pt-2">
            <ShareButton title={`${festival.name} Guide`} text={festival.significance} />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container-site section-pad mt-12 grid gap-10 lg:grid-cols-12">
        <main className="lg:col-span-8 space-y-10">
          {/* Rituals & Sacred Traditions */}
          {festival.rituals && festival.rituals.length > 0 && (
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-6">
              <h2 className="font-display text-2xl font-bold text-warm-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-turmeric" />
                Sacred Rituals & Ceremonies
              </h2>
              <div className="space-y-4">
                {festival.rituals.map((r: any) => (
                  <div
                    key={r.name}
                    className="rounded-2xl border border-white/5 bg-black/40 p-5 space-y-2"
                  >
                    <h3 className="font-display text-lg font-bold text-warm-white">{r.name}</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-body">
                      {r.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Festive Delicacies */}
          {festival.foods && festival.foods.length > 0 && (
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-6">
              <h2 className="font-display text-2xl font-bold text-warm-white flex items-center gap-2">
                <Utensils className="h-5 w-5 text-rani" />
                Festive Gastronomy & Sweets
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {festival.foods.map((food: any) => (
                  <div
                    key={food.name}
                    className="rounded-2xl border border-white/5 bg-black/40 p-4 space-y-2"
                  >
                    <h3 className="font-display text-base font-bold text-warm-white">{food.name}</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-body">
                      {food.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traditional Attire & Music */}
          {(festival.dress || (festival.music && festival.music.length > 0)) && (
            <div className="grid gap-6 sm:grid-cols-2">
              {festival.dress && (
                <div className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3">
                  <h3 className="font-display text-lg font-bold text-warm-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-teal-400" />
                    Traditional Dress Code
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{festival.dress}</p>
                </div>
              )}

              {festival.music && festival.music.length > 0 && (
                <div className="card-surface p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3">
                  <h3 className="font-display text-lg font-bold text-warm-white flex items-center gap-2">
                    <Music className="h-4 w-4 text-amber-400" />
                    Folk Music & Dances
                  </h3>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {festival.music.map((m: any) => (
                      <span key={typeof m === "string" ? m : m.name} className="chip !py-0.5 !px-2.5 text-[10px]">
                        {typeof m === "string" ? m : m.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prime Celebration Spots */}
          {festival.bestPlacesToCelebrate && festival.bestPlacesToCelebrate.length > 0 && (
            <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl space-y-6">
              <h2 className="font-display text-2xl font-bold text-warm-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-turmeric" />
                Best Places in India to Celebrate
              </h2>
              <div className="space-y-4">
                {festival.bestPlacesToCelebrate.map((spot: any) => (
                  <div
                    key={spot.place}
                    className="rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-warm-white">
                        {spot.place}, {spot.state}
                      </h3>
                      <p className="text-xs text-zinc-300 mt-1">{spot.whySpecial}</p>
                    </div>
                    {spot.destinationSlug && (
                      <Link
                        href={`/destinations/${spot.destinationSlug}`}
                        className="btn-secondary !py-1.5 !px-3 text-xs shrink-0"
                      >
                        Destination Guide →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Sidebar: Calendar & Reminder */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="card-surface p-6 sm:p-7 bg-white/[0.04] border-white/10 rounded-3xl space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="font-mono text-[10px] text-muted-gray uppercase block">Approx Date</span>
              <p className="font-display text-xl font-bold text-turmeric">
                {festival.date?.gregorianApprox || festival.date?.approximateString || festival.date?.month || "Seasonal"}
              </p>
              {festival.date?.type && (
                <span className="text-xs text-zinc-400 block">Calendar Type: {festival.date.type}</span>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-base font-bold text-warm-white flex items-center gap-2">
                <Bell className="h-4 w-4 text-turmeric" />
                Set a Festival Alert
              </h4>
              <p className="text-xs text-muted-gray">
                Receive an email 1 week before {festival.name} with celebration guides and rituals.
              </p>

              {reminderState === "success" ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Reminder set successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleReminderSubmit} className="space-y-2 pt-1">
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={reminderEmail}
                    onChange={(e) => setReminderEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-turmeric"
                  />
                  <button
                    type="submit"
                    disabled={reminderState === "loading"}
                    className="btn-primary w-full justify-center !py-2.5 text-xs"
                  >
                    {reminderState === "loading" ? "Setting..." : "Alert Me"}
                  </button>
                </form>
              )}
            </div>

            {festival.touristInfo && (
              <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                <h4 className="font-semibold text-warm-white">Traveler Advisory</h4>
                <ul className="space-y-1.5 text-zinc-300">
                  {festival.touristInfo.tips?.map((t: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-turmeric">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
