"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Hotel, Filter, Star, MapPin, Check, ArrowRight, Sparkles, Shield, Utensils } from "lucide-react";
import { staysData } from "@/data/booking";
import type { HotelProperty, UserBooking } from "@/lib/types";
import { BookingCheckoutModal } from "@/components/booking/BookingCheckoutModal";
import { TicketViewModal } from "@/components/booking/TicketViewModal";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

function StaysSearchContent() {
  const searchParams = useSearchParams();
  const destParam = searchParams.get("destination") || "Hyderabad";
  const checkInParam = searchParams.get("checkIn") || "2026-09-15";
  const guestsParam = Number(searchParams.get("guests") || 2);

  // Filter State
  const [maxPrice, setMaxPrice] = useState(40000);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("All");
  const [freeBreakfastOnly, setFreeBreakfastOnly] = useState(false);
  const [freeCancellationOnly, setFreeCancellationOnly] = useState(false);

  // Booking Modal State
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<{ hotel: HotelProperty; room: any } | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<UserBooking | null>(null);

  const filteredStays = useMemo(() => {
    return staysData
      .filter((s) => s.pricePerNight <= maxPrice)
      .filter((s) => (selectedPropertyType === "All" ? true : s.propertyType === selectedPropertyType))
      .filter((s) => (!freeBreakfastOnly ? true : s.breakfastIncluded))
      .filter((s) => (!freeCancellationOnly ? true : s.freeCancellation));
  }, [maxPrice, selectedPropertyType, freeBreakfastOnly, freeCancellationOnly]);

  return (
    <div className="min-h-screen pb-24 text-[#0B132B] dark:text-[#F8FAFC]">
      {/* Top Banner */}
      <div className="bg-navy-dark text-white py-10 border-b border-white/10">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Book Travel", href: "/book" },
              { label: "Stays & Hotels" },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-saffron tracking-widest font-bold block mb-1">
                Curated Indian Stays & Heritage Hotels
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                Stays in & near {destParam}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Check-in: <span className="text-warm-white font-semibold">{checkInParam}</span> · {guestsParam} Guests · {filteredStays.length} Verified Properties
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
                    setMaxPrice(40000);
                    setSelectedPropertyType("All");
                    setFreeBreakfastOnly(false);
                    setFreeCancellationOnly(false);
                  }}
                  className="text-[11px] font-mono text-saffron hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold">Max Price / Night</span>
                  <span className="font-bold text-saffron font-mono">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={40000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-saffron"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold mb-2">Property Type</label>
                <div className="space-y-1.5 text-xs">
                  {["All", "Heritage Palace", "Luxury Resort", "Eco Homestay", "Boutique Hotel"].map((pt) => (
                    <label key={pt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="propertyType"
                        checked={selectedPropertyType === pt}
                        onChange={() => setSelectedPropertyType(pt)}
                        className="text-saffron focus:ring-saffron"
                      />
                      <span>{pt === "All" ? "All Types" : pt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <label className="block text-xs font-bold mb-2">Inclusions</label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={freeBreakfastOnly}
                      onChange={(e) => setFreeBreakfastOnly(e.target.checked)}
                      className="rounded text-saffron focus:ring-saffron"
                    />
                    <span>Free Breakfast Included</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={freeCancellationOnly}
                      onChange={(e) => setFreeCancellationOnly(e.target.checked)}
                      className="rounded text-saffron focus:ring-saffron"
                    />
                    <span>Free Cancellation Available</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Stays Cards */}
          <main className="lg:col-span-9 space-y-6">
            {filteredStays.map((hotel) => (
              <div
                key={hotel.id}
                className="card-surface overflow-hidden rounded-3xl bg-white/95 dark:bg-navy-surface/85 border border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-12 hover:border-saffron/40 transition-all"
              >
                {/* Image */}
                <div className="md:col-span-5 relative aspect-[16/11] md:aspect-auto">
                  <Image
                    src={hotel.featuredImage}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {hotel.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-saffron border border-saffron/30 text-[10px] font-mono font-bold uppercase backdrop-blur-md">
                      {hotel.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-saffron font-bold uppercase">
                        {hotel.propertyType} · {hotel.destinationName}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500 font-mono">
                        <Star className="h-3.5 w-3.5 fill-white" />
                        {hotel.rating} ({hotel.reviewsCount})
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold mt-1">
                      <Link href={`/stays/${hotel.slug}`} className="hover:text-white transition-colors">
                        {hotel.name}
                      </Link>
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{hotel.distanceFromCenter}</span>
                    </p>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-2 font-body leading-relaxed">
                      {hotel.description}
                    </p>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {hotel.amenities.slice(0, 3).map((am) => (
                        <span
                          key={am}
                          className="px-2.5 py-0.5 rounded-lg bg-black/5 dark:bg-navy-dark text-[10px] font-mono text-zinc-600 dark:text-zinc-400"
                        >
                          ✓ {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Book Row */}
                  <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-zinc-400">Starting from</p>
                      <p className="font-display text-2xl font-extrabold text-saffron">
                        ₹{hotel.pricePerNight.toLocaleString("en-IN")}
                        <span className="text-xs font-normal text-zinc-500"> / night</span>
                      </p>
                      {hotel.breakfastIncluded && (
                        <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          Free Breakfast Included
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/stays/${hotel.slug}`}
                        className="btn-secondary !py-2 !px-4 text-xs font-bold"
                      >
                        Details
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedHotelForBooking({
                            hotel,
                            room: hotel.rooms[0],
                          })
                        }
                        className="btn-primary !py-2 !px-4 text-xs font-bold cursor-pointer"
                      >
                        <span>Reserve Room</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedHotelForBooking && (
        <BookingCheckoutModal
          isOpen={!!selectedHotelForBooking}
          onClose={() => setSelectedHotelForBooking(null)}
          bookingType="stay"
          itemTitle={selectedHotelForBooking.hotel.name}
          itemSubtitle={selectedHotelForBooking.room.name}
          from={selectedHotelForBooking.hotel.location}
          to={selectedHotelForBooking.hotel.destinationName}
          travelDate={checkInParam}
          selectedClass={selectedHotelForBooking.room.type}
          totalPrice={selectedHotelForBooking.room.pricePerNight * 2}
          hotelDetails={{
            hotelName: selectedHotelForBooking.hotel.name,
            roomType: selectedHotelForBooking.room.name,
            checkIn: checkInParam,
            checkOut: "2026-09-17",
            nights: 2,
          }}
          onBookingSuccess={(booking) => {
            setSelectedHotelForBooking(null);
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

export default function StaysSearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono">Loading stays search...</div>}>
      <StaysSearchContent />
    </Suspense>
  );
}
