"use client";

import { useState } from "react";
import { X, Check, ShieldCheck, CreditCard, Sparkles, User, Mail, Phone, Lock, QrCode } from "lucide-react";
import type { BookingPassenger, UserBooking } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BookingCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingType: "flight" | "train" | "bus" | "stay";
  itemTitle: string;
  itemSubtitle?: string;
  from?: string;
  to?: string;
  travelDate: string;
  selectedClass?: string;
  selectedSeats?: string[];
  totalPrice: number;
  hotelDetails?: {
    hotelName: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  onBookingSuccess: (booking: UserBooking) => void;
}

export function BookingCheckoutModal({
  isOpen,
  onClose,
  bookingType,
  itemTitle,
  itemSubtitle,
  from,
  to,
  travelDate,
  selectedClass,
  selectedSeats,
  totalPrice,
  hotelDetails,
  onBookingSuccess,
}: BookingCheckoutModalProps) {
  const [step, setStep] = useState<"passengers" | "payment" | "processing">("passengers");
  const [email, setEmail] = useState("explorer@sancharibharat.in");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("traveler@okhdfcbank");

  const [passengers, setPassengers] = useState<BookingPassenger[]>([
    { fullName: "Yasaswi Kodimela", age: 24, gender: "Male" },
  ]);

  if (!isOpen) return null;

  const addPassenger = () => {
    setPassengers([...passengers, { fullName: "", age: 25, gender: "Male" }]);
  };

  const updatePassenger = (index: number, field: keyof BookingPassenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      const bookingRef = `SB-${bookingType.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: UserBooking = {
        id: bookingRef,
        bookingType,
        status: "CONFIRMED",
        referenceNumber: bookingRef,
        title: itemTitle,
        subtitle: itemSubtitle,
        from,
        to,
        date: travelDate,
        passengersCount: passengers.length,
        passengers,
        selectedClass,
        selectedSeats,
        totalPrice,
        stayDetails: hotelDetails,
        qrCodeData: `https://sancharibharat.in/ticket/${bookingRef}`,
        createdAt: new Date().toISOString(),
        contactEmail: email,
        contactPhone: phone,
      };

      try {
        const stored = JSON.parse(localStorage.getItem("sanchari_user_bookings") || "[]");
        localStorage.setItem("sanchari_user_bookings", JSON.stringify([newBooking, ...stored]));
      } catch (e) {}

      onBookingSuccess(newBooking);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-navy-surface border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-900 dark:text-warm-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono text-saffron uppercase font-bold tracking-widest block">
              Direct Booking Checkout
            </span>
            <h2 className="font-display text-xl font-bold">{itemTitle}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Processing State */}
        {step === "processing" ? (
          <div className="py-12 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-3xl bg-saffron/20 text-saffron flex items-center justify-center animate-spin">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-bold">Securing Your Reservation...</h3>
            <p className="text-xs text-zinc-500 font-mono">
              Simulating instant payment settlement & generating IRCTC/Aviation digital boarding pass
            </p>
          </div>
        ) : step === "passengers" ? (
          /* Step 1: Passenger Details */
          <div className="space-y-4">
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {passengers.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-black/[0.02] dark:bg-navy-dark/60 border border-black/10 dark:border-white/10 space-y-3"
                >
                  <span className="text-xs font-mono font-bold text-saffron block">
                    Passenger #{idx + 1}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={p.fullName}
                      onChange={(e) => updatePassenger(idx, "fullName", e.target.value)}
                      placeholder="Full Name (as on Gov ID)"
                      className="sm:col-span-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-surface p-2 text-xs font-semibold"
                      required
                    />
                    <input
                      type="number"
                      value={p.age}
                      onChange={(e) => updatePassenger(idx, "age", Number(e.target.value))}
                      placeholder="Age"
                      className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-surface p-2 text-xs font-semibold"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addPassenger}
              className="text-xs font-mono text-saffron hover:underline cursor-pointer"
            >
              + Add Another Passenger
            </button>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for E-Ticket"
                className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-dark/60 p-2.5 text-xs font-semibold"
                required
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number (+91)"
                className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-dark/60 p-2.5 text-xs font-semibold"
                required
              />
            </div>

            {/* Step 1 Footer */}
            <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block">Total Amount:</span>
                <span className="font-display text-2xl font-extrabold text-saffron">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setStep("payment")}
                className="btn-primary !py-2.5 !px-6 text-xs font-bold cursor-pointer"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Payment Simulation */
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 font-bold block">
                Select Payment Mode:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "upi", label: "Instant UPI" },
                  { id: "card", label: "Credit/Debit" },
                  { id: "netbanking", label: "NetBanking" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition text-xs font-bold cursor-pointer",
                      paymentMethod === m.id
                        ? "bg-saffron text-white border-saffron shadow-sm"
                        : "bg-black/5 dark:bg-navy-dark border-black/10 dark:border-white/10"
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === "upi" && (
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-navy-dark/60 border border-black/10 dark:border-white/10 space-y-2">
                <label className="text-xs font-bold block">Enter VPA / UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-surface p-2.5 text-xs font-semibold"
                />
                <p className="text-[10px] text-zinc-400 font-mono">
                  Supports Google Pay, PhonePe, Paytm, BHIM & all Indian banking apps
                </p>
              </div>
            )}

            <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("passengers")}
                className="btn-secondary !py-2 !px-4 text-xs font-bold"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handlePay}
                className="btn-primary !py-2.5 !px-8 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-saffron/30"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Pay ₹{totalPrice.toLocaleString("en-IN")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
