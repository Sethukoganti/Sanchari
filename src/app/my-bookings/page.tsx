"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plane, Train, Bus, Hotel, Calendar, Download, Trash2, QrCode, ArrowRight, Sparkles, Plus } from "lucide-react";
import type { UserBooking } from "@/lib/types";
import { TicketViewModal } from "@/components/booking/TicketViewModal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { cn } from "@/lib/utils";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [viewingBooking, setViewingBooking] = useState<UserBooking | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("sanchari_user_bookings") || "[]");
      if (stored && stored.length > 0) {
        setBookings(stored);
      } else {
        const sample: UserBooking = {
          id: "SB-TRAIN-892103",
          bookingType: "train",
          status: "CONFIRMED",
          referenceNumber: "SB-TRAIN-892103",
          title: "Vande Bharat Express (Train #20833)",
          subtitle: "Secunderabad (SC) → Visakhapatnam (VSKP)",
          from: "Secunderabad",
          to: "Visakhapatnam",
          date: "2026-09-18",
          time: "05:45 AM",
          passengersCount: 2,
          passengers: [
            { fullName: "Yasaswi Kodimela", age: 24, gender: "Male" },
            { fullName: "Aditi Sharma", age: 23, gender: "Female" },
          ],
          selectedClass: "Executive Chair Car (EC)",
          totalPrice: 6240,
          qrCodeData: "https://sancharibharat.in/ticket/SB-TRAIN-892103",
          createdAt: new Date().toISOString(),
          contactEmail: "explorer@sancharibharat.in",
          contactPhone: "+91 98765 43210",
        };
        setBookings([sample]);
        localStorage.setItem("sanchari_user_bookings", JSON.stringify([sample]));
      }
    } catch (e) {}
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "CANCELLED" as const } : b
      );
      setBookings(updated);
      try {
        localStorage.setItem("sanchari_user_bookings", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "upcoming") return b.status === "CONFIRMED";
    if (activeTab === "completed") return b.status === "COMPLETED";
    return b.status === "CANCELLED";
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5 text-saffron" />;
      case "train":
        return <Train className="h-5 w-5 text-emerald-500" />;
      case "bus":
        return <Bus className="h-5 w-5 text-ai-violet" />;
      default:
        return <Hotel className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      <PageHero
        eyebrow="Personal Travel Dashboard"
        title="My Travel & Stay Bookings"
        description="View digital tickets, download boarding passes, manage reservations, and sync your bookings directly into your AI trip itineraries."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "My Bookings" }]} />
      </div>

      <div className="container-site section-pad mt-8 space-y-8">
        {/* Tabs */}
        <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
              activeTab === "upcoming"
                ? "bg-saffron text-white shadow-md shadow-saffron/25"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            Upcoming ({bookings.filter((b) => b.status === "CONFIRMED").length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
              activeTab === "completed"
                ? "bg-saffron text-white shadow-md shadow-saffron/25"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            Completed ({bookings.filter((b) => b.status === "COMPLETED").length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cancelled")}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
              activeTab === "cancelled"
                ? "bg-saffron text-white shadow-md shadow-saffron/25"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            Cancelled ({bookings.filter((b) => b.status === "CANCELLED").length})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="card-surface p-12 text-center rounded-3xl space-y-4">
            <Calendar className="h-12 w-12 text-zinc-400 mx-auto" />
            <h3 className="font-display text-xl font-bold">No {activeTab} bookings</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Ready for your next Indian adventure? Search flights, trains, buses, and stays now.
            </p>
            <Link href="/book" className="btn-primary inline-flex !py-2.5 !px-6 text-xs font-bold">
              Explore Booking Options
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-black/5 dark:bg-navy-dark flex items-center justify-center">
                        {getIcon(booking.bookingType)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                          {booking.bookingType.toUpperCase()}
                        </span>
                        <span className="font-mono text-xs font-bold text-saffron">
                          {booking.referenceNumber}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider",
                        booking.status === "CONFIRMED"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/10 text-red-500 border border-red-500/30"
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h3 className="font-display text-lg font-bold">{booking.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{booking.subtitle}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 text-zinc-600 dark:text-zinc-300">
                      <div>
                        <span className="text-zinc-400 text-[10px] block uppercase">Travel Date</span>
                        <span className="font-bold">{booking.date}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[10px] block uppercase">Total Fare</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          ₹{booking.totalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-4 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingBooking(booking)}
                    className="btn-primary !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    <span>View Digital Ticket</span>
                  </button>

                  {booking.status === "CONFIRMED" && (
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(booking.id)}
                      className="text-xs font-semibold text-red-500 hover:underline p-2 cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      {viewingBooking && (
        <TicketViewModal
          isOpen={!!viewingBooking}
          booking={viewingBooking}
          onClose={() => setViewingBooking(null)}
        />
      )}
    </div>
  );
}
