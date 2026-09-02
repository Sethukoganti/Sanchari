"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, User, LogOut, Bookmark, Compass, Sparkles } from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string; travelStyle?: string } | null;
  onLogout: () => void;
}

export function UserProfileModal({ isOpen, onClose, user, onLogout }: UserProfileModalProps) {
  const [savedTripsCount, setSavedTripsCount] = useState(0);

  useEffect(() => {
    try {
      const trips = JSON.parse(localStorage.getItem("sanchari_saved_trips") || "[]");
      setSavedTripsCount(trips.length);
    } catch (e) {
      setSavedTripsCount(0);
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0E172F] p-6 sm:p-8 text-warm-white shadow-2xl space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-amber-600 text-black font-display font-black text-2xl shadow-lg shadow-saffron/20">
            {user.name[0]?.toUpperCase()}
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-warm-white">{user.name}</h3>
            <p className="text-xs text-muted-gray">{user.email}</p>
            <span className="inline-block mt-1 chip !py-0.5 !px-2.5 text-[10px] text-emerald-accent border-emerald-500/30">
              Verified Explorer
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-navy-dark/60 border border-white/5 text-xs">
          <div>
            <span className="text-muted-gray block">Travel Style:</span>
            <span className="font-bold text-saffron">{user.travelStyle || "Balanced"}</span>
          </div>
          <div>
            <span className="text-muted-gray block">Saved Trips:</span>
            <span className="font-bold text-warm-white">{savedTripsCount} Trips</span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/10">
          <Link
            href="/saved-trips"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl bg-navy-dark/60 hover:bg-navy-light/60 transition text-xs font-semibold text-warm-white"
          >
            <span className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-white" />
              <span>View Saved AI Trips</span>
            </span>
            <span className="font-mono text-muted-gray">→</span>
          </Link>

          <Link
            href="/plan"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl bg-navy-dark/60 hover:bg-navy-light/60 transition text-xs font-semibold text-warm-white"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ai-violet" />
              <span>Create New AI Itinerary</span>
            </span>
            <span className="font-mono text-muted-gray">→</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:underline cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

