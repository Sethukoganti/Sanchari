"use client";

import { useState } from "react";
import { X, CheckCircle, Download, Share2, Printer, QrCode, Plane, Train, Bus, Hotel, Calendar, MapPin, Sparkles } from "lucide-react";
import type { UserBooking } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TicketViewModalProps {
  booking: UserBooking;
  isOpen: boolean;
  onClose: () => void;
}

export function TicketViewModal({ booking, isOpen, onClose }: TicketViewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTicket = () => {
    const ticketText = `
======================================================
SANCHARI BHARAT — EXPLORE INDIA
OFFICIAL DIGITAL BOARDING PASS & CONFIRMATION
======================================================
Booking Reference: ${booking.referenceNumber}
Type:              ${booking.bookingType.toUpperCase()}
Status:            ${booking.status}
Service:           ${booking.title}
Route / Location:  ${booking.subtitle || `${booking.from} -> ${booking.to}`}
Date:              ${booking.date}
Passengers (${booking.passengersCount}):
${booking.passengers.map((p, i) => `  ${i + 1}. ${p.fullName} (${p.gender}, Age ${p.age})`).join("\n")}
Selected Class:    ${booking.selectedClass || "Standard"}
Selected Seats:    ${booking.selectedSeats?.join(", ") || "Auto-assigned"}
Total Fare:        INR ₹${booking.totalPrice.toLocaleString("en-IN")}
Contact:           ${booking.contactEmail} | ${booking.contactPhone}
Verification URL:  ${booking.qrCodeData}
======================================================
Have a safe and wonderful journey across Bharat!
`;
    const blob = new Blob([ticketText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sanchari_Ticket_${booking.referenceNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Sanchari Bharat Ticket - ${booking.referenceNumber}`,
        text: `My booking confirmation for ${booking.title} on ${booking.date}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `Sanchari Bharat Booking ${booking.referenceNumber}: ${booking.title} on ${booking.date}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getIcon = () => {
    switch (booking.bookingType) {
      case "flight":
        return <Plane className="h-6 w-6 text-saffron" />;
      case "train":
        return <Train className="h-6 w-6 text-emerald-500" />;
      case "bus":
        return <Bus className="h-6 w-6 text-ai-violet" />;
      default:
        return <Hotel className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Ticket Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-navy-surface border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-900 dark:text-warm-white">
        {/* Top Success Banner */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="h-5 w-5" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Booking Confirmed
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Boarding Pass Card */}
        <div className="rounded-3xl border-2 border-dashed border-saffron/40 p-6 bg-saffron/5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white dark:bg-navy-dark shadow-md flex items-center justify-center">
                {getIcon()}
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block font-semibold">
                  SANCHARI BHARAT E-TICKET
                </span>
                <h3 className="font-display font-bold text-base">{booking.title}</h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">PNR / Ref</span>
              <span className="font-mono text-xs font-bold text-saffron">
                {booking.referenceNumber}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-saffron/20">
            <div>
              <span className="text-zinc-400 text-[10px] block uppercase">Journey Date</span>
              <span className="font-bold">{booking.date}</span>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] block uppercase">Class / Seat</span>
              <span className="font-bold">
                {booking.selectedClass || "Standard"}{" "}
                {booking.selectedSeats?.length ? `(${booking.selectedSeats.join(", ")})` : ""}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] block uppercase">Passengers</span>
              <span className="font-bold">{booking.passengersCount} Person(s)</span>
            </div>
            <div>
              <span className="text-zinc-400 text-[10px] block uppercase">Total Fare Paid</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                ₹{booking.totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* QR Code Mock */}
          <div className="pt-4 border-t border-saffron/20 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                Digital Verification
              </span>
              <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                Scan at gate / hotel front desk
              </p>
            </div>

            <div className="p-2 rounded-xl bg-white text-black shadow-sm">
              <QrCode className="h-10 w-10" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={handleDownloadTicket}
            className="btn-secondary !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="btn-secondary !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="btn-primary !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
