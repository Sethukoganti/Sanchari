"use client";

import Link from "next/link";
import { Plane, Train, Bus, Hotel, Sparkles, ShieldCheck, ArrowRight, Clock, Star, MapPin } from "lucide-react";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { flightsData, bookingTrainsData, busesData, staysData } from "@/data/booking";

export default function BookTravelHubPage() {
  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      <PageHero
        eyebrow="Transport & Accommodation Booking Portal"
        title="Book Flights, IRCTC Trains, Intercity Buses & Heritage Stays"
        description="Search real-time domestic flights, Vande Bharat & Rajdhani express trains, EV luxury buses, and curated royal heritage stays across India."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Book Travel" }]} />
      </div>

      {/* Main Search Widget */}
      <div className="container-site section-pad mt-4">
        <BookingWidget />
      </div>

      {/* Quick Booking Categories */}
      <div className="container-site section-pad mt-12 space-y-12">
        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Flights */}
          <Link
            href="/book/flights"
            className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 hover:border-saffron/40 transition-all space-y-4 group"
          >
            <div className="h-12 w-12 rounded-2xl bg-saffron/15 text-saffron flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-warm-white group-hover:text-saffron transition-colors">
                Domestic Flights
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                IndiGo, Air India, Vistara & Akasa Air flights across all Indian airports.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-saffron flex items-center gap-1">
              Search Flights →
            </span>
          </Link>

          {/* Trains */}
          <Link
            href="/book/trains"
            className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 hover:border-emerald-500/40 transition-all space-y-4 group"
          >
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Train className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-warm-white group-hover:text-emerald-500 transition-colors">
                Indian Railways
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Vande Bharat, Rajdhani, Shatabdi & Express seat availability & IRCTC integration.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              Search Trains →
            </span>
          </Link>

          {/* Buses */}
          <Link
            href="/book/buses"
            className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 hover:border-ai-violet/40 transition-all space-y-4 group"
          >
            <div className="h-12 w-12 rounded-2xl bg-ai-violet/15 text-ai-violet flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bus className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-warm-white group-hover:text-ai-violet transition-colors">
                Intercity & EV Buses
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Luxury Volvo AC Sleeper & NueGo electric zero-emission highway buses.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-ai-violet flex items-center gap-1">
              Search Buses →
            </span>
          </Link>

          {/* Stays */}
          <Link
            href="/book/stays"
            className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 hover:border-blue-500/40 transition-all space-y-4 group"
          >
            <div className="h-12 w-12 rounded-2xl bg-blue-500/15 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Hotel className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-warm-white group-hover:text-blue-500 transition-colors">
                Heritage Stays & Hotels
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Royal palaces in Hyderabad & Jaipur, coffee homestays in Araku, and boutique retreats.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-500 flex items-center gap-1">
              Search Stays →
            </span>
          </Link>
        </div>

        {/* Featured Stays Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-saffron font-bold tracking-widest block">
                Handpicked Collections
              </span>
              <h2 className="font-display text-2xl font-bold">Featured Heritage Properties & Retreats</h2>
            </div>

            <Link href="/book/stays" className="btn-secondary !py-2 !px-4 text-xs font-bold">
              View All Stays
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staysData.slice(0, 3).map((stay) => (
              <div
                key={stay.id}
                className="card-surface overflow-hidden rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 flex flex-col justify-between hover:border-saffron/40 transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-black/50 overflow-hidden">
                    <img src={stay.featuredImage} alt={stay.name} className="w-full h-full object-cover" />
                    {stay.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-saffron text-[10px] font-mono font-bold uppercase backdrop-blur-md">
                        {stay.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-saffron font-bold">{stay.propertyType}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold font-mono">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        {stay.rating}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold">{stay.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-mono">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{stay.location}, {stay.state}</span>
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-black/5 dark:border-white/5 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">Starting from</span>
                    <span className="font-display text-lg font-extrabold text-saffron">
                      ₹{stay.pricePerNight.toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-zinc-500"> / night</span>
                    </span>
                  </div>

                  <Link href={`/stays/${stay.slug}`} className="btn-primary !py-2 !px-4 text-xs font-bold">
                    Reserve
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
