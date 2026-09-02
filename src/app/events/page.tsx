"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Sparkles, Filter, ArrowRight, Plus } from "lucide-react";
import { eventsData } from "@/data/events";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

const MONTHS = ["All", "September", "November", "December", "March"];
const CATEGORIES = ["All", "Music & Indie Culture", "Cultural Fair & Heritage", "Spiritual & Sacred", "Indigenous Tribal Culture", "Food Festival"];

export default function EventsPage() {
  const [activeMonth, setActiveMonth] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = eventsData.filter((evt) => {
    const matchMonth = activeMonth === "All" || evt.date.month === activeMonth;
    const matchCategory = activeCategory === "All" || evt.category === activeCategory;
    return matchMonth && matchCategory;
  });

  return (
    <div className="min-h-screen pb-24 text-[#F8FAFC]">
      <PageHero
        eyebrow="Living Cultural Traditions"
        title="Events, Fairs & Living Festivals"
        description="Discover vibrant tribal celebrations, desert camel melas, and classical riverside music gatherings across India."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Events & Festivals" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-8">
          {/* Filters Bar */}
          <div className="card-surface p-6 bg-navy-surface/60 border-white/10 rounded-3xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-saffron font-bold block mb-2">
                  Filter by Month:
                </label>
                <div className="flex flex-wrap gap-2">
                  {MONTHS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setActiveMonth(m)}
                      className={cn(
                        "chip !py-1 !px-3 text-xs font-semibold cursor-pointer",
                        activeMonth === m && "chip-active"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-emerald-accent font-bold block mb-2">
                  Filter by Category:
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "chip !py-1 !px-3 text-xs font-semibold cursor-pointer",
                        activeCategory === cat && "chip-active"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="group card-surface overflow-hidden bg-navy-surface/60 border-white/10 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-saffron/40 hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={evt.image || evt.heroImage || evt.gallery?.[0] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
                      alt={evt.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-black/30" />

                    <div className="absolute top-3.5 left-3.5">
                      <span className="chip !py-1 !px-2.5 text-[10px] bg-black/60 backdrop-blur-md text-saffron border-saffron/30 font-mono font-bold">
                        {evt.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-center text-xs">
                      <span className="text-warm-white font-semibold flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-saffron" />
                        {evt.date.approximateString || evt.date.month || "Upcoming"}
                      </span>
                      <span className="text-muted-gray text-[11px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                        {evt.state}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-lg font-bold text-warm-white group-hover:text-saffron transition-colors">
                      {evt.name}
                    </h3>
                    <p className="text-xs text-zinc-300 font-body leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    <div className="pt-2 text-xs text-muted-gray border-t border-white/5 space-y-1">
                      <div>Location: <strong className="text-warm-white">{evt.location}</strong></div>
                      {evt.entryFee && (
                        <div>Entry: <strong className="text-emerald-accent font-mono">{evt.entryFee}</strong></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <Link
                    href="/plan"
                    className="btn-primary w-full justify-center !py-2 text-xs flex items-center gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add to AI Trip Planner</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
