import { NextResponse } from "next/server";
import { searchBuses, busesData } from "@/data/booking";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";

    const results = searchBuses(from, to);
    return NextResponse.json({
      success: true,
      count: results.length,
      buses: results.length > 0 ? results : busesData,
    });
  } catch (error) {
    console.error("Buses search error:", error);
    return NextResponse.json({ error: "Failed to search buses" }, { status: 500 });
  }
}
