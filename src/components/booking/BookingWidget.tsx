"use client";

import { useState } from "react";
import { Plane, Train, Bus, Hotel, Calendar, Users, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type BookingTab = "flights" | "trains" | "buses" | "stays";

const OFFICIAL_BOOKING_URLS = {
  flights: "https://www.airindia.in/",
  trains: "https://www.irctc.co.in/nget/train-search",
  buses: "https://www.redbus.in/",
  stays: "https://www.booking.com/",
} as const;

export function BookingWidget({ className }: { className?: string }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<BookingTab>("flights");

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [travellersCount, setTravellersCount] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [destinationStay, setDestinationStay] = useState("");
  const [stayCheckIn, setStayCheckIn] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const tabKey = activeTab === "stays" ? "stays" : activeTab;
    const url = OFFICIAL_BOOKING_URLS[tabKey];

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
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
                <MapPin className="h-3 w-3 text-white" />
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

            {/* Travellers */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <Users className="h-3 w-3 text-white" />
                <span>Travellers</span>
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={travellersCount}
                onChange={(e) => setTravellersCount(Math.max(1, Number(e.target.value) || 1))}
                placeholder="Number of travellers"
                className="w-full bg-transparent font-mono text-xs font-semibold focus:outline-none"
                required
              />
            </div>

            {/* Class */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <Users className="h-3 w-3 text-white" />
                <span>Class</span>
              </label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full bg-transparent font-mono text-xs font-semibold focus:outline-none cursor-pointer dark:text-white dark:[&>option]:bg-navy-surface"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Destination Stay */}
            <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-navy-dark/60 border border-black/5 dark:border-white/5 space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-500 font-bold flex items-center gap-1">
                <MapPin className="h-3 w-3 text-white" />
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
                <Users className="h-3 w-3 text-white" />
                <span>Guests</span>
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={travellersCount}
                onChange={(e) => setTravellersCount(Math.max(1, Number(e.target.value) || 1))}
                placeholder="Enter number of guests"
                className="w-full bg-transparent font-mono text-xs font-semibold focus:outline-none"
                required
              />
            </div>
          </div>
        )}

        {/* Submit CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-white" />
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
