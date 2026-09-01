import { NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ success: true, data: [] });
    }
    const allTrips = await db.select().from(trips).orderBy(desc(trips.createdAt)).limit(50);
    return NextResponse.json({ success: true, data: allTrips });
  } catch (e) {
    console.error("GET /api/trips error:", e);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.destination || !body.title) {
      return NextResponse.json(
        { error: "Destination and title are required." },
        { status: 400 }
      );
    }

    if (db) {
      const inserted = await db.insert(trips).values({
        title: body.title,
        destination: body.destination,
        durationDays: body.durationDays || 5,
        travellersCount: body.travellersCount || 2,
        budgetTier: body.budgetTier || "Moderate",
        travelStyle: body.travelStyle || "Balanced",
        summary: body.summary || "",
        itineraryData: body.days || [],
        budgetBreakdown: body.budgetBreakdown || {},
        coverImage: body.coverImage || "",
      }).returning();

      return NextResponse.json({ success: true, data: inserted[0] });
    }

    return NextResponse.json({ success: true, data: body });
  } catch (e) {
    console.error("POST /api/trips error:", e);
    return NextResponse.json({ error: "Failed to save trip." }, { status: 500 });
  }
}

