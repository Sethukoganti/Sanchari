"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Calendar,
  Clock,
  Sparkles,
  Trash2,
  Share2,
  ArrowRight,
  Plus,
  Compass,
} from "lucide-react";
import type { AIGeneratedItinerary } from "@/lib/types";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

export default function SavedTripsPage() {
  const [trips, setTrips] = useState<AIGeneratedItinerary[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<AIGeneratedItinerary | null>(null);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("sanchari_saved_trips") || "[]");
      setTrips(stored);
      if (stored.length > 0) setSelectedTrip(stored[0]);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDeleteTrip = (id: string) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    localStorage.setItem("sanchari_saved_trips", JSON.stringify(updated));
    if (selectedTrip?.id === id) {
      setSelectedTrip(updated[0] || null);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  return (
    <div className="min-h-screen pb-24 text-[#F8FAFC]">
      <PageHero
        eyebrow="My Trips Hub"
        title="Saved AI Itineraries & Journeys"
        description="Manage your generated travel plans, download offline schedules, and continue customizing your dream Indian itineraries."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Saved Trips" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-8">
          {trips.length === 0 ? (
            /* Empty State */
            <div className="card-surface p-12 text-center max-w-lg mx-auto rounded-3xl space-y-5 bg-navy-surface/60 border-white/10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-saffron/15 text-saffron">
                <Bookmark className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold text-warm-white">
                  No Saved Trips Yet
                </h3>
                <p className="text-xs text-muted-gray font-body leading-relaxed">
                  Use our AI Trip Planner to create your first customized, day-by-day Indian itinerary and save it for offline access.
                </p>
              </div>
              <Link href="/plan" className="btn-ai !py-3 !px-6 text-xs inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Create Trip with AI</span>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Left Sidebar: Trip Cards List */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <h3 className="font-display text-lg font-bold text-warm-white">
                    Saved Itineraries ({trips.length})
                  </h3>
                  <Link
                    href="/plan"
                    className="text-xs font-semibold text-saffron hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Plan New</span>
                  </Link>
                </div>

                <div className="space-y-3">
                  {trips.map((t) => {
                    const isSelected = selectedTrip?.id === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTrip(t)}
                        className={cn(
                          "card-surface p-5 rounded-2xl border transition cursor-pointer space-y-3",
                          isSelected
                            ? "bg-navy-light/80 border-saffron shadow-lg shadow-saffron/10"
                            : "bg-navy-surface/40 border-white/10 hover:border-white/20"
                        )}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="font-mono text-[10px] uppercase text-saffron font-bold">
                              {t.destination} · {t.durationDays} Days
                            </span>
                            <h4 className="font-display font-bold text-base text-warm-white">
                              {t.title}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTrip(t.id);
                            }}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-white/5 transition"
                            title="Delete Trip"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center text-xs text-muted-gray border-t border-white/5 pt-2">
                          <span className="font-mono text-saffron font-bold">
                            ₹{t.budgetBreakdown.total.toLocaleString("en-IN")}
                          </span>
                          <span>{t.travellersCount} Traveler(s) · {t.travelStyle}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Detail Pane */}
              <div className="lg:col-span-7">
                {selectedTrip && (
                  <div className="card-surface p-6 sm:p-8 bg-navy-surface/80 border-white/10 rounded-3xl space-y-6">
                    <div className="flex flex-wrap justify-between items-center gap-3 border-b border-white/10 pb-4">
                      <div>
                        <span className="chip !py-1 !px-2.5 text-[10px] text-emerald-accent border-emerald-500/30">
                          Status: Planned
                        </span>
                        <h2 className="font-display text-2xl font-bold text-warm-white mt-1">
                          {selectedTrip.title}
                        </h2>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleShare}
                          className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                          <span>{shareToast ? "Link Copied!" : "Share"}</span>
                        </button>
                        <Link
                          href="/plan"
                          className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                        >
                          <span>Continue Planning</span>
                        </Link>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
                      {selectedTrip.summary}
                    </p>

                    {/* Day-by-Day Timeline summary */}
                    <div className="space-y-3 pt-2">
                      <h4 className="font-display font-bold text-base text-warm-white">
                        Day-by-Day Route Overview:
                      </h4>
                      <div className="space-y-2 text-xs">
                        {selectedTrip.days.map((d) => (
                          <div
                            key={d.day}
                            className="p-3 rounded-xl bg-navy-dark/60 border border-white/5 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-saffron text-black font-mono font-bold text-xs">
                                D{d.day}
                              </span>
                              <span className="font-semibold text-warm-white">{d.theme}</span>
                            </div>
                            <span className="font-mono text-muted-gray">
                              {d.activities.length} Activities
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total Budget Card */}
                    <div className="p-4 rounded-2xl bg-saffron/10 border border-saffron/30 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-mono text-saffron font-bold uppercase block">
                          Total Estimated Cost
                        </span>
                        <span className="text-xs text-muted-gray">
                          Includes Stays, Food, Activities & Transit
                        </span>
                      </div>
                      <span className="font-mono text-xl font-black text-saffron">
                        ₹{selectedTrip.budgetBreakdown.total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

