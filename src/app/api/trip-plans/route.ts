import { NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      destinationSlugs,
      destinations,
      destination,
      days,
      travelers,
      budgetCategory,
      budget,
      notes,
    } = body;

    const destName = destination || (Array.isArray(destinations) ? destinations[0] : destinations) || "Hyderabad";
    const budgetStyle = budget || budgetCategory || "Moderate";

    if (db) {
      const inserted = await db
        .insert(trips)
        .values({
          title: `Trip to ${destName}`,
          destination: destName,
          durationDays: Number(days || 5),
          travellersCount: Number(travelers || 2),
          budgetTier: budgetStyle,
          summary: notes || "",
          itineraryData: [],
          budgetBreakdown: {},
        })
        .returning();

      return NextResponse.json({ success: true, plan: inserted[0] });
    }

    return NextResponse.json({
      success: true,
      plan: {
        id: Date.now(),
        destination: destName,
        budget: budgetStyle,
        travelers: Number(travelers || 2),
      },
    });
  } catch (error) {
    console.error("Error saving trip plan:", error);
    return NextResponse.json(
      { error: "Could not save trip plan. Please try again." },
      { status: 500 }
    );
  }
}
