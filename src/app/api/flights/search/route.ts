import { NextResponse } from "next/server";
import { searchFlights, flightsData } from "@/data/booking";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";

    const results = searchFlights(from, to);
    return NextResponse.json({
      success: true,
      count: results.length,
      flights: results.length > 0 ? results : flightsData,
    });
  } catch (error) {
    console.error("Flights search error:", error);
    return NextResponse.json({ error: "Failed to search flights" }, { status: 500 });
  }
}
