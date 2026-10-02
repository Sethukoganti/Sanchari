import { NextResponse } from "next/server";
import { db } from "@/db";
import { transportBookings, hotelBookings } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      bookingType,
      title,
      subtitle,
      from,
      to,
      travelDate,
      passengers,
      selectedClass,
      selectedSeats,
      totalPrice,
      contactEmail,
      contactPhone,
      hotelDetails,
    } = body;

    const bookingRef = `SB-${(bookingType || "EXP").toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    if (db) {
      if (bookingType === "stay") {
        await db.insert(hotelBookings).values({
          bookingReference: bookingRef,
          hotelName: title,
          roomType: subtitle || "Deluxe Suite",
          checkIn: travelDate || "2026-09-15",
          checkOut: hotelDetails?.checkOut || "2026-09-17",
          nightsCount: hotelDetails?.nights || 2,
          guestsCount: passengers?.length || 2,
          totalPrice: Number(totalPrice || 5000),
          status: "CONFIRMED",
          contactEmail: contactEmail || "explorer@sancharibharat.in",
        });
      } else {
        await db.insert(transportBookings).values({
          bookingReference: bookingRef,
          type: bookingType || "flight",
          title: title || "Travel Service",
          subtitle: subtitle || "",
          fromCity: from || "Origin",
          toCity: to || "Destination",
          travelDate: travelDate || "2026-09-15",
          passengers: passengers || [],
          selectedClass: selectedClass || "Standard",
          selectedSeats: selectedSeats || [],
          totalPrice: Number(totalPrice || 2500),
          status: "CONFIRMED",
          contactEmail: contactEmail || "explorer@sancharibharat.in",
          contactPhone: contactPhone || "+91 98765 43210",
        });
      }
    }

    return NextResponse.json({
      success: true,
      bookingReference: bookingRef,
      status: "CONFIRMED",
      message: "Booking confirmed successfully (Simulation)",
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
