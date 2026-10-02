"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Hotel,
  Star,
  MapPin,
  Check,
  ShieldCheck,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Wifi,
  Coffee,
  Car,
  Utensils,
  Plus,
} from "lucide-react";
import { staysData, getHotelById } from "@/data/booking";
import type { HotelProperty, HotelRoom, UserBooking } from "@/lib/types";
import { BookingCheckoutModal } from "@/components/booking/BookingCheckoutModal";
import { TicketViewModal } from "@/components/booking/TicketViewModal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const hotel = getHotelById(id) || staysData[0];

  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<UserBooking | null>(null);
  const [checkIn, setCheckIn] = useState("2026-09-15");
  const [nights, setNights] = useState(2);

  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <div className="bg-navy-dark text-white pt-24 pb-8 border-b border-white/10">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Book Travel", href: "/book" },
              { label: "Stays", href: "/book/stays" },
              { label: hotel.name },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-saffron font-bold tracking-widest block mb-1">
                {hotel.propertyType} · {hotel.destinationName}
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                {hotel.name}
              </h1>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-mono">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <span>{hotel.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30 font-mono text-sm font-bold flex items-center gap-1">
                <Star className="h-4 w-4 fill-white" />
                {hotel.rating} ({hotel.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-site section-pad mt-8 space-y-10">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden aspect-[16/8] max-h-[480px]">
          <div className="md:col-span-2 relative h-full">
            <Image
              src={hotel.featuredImage}
              alt={hotel.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-rows-2 gap-4 h-full">
            {hotel.gallery.slice(1, 3).map((img, i) => (
              <div key={i} className="relative h-full">
                <Image src={img} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
            ))}
          </div>
        </div>

        {/* Overview & Room Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Description & Rooms */}
          <div className="lg:col-span-8 space-y-8">
            <div className="card-surface p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-4">
              <h2 className="font-display text-2xl font-bold">About This Property</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-body">
                {hotel.description}
              </p>

              {/* Amenities */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10">
                <h3 className="font-display text-base font-bold text-saffron mb-3">
                  Highlights & Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-300">
                  {hotel.amenities.map((am) => (
                    <div key={am} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Rooms List */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Available Room Types</h2>

              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                >
                  <div className="sm:col-span-4 relative aspect-[16/11] rounded-2xl overflow-hidden">
                    <Image src={room.image} alt={room.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>

                  <div className="sm:col-span-8 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-saffron font-bold">
                        {room.type} · {room.sizeSqFt} sq.ft
                      </span>
                      <h3 className="font-display text-lg font-bold">{room.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        Bed: {room.bedType} · Max Guests: {room.maxGuests}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2 text-[11px] font-mono text-zinc-600 dark:text-zinc-300">
                        {room.amenities.map((am) => (
                          <span key={am} className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-navy-dark">
                            ✓ {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-3">
                      <div>
                        <p className="font-display text-xl font-extrabold text-saffron">
                          ₹{room.pricePerNight.toLocaleString("en-IN")}
                          <span className="text-xs font-normal text-zinc-500"> / night</span>
                        </p>
                        {room.breakfastIncluded && (
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            Free Breakfast Included
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedRoom(room)}
                        className="btn-primary !py-2 !px-5 text-xs font-bold cursor-pointer"
                      >
                        Reserve Room
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Quick Reservation Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card-surface p-6 rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 space-y-4 sticky top-24">
              <h3 className="font-display text-lg font-bold">Your Stay Summary</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-dark p-2.5 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    Duration (Nights)
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-navy-dark p-2.5 font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 7, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} Night{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Price ({nights} nights):</span>
                  <span>₹{(hotel.pricePerNight * nights).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Taxes & GST (Included):</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-saffron pt-2 border-t border-black/5 dark:border-white/5">
                  <span>Total:</span>
                  <span>₹{(hotel.pricePerNight * nights).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRoom(hotel.rooms[0])}
                className="btn-primary w-full justify-center !py-3 text-xs font-bold"
              >
                Instant Reservation
              </button>

              <Link
                href={`/plan?destination=${encodeURIComponent(hotel.destinationName)}`}
                className="btn-secondary w-full justify-center !py-2.5 text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add to AI Trip Plan</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedRoom && (
        <BookingCheckoutModal
          isOpen={!!selectedRoom}
          onClose={() => setSelectedRoom(null)}
          bookingType="stay"
          itemTitle={hotel.name}
          itemSubtitle={selectedRoom.name}
          from={hotel.location}
          to={hotel.destinationName}
          travelDate={checkIn}
          selectedClass={selectedRoom.type}
          totalPrice={selectedRoom.pricePerNight * nights}
          hotelDetails={{
            hotelName: hotel.name,
            roomType: selectedRoom.name,
            checkIn: checkIn,
            checkOut: "2026-09-17",
            nights: nights,
          }}
          onBookingSuccess={(booking) => {
            setSelectedRoom(null);
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
