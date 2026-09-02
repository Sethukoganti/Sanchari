"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Train, Bus, Hotel, Calendar, Users, MapPin, Search, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type BookingTab = "flights" | "trains" | "buses" | "stays";

export function BookingWidget({ className }: { className?: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<BookingTab>("flights");

  // Search Fields
  const [fromCity, setFromCity] = useState("New Delhi");
  const [toCity, setToCity] = useState("Hyderabad");
  const [departureDate, setDepartureDate] = useState("2026-09-15");
  const [returnDate, setReturnDate] = useState("");
  const [travellersCount, setTravellersCount] = useState(2);
  const [travelClass, setTravelClass] = useState("Economy");
  const [destinationStay, setDestinationStay] = useState("Hyderabad");
  const [stayCheckIn, setStayCheckIn] = useState("2026-09-15");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "flights") {
      router.push(`/book/flights?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${departureDate}&class=${travelClass}`);
    } else if (activeTab === "trains") {
      router.push(`/book/trains?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${departureDate}&class=${travelClass}`);
    } else if (activeTab === "buses") {
      router.push(`/book/buses?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${departureDate}`);
    } else {
      router.push(`/book/stays?destination=${encodeURIComponent(destinationStay)}&checkIn=${stayCheckIn}&guests=${travellersCount}`);
    }
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto rounded-3xl p-4 sm:p-6 bg-white/95 dark:bg-navy-surface/90 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-2xl text-zinc-900 dark:text-warm-white transition-all", className)}>
      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-black/10 dark:border-white/10 pb-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("flights")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0",
            activeTab === "flights"
              ? "bg-saffron text-white shadow-md shadow-saffron/25"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
          )}
        >
          <Plane className="h-4 w-4" />
          <span>Flights</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("trains")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0",
            activeTab === "trains"
              ? "bg-saffron text-white shadow-md shadow-saffron/25"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
          )}
        >
          <Train className="h-4 w-4" />
          <span>Trains (IRCTC)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("buses")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0",
            activeTab === "buses"
              ? "bg-saffron text-white shadow-md shadow-saffron/25"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
          )}
        >
          <Bus className="h-4 w-4" />
          <span>Buses</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stays")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0",
            activeTab === "stays"
              ? "bg-saffron text-white shadow-md shadow-saffron/25"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5"
          )}
        >
          <Hotel className="h-4 w-4" />
          <span>Stays & Hotels</span>
        </button>
      </div>

      {/* Form Grid */}
      <form onSubmit={handleSearch} className="mt-5 space-y-4">
        {activeTab !== "stays" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* From */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <MapPin className="h-3 w-3 text-saffron" />
                <span>From</span>
              </label>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="City or Station"
                className="w-full bg-transparent font-display font-bold text-sm focus:outline-none"
                required
              />
            </div>

            {/* To */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <MapPin className="h-3 w-3 text-emerald-500" />
                <span>To</span>
              </label>
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Destination City"
                className="w-full bg-transparent font-display font-bold text-sm focus:outline-none"
                required
              />
            </div>

            {/* Date */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <Calendar className="h-3 w-3 text-ai-violet" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent font-mono text-xs font-semibold focus:outline-none"
                required
              />
            </div>

            {/* Travellers / Class */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <Users className="h-3 w-3 text-amber-500" />
                <span>Travellers & Class</span>
              </label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full bg-transparent font-mono text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Economy">2 Adults · Economy</option>
                <option value="Premium Economy">2 Adults · Premium</option>
                <option value="Business / 1A">2 Adults · Business / 1A</option>
                <option value="Vande Bharat CC">2 Adults · Chair Car</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Destination Stay */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <MapPin className="h-3 w-3 text-saffron" />
                <span>Destination or Property</span>
              </label>
              <input
                type="text"
                value={destinationStay}
                onChange={(e) => setDestinationStay(e.target.value)}
                placeholder="e.g. Hyderabad, Hampi, Araku"
                className="w-full bg-transparent font-display font-bold text-sm focus:outline-none"
                required
              />
            </div>

            {/* Check-in */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <Calendar className="h-3 w-3 text-ai-violet" />
                <span>Check-in Date</span>
              </label>
              <input
                type="date"
                value={stayCheckIn}
                onChange={(e) => setStayCheckIn(e.target.value)}
                className="w-full bg-transparent font-mono text-xs font-semibold focus:outline-none"
                required
              />
            </div>

            {/* Guests */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <Users className="h-3 w-3 text-amber-500" />
                <span>Guests</span>
              </label>
              <select
                value={travellersCount}
                onChange={(e) => setTravellersCount(Number(e.target.value))}
                className="w-full bg-transparent font-mono text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value={1}>1 Guest (1 Room)</option>
                <option value={2}>2 Guests (1 Room)</option>
                <option value={4}>4 Guests (2 Rooms)</option>
                <option value={6}>6+ Guests (Family Suite)</option>
              </select>
            </div>
          </div>
        )}

        {/* Submit CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>Direct IRCTC, Airline & Verified Stay Engine Sync</span>
          </div>

          <button
            type="submit"
            className="btn-primary !py-3 !px-8 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-saffron/25"
          >
            <span>Search {activeTab.toUpperCase()}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
