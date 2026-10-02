import { NextResponse } from "next/server";
import { searchHotels, staysData } from "@/data/booking";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get("destination") || "";

    const results = searchHotels(destination);
    return NextResponse.json({
      success: true,
      count: results.length,
      stays: results.length > 0 ? results : staysData,
    });
  } catch (error) {
    console.error("Stays search error:", error);
    return NextResponse.json({ error: "Failed to search stays" }, { status: 500 });
  }
}
