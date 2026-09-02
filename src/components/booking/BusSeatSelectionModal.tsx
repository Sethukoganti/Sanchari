"use client";

import { useState } from "react";
import { X, Check, ShieldCheck, Bus, ArrowRight } from "lucide-react";
import type { BusOption, BusSeat } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BusSeatSelectionModalProps {
  bus: BusOption;
  isOpen: boolean;
  onClose: () => void;
  onProceedToPassengerDetails: (selectedSeats: string[], totalFare: number) => void;
}

export function BusSeatSelectionModal({
  bus,
  isOpen,
  onClose,
  onProceedToPassengerDetails,
}: BusSeatSelectionModalProps) {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleSeat = (seat: BusSeat) => {
    if (!seat.isAvailable) return;
    if (selectedSeatIds.includes(seat.number)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.number));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seat.number]);
    }
  };

  const allSeats = bus.seatLayout || bus.seats || [];
  const totalFare = selectedSeatIds.reduce((sum, seatNum) => {
    const seat = allSeats.find((s) => s.number === seatNum);
    return sum + (seat?.price || bus.basePrice);
  }, 0);

  const lowerSeats = allSeats.filter((s) => s.deck === "lower" || !s.deck);
  const upperSeats = allSeats.filter((s) => s.deck === "upper");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-navy-surface border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-900 dark:text-warm-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-saffron/15 text-saffron flex items-center justify-center">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{bus.operator}</h2>
              <p className="text-xs text-zinc-500 font-mono">
                {bus.busType} · {bus.fromCity} → {bus.toCity}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono border-b border-black/5 dark:border-white/5 pb-3">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-md border border-black/20 dark:border-white/20 bg-black/5 dark:bg-navy-dark" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-md bg-saffron text-white flex items-center justify-center text-[10px]">
              ✓
            </div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-md bg-pink-500/20 border border-pink-500/40" />
            <span>Ladies Only</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-md bg-zinc-300 dark:bg-zinc-700 opacity-60" />
            <span>Booked</span>
          </div>
        </div>

        {/* Seat Layout View */}
        <div className="space-y-6 max-h-[320px] overflow-y-auto pr-2">
          {/* Lower Deck */}
          <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-navy-dark/60 border border-black/10 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-saffron">
              <span>Lower Deck</span>
              <span className="text-[10px] text-zinc-400">Front ↤ Steering</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {lowerSeats.map((seat) => {
                const isSelected = selectedSeatIds.includes(seat.number);
                return (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={!seat.isAvailable}
                    onClick={() => toggleSeat(seat)}
                    className={cn(
                      "p-2.5 rounded-xl border text-center transition font-mono text-xs font-bold cursor-pointer flex flex-col items-center justify-center gap-1",
                      !seat.isAvailable
                        ? "bg-zinc-200 dark:bg-zinc-800 border-transparent opacity-40 cursor-not-allowed"
                        : isSelected
                        ? "bg-saffron text-white border-saffron shadow-md"
                        : seat.isLadiesOnly
                        ? "bg-pink-500/10 border-pink-500/30 text-pink-600 dark:text-pink-400 hover:border-pink-500"
                        : "bg-white dark:bg-navy-surface border-black/10 dark:border-white/10 hover:border-saffron"
                    )}
                  >
                    <span>{seat.number}</span>
                    <span className="text-[9px] font-normal">₹{seat.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upper Deck if available */}
          {upperSeats.length > 0 && (
            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-navy-dark/60 border border-black/10 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-ai-violet">
                <span>Upper Sleeper Deck</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {upperSeats.map((seat) => {
                  const isSelected = selectedSeatIds.includes(seat.number);
                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={!seat.isAvailable}
                      onClick={() => toggleSeat(seat)}
                      className={cn(
                        "p-3 rounded-xl border text-center transition font-mono text-xs font-bold cursor-pointer flex flex-col items-center justify-center gap-1",
                        !seat.isAvailable
                          ? "bg-zinc-200 dark:bg-zinc-800 border-transparent opacity-40 cursor-not-allowed"
                          : isSelected
                          ? "bg-ai-violet text-white border-ai-violet shadow-md"
                          : "bg-white dark:bg-navy-surface border-black/10 dark:border-white/10 hover:border-ai-violet"
                      )}
                    >
                      <span>{seat.number}</span>
                      <span className="text-[9px] font-normal">₹{seat.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer & Continue CTA */}
        <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400 block">
              Selected Seats: {selectedSeatIds.length > 0 ? selectedSeatIds.join(", ") : "None"}
            </span>
            <p className="font-display text-xl font-extrabold text-saffron">
              Total: ₹{totalFare.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            type="button"
            disabled={selectedSeatIds.length === 0}
            onClick={() => onProceedToPassengerDetails(selectedSeatIds, totalFare)}
            className="btn-primary !py-2.5 !px-6 text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Continue ({selectedSeatIds.length})</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
