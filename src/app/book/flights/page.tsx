"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plane,
  Filter,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { flightsData } from "@/data/booking";
import type { FlightOption, UserBooking } from "@/lib/types";
import { BookingCheckoutModal } from "@/components/booking/BookingCheckoutModal";
import { TicketViewModal } from "@/components/booking/TicketViewModal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

function FlightSearchContent() {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "New Delhi";
  const toParam = searchParams.get("to") || "Hyderabad";
  const dateParam = searchParams.get("date") || "2026-09-15";
  const classParam = searchParams.get("class") || "Economy";

  // Filter States
  const [maxPrice, setMaxPrice] = useState(15000);
  const [stopsFilter, setStopsFilter] = useState<number | "all">("all");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"cheapest" | "fastest" | "recommended">("recommended");

  // Booking Modal State
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<UserBooking | null>(null);

  const airlinesList = useMemo(() => {
    return Array.from(new Set(flightsData.map((f) => f.airline)));
  }, []);

  const toggleAirline = (airline: string) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  const filteredFlights = useMemo(() => {
    let list = flightsData.filter((f) => f.price <= maxPrice);

    if (stopsFilter !== "all") {
      list = list.filter((f) => f.stops === stopsFilter);
    }

    if (selectedAirlines.length > 0) {
      list = list.filter((f) => selectedAirlines.includes(f.airline));
    }

    if (sortBy === "cheapest") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "fastest") {
      list.sort((a, b) => a.duration.localeCompare(b.duration));
    } else {
      list.sort((a, b) => (b.isBestOption ? 1 : 0) - (a.isBestOption ? 1 : 0));
    }

    return list;
  }, [maxPrice, stopsFilter, selectedAirlines, sortBy]);

  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      {/* Top Search Bar / Banner */}
      <div className="bg-navy-dark text-white py-10 border-b border-white/10">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Book Travel", href: "/book" },
              { label: "Flights" },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-saffron tracking-widest font-bold block mb-1">
                Domestic Flights Search
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                {fromParam} → {toParam}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Departure: <span className="text-warm-white font-semibold">{dateParam}</span> · {classParam} · {filteredFlights.length} Flights Available
              </p>
            </div>

            <Link href="/book" className="btn-secondary !py-2 !px-4 text-xs font-bold">
              Modify Search
            </Link>
          </div>
        </div>
      </div>

      {/* Main Results Layout */}
      <div className="container-site section-pad mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                <h3 className="font-display text-base font-bold flex items-center gap-2">
                  <Filter className="h-4 w-4 text-white" />
                  <span>Filters</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setMaxPrice(15000);
                    setStopsFilter("all");
                    setSelectedAirlines([]);
                  }}
                  className="text-[11px] font-mono text-saffron hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold">Max Price</span>
                  <span className="font-bold text-saffron font-mono">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={15000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-saffron"
                />
              </div>

              {/* Stops Filter */}
              <div>
                <label className="block text-xs font-bold mb-2">Stops</label>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stops"
                      checked={stopsFilter === "all"}
                      onChange={() => setStopsFilter("all")}
                      className="text-saffron focus:ring-saffron"
                    />
                    <span>All Flights</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stops"
                      checked={stopsFilter === 0}
                      onChange={() => setStopsFilter(0)}
                      className="text-saffron focus:ring-saffron"
                    />
                    <span>Direct (Non-Stop) Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stops"
                      checked={stopsFilter === 1}
                      onChange={() => setStopsFilter(1)}
                      className="text-saffron focus:ring-saffron"
                    />
                    <span>1 Stop</span>
                  </label>
                </div>
              </div>

              {/* Airlines Filter */}
              <div>
                <label className="block text-xs font-bold mb-2">Airlines</label>
                <div className="space-y-1.5 text-xs">
                  {airlinesList.map((airline) => (
                    <label key={airline} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => toggleAirline(airline)}
                        className="rounded text-saffron focus:ring-saffron"
                      />
                      <span>{airline}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Flights List */}
          <main className="lg:col-span-9 space-y-6">
            {/* Sort Bar */}
            <div className="card-surface p-4 rounded-2xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-white" />
                <span className="text-xs font-bold font-mono">Sort By:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortBy("recommended")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition",
                    sortBy === "recommended"
                      ? "bg-saffron text-white shadow-sm"
                      : "bg-black/5 dark:bg-white/5 hover:bg-black/10"
                  )}
                >
                  Recommended
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("cheapest")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition",
                    sortBy === "cheapest"
                      ? "bg-saffron text-white shadow-sm"
                      : "bg-black/5 dark:bg-white/5 hover:bg-black/10"
                  )}
                >
                  Cheapest First
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("fastest")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition",
                    sortBy === "fastest"
                      ? "bg-saffron text-white shadow-sm"
                      : "bg-black/5 dark:bg-white/5 hover:bg-black/10"
                  )}
                >
                  Fastest
                </button>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 hover:border-saffron/40 transition-all space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center font-black text-xs font-mono">
                        {flight.airlineCode}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm">{flight.airline}</h4>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Flight #{flight.flightNumber} · {flight.cabinClass}
                        </span>
                      </div>
                    </div>

                    {flight.isBestOption && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase">
                        ⭐ Best Value / Fastest
                      </span>
                    )}
                  </div>

                  {/* Timings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 flex items-center justify-between gap-4 text-center">
                      <div className="text-left">
                        <p className="font-display text-xl font-extrabold">{flight.departureTime}</p>
                        <p className="text-xs text-zinc-500">{flight.fromCity}</p>
                        <span className="text-[10px] font-mono text-zinc-400">({flight.fromCode})</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono text-zinc-400">{flight.duration}</span>
                        <div className="w-24 h-0.5 bg-saffron/60 relative my-1">
                          <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-saffron" />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                          {flight.stops === 0 ? "Non-Stop" : `${flight.stops} Stop`}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="font-display text-xl font-extrabold">{flight.arrivalTime}</p>
                        <p className="text-xs text-zinc-500">{flight.toCity}</p>
                        <span className="text-[10px] font-mono text-zinc-400">({flight.toCode})</span>
                      </div>
                    </div>

                    <div className="sm:col-span-4 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-black/10 dark:border-white/10 pt-3 sm:pt-0">
                      <div>
                        <p className="font-display text-2xl font-extrabold text-saffron">
                          ₹{flight.price.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-400 text-right">Per passenger</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedFlight(flight)}
                        className="btn-primary !py-2 !px-5 text-xs font-bold cursor-pointer"
                      >
                        <span>Book Flight</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedFlight && (
        <BookingCheckoutModal
          isOpen={!!selectedFlight}
          onClose={() => setSelectedFlight(null)}
          bookingType="flight"
          itemTitle={`${selectedFlight.airline} (${selectedFlight.flightNumber})`}
          itemSubtitle={`${selectedFlight.fromCity} → ${selectedFlight.toCity}`}
          from={selectedFlight.fromCity}
          to={selectedFlight.toCity}
          travelDate={dateParam}
          selectedClass={classParam}
          totalPrice={selectedFlight.price}
          onBookingSuccess={(booking) => {
            setSelectedFlight(null);
            setConfirmedBooking(booking);
          }}
        />
      )}

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <TicketViewModal
          isOpen={!!confirmedBooking}
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}
    </div>
  );
}

export default function FlightsSearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono">Loading flight search...</div>}>
      <FlightSearchContent />
    </Suspense>
  );
}
