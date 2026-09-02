"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Train, Filter, Clock, ArrowRight, ShieldCheck, Check, Sparkles, SlidersHorizontal } from "lucide-react";
import { bookingTrainsData } from "@/data/booking";
import type { TrainOption, UserBooking } from "@/lib/types";
import { BookingCheckoutModal } from "@/components/booking/BookingCheckoutModal";
import { TicketViewModal } from "@/components/booking/TicketViewModal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

function TrainsSearchContent() {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "Secunderabad";
  const toParam = searchParams.get("to") || "Visakhapatnam";
  const dateParam = searchParams.get("date") || "2026-09-15";
  const classParam = searchParams.get("class") || "All Classes";

  // State
  const [selectedTrain, setSelectedTrain] = useState<{ train: TrainOption; selectedClass: any } | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<UserBooking | null>(null);
  const [classFilter, setClassFilter] = useState<string>("All");

  const filteredTrains = useMemo(() => {
    return bookingTrainsData.filter((tr) => {
      if (classFilter === "All") return true;
      return tr.classes.some((c) => c.className === classFilter);
    });
  }, [classFilter]);

  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      {/* Top Banner */}
      <div className="bg-navy-dark text-white py-10 border-b border-white/10">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Book Travel", href: "/book" },
              { label: "Trains" },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-saffron tracking-widest font-bold block mb-1">
                Indian Railways Portal · IRCTC Compatible
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                {fromParam} → {toParam}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Journey Date: <span className="text-warm-white font-semibold">{dateParam}</span> · {filteredTrains.length} Trains Available
              </p>
            </div>

            <Link href="/book" className="btn-secondary !py-2 !px-4 text-xs font-bold">
              Modify Search
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-site section-pad mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Class Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                <h3 className="font-display text-base font-bold flex items-center gap-2">
                  <Filter className="h-4 w-4 text-white" />
                  <span>Travel Class</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setClassFilter("All")}
                  className="text-[11px] font-mono text-saffron hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {["All", "CC", "EC", "3A", "2A", "1A", "SL"].map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="class"
                      checked={classFilter === c}
                      onChange={() => setClassFilter(c)}
                      className="text-saffron focus:ring-saffron"
                    />
                    <span>{c === "All" ? "All Classes" : `${c} Class`}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 text-xs text-zinc-500 dark:text-muted-gray space-y-2 font-mono">
                <p>✓ Authorized Indian Railways schedule sync</p>
                <p>✓ Foreign Tourist Quota (FTQ) support</p>
              </div>
            </div>
          </aside>

          {/* Trains List */}
          <main className="lg:col-span-9 space-y-6">
            {filteredTrains.map((train) => (
              <div
                key={train.id}
                className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-5"
              >
                {/* Train Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-saffron font-bold">
                      Train #{train.trainNumber} · Runs on {train.runningDays.join(", ")}
                    </span>
                    <h3 className="font-display text-xl font-bold mt-0.5">{train.trainName}</h3>
                  </div>

                  {train.isBestOption && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase">
                      ⭐ Recommended · Fastest Circuit
                    </span>
                  )}
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-3 gap-2 text-center py-2">
                  <div className="text-left">
                    <p className="font-display text-lg font-extrabold">{train.departureTime}</p>
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{train.fromStation}</p>
                    <span className="text-[10px] font-mono text-zinc-400">({train.fromStationCode})</span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] font-mono text-zinc-400">{train.duration}</span>
                    <div className="w-24 h-0.5 bg-saffron/60 relative my-1">
                      <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-saffron" />
                    </div>
                    <span className="text-[10px] text-zinc-500">Express Circuit</span>
                  </div>

                  <div className="text-right">
                    <p className="font-display text-lg font-extrabold">{train.arrivalTime}</p>
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{train.toStation}</p>
                    <span className="text-[10px] font-mono text-zinc-400">({train.toStationCode})</span>
                  </div>
                </div>

                {/* Class Availability Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {train.classes.map((cls) => (
                    <div
                      key={cls.className}
                      className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-navy-dark/40 flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold">{cls.className}</span>
                        <span className="font-display text-sm font-extrabold text-saffron">₹{cls.fare}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span
                          className={
                            cls.availabilityStatus === "AVAILABLE"
                              ? "text-emerald-600 dark:text-emerald-400 font-bold"
                              : "text-amber-500 font-bold"
                          }
                        >
                          {cls.availabilityStatus === "AVAILABLE"
                            ? `AVL ${cls.seatsAvailable}`
                            : `${cls.availabilityStatus}-${cls.seatsAvailable}`}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedTrain({ train, selectedClass: cls })}
                          className="text-saffron font-bold hover:underline cursor-pointer"
                        >
                          Book →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedTrain && (
        <BookingCheckoutModal
          isOpen={!!selectedTrain}
          onClose={() => setSelectedTrain(null)}
          bookingType="train"
          itemTitle={`${selectedTrain.train.trainName} (#${selectedTrain.train.trainNumber})`}
          itemSubtitle={`${selectedTrain.train.fromStation} → ${selectedTrain.train.toStation}`}
          from={selectedTrain.train.fromStation}
          to={selectedTrain.train.toStation}
          travelDate={dateParam}
          selectedClass={`${selectedTrain.selectedClass.className} Class`}
          totalPrice={selectedTrain.selectedClass.fare}
          onBookingSuccess={(booking) => {
            setSelectedTrain(null);
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

export default function TrainsSearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono">Loading trains search...</div>}>
      <TrainsSearchContent />
    </Suspense>
  );
}
