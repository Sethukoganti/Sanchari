import { NextResponse } from "next/server";
import { searchTrains, bookingTrainsData } from "@/data/booking";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";

    const results = searchTrains(from, to);
    return NextResponse.json({
      success: true,
      count: results.length,
      trains: results.length > 0 ? results : bookingTrainsData,
    });
  } catch (error) {
    console.error("Trains search error:", error);
    return NextResponse.json({ error: "Failed to search trains" }, { status: 500 });
  }
}
