"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bus, Filter, Star, Clock, ArrowRight, ShieldCheck, Check, Sparkles, MapPin } from "lucide-react";
import { busesData } from "@/data/booking";
import type { BusOption, UserBooking } from "@/lib/types";
import { BusSeatSelectionModal } from "@/components/booking/BusSeatSelectionModal";
import { BookingCheckoutModal } from "@/components/booking/BookingCheckoutModal";
import { TicketViewModal } from "@/components/booking/TicketViewModal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

function BusesSearchContent() {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "New Delhi";
  const toParam = searchParams.get("to") || "Jaipur";
  const dateParam = searchParams.get("date") || "2026-09-15";

  // State
  const [selectedBusForSeats, setSelectedBusForSeats] = useState<BusOption | null>(null);
  const [checkoutData, setCheckoutData] = useState<{ bus: BusOption; seats: string[]; fare: number } | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<UserBooking | null>(null);
  const [busTypeFilter, setBusTypeFilter] = useState<string>("All");

  const filteredBuses = useMemo(() => {
    return busesData.filter((b) => {
      if (busTypeFilter === "All") return true;
      return b.busType.includes(busTypeFilter);
    });
  }, [busTypeFilter]);

  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      {/* Top Banner */}
      <div className="bg-navy-dark text-white py-10 border-b border-white/10">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Book Travel", href: "/book" },
              { label: "Buses" },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-saffron tracking-widest font-bold block mb-1">
                Intercity Luxury & EV Buses
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                {fromParam} → {toParam}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Travel Date: <span className="text-warm-white font-semibold">{dateParam}</span> · {filteredBuses.length} Buses Available
              </p>
            </div>

            <Link href="/book" className="btn-secondary !py-2 !px-4 text-xs font-bold">
              Modify Search
            </Link>
          </div>
        </div>
      </div>

      {/* Main Results */}
      <div className="container-site section-pad mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                <h3 className="font-display text-base font-bold flex items-center gap-2">
                  <Filter className="h-4 w-4 text-white" />
                  <span>Bus Type</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setBusTypeFilter("All")}
                  className="text-[11px] font-mono text-saffron hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {["All", "Electric Bus", "AC Sleeper", "Volvo", "Seater"].map((bt) => (
                  <label key={bt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="busType"
                      checked={busTypeFilter === bt}
                      onChange={() => setBusTypeFilter(bt)}
                      className="text-saffron focus:ring-saffron"
                    />
                    <span>{bt === "All" ? "All Bus Types" : bt}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Buses List */}
          <main className="lg:col-span-9 space-y-6">
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-4 hover:border-saffron/40 transition-all"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-saffron font-bold">
                      {bus.busType}
                    </span>
                    <h3 className="font-display text-lg font-bold mt-0.5">{bus.operator}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/10 text-amber-500 font-mono text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-white" />
                      {bus.rating} ({bus.reviewsCount})
                    </span>
                    {bus.isBestOption && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold uppercase">
                        ⭐ Top Rated Operator
                      </span>
                    )}
                  </div>
                </div>

                {/* Timings & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-8 flex items-center justify-between gap-4 text-center">
                    <div className="text-left">
                      <p className="font-display text-lg font-extrabold">{bus.departureTime}</p>
                      <p className="text-xs text-zinc-500">{bus.fromCity}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-zinc-400">{bus.duration}</span>
                      <div className="w-20 h-0.5 bg-saffron/60 relative my-1">
                        <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-saffron" />
                      </div>
                      <span className="text-[10px] text-zinc-400">Direct Highway</span>
                    </div>

                    <div className="text-right">
                      <p className="font-display text-lg font-extrabold">{bus.arrivalTime}</p>
                      <p className="text-xs text-zinc-500">{bus.toCity}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-black/10 dark:border-white/10 pt-3 sm:pt-0">
                    <div>
                      <p className="font-display text-2xl font-extrabold text-saffron">
                        ₹{bus.basePrice.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] font-mono text-zinc-500 text-right">
                        {bus.seatsAvailable} seats available
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedBusForSeats(bus)}
                      className="btn-primary !py-2 !px-5 text-xs font-bold cursor-pointer"
                    >
                      <span>View Seats & Book</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Amenities */}
                <div className="border-t border-black/5 dark:border-white/5 pt-3 flex flex-wrap gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {bus.amenities.map((am) => (
                    <span key={am} className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-navy-dark">
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* Seat Selection Modal */}
      {selectedBusForSeats && (
        <BusSeatSelectionModal
          bus={selectedBusForSeats}
          isOpen={!!selectedBusForSeats}
          onClose={() => setSelectedBusForSeats(null)}
          onProceedToPassengerDetails={(seats, fare) => {
            const currentBus = selectedBusForSeats;
            setSelectedBusForSeats(null);
            setCheckoutData({ bus: currentBus, seats, fare });
          }}
        />
      )}

      {/* Checkout Modal */}
      {checkoutData && (
        <BookingCheckoutModal
          isOpen={!!checkoutData}
          onClose={() => setCheckoutData(null)}
          bookingType="bus"
          itemTitle={`${checkoutData.bus.operator} (${checkoutData.bus.busType})`}
          itemSubtitle={`${checkoutData.bus.fromCity} → ${checkoutData.bus.toCity}`}
          from={checkoutData.bus.fromCity}
          to={checkoutData.bus.toCity}
          travelDate={dateParam}
          selectedSeats={checkoutData.seats}
          totalPrice={checkoutData.fare}
          onBookingSuccess={(booking) => {
            setCheckoutData(null);
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

export default function BusesSearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono">Loading bus search...</div>}>
      <BusesSearchContent />
    </Suspense>
  );
}
