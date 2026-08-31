import { NextResponse } from "next/server";
import { db } from "@/db";
import { savedItineraries } from "@/db/schema";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const email = body.email ? String(body.email).trim().toLowerCase() : null;
    const tripLength = String(body.tripLength || "").slice(0, 40);
    const interests = Array.isArray(body.interests)
      ? body.interests.map(String)
      : [];
    const budget = String(body.budget || "").slice(0, 40);
    const region = String(body.region || "").slice(0, 40);
    const title = String(body.title || "Explore India itinerary").slice(0, 200);
    const days = Array.isArray(body.days) ? body.days : [];

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }
    if (!tripLength || !budget || !region || !days.length) {
      return NextResponse.json(
        { error: "Incomplete itinerary payload." },
        { status: 400 },
      );
    }

    const [row] = await db
      .insert(savedItineraries)
      .values({
        email,
        tripLength,
        interests,
        budget,
        region,
        title,
        days,
      })
      .returning({ id: savedItineraries.id });

    return NextResponse.json({ ok: true, id: row.id });
  } catch (error) {
    console.error("itinerary error", error);
    return NextResponse.json(
      { error: "Could not save itinerary right now." },
      { status: 500 },
    );
  }
}
