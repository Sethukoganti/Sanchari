import { NextResponse } from "next/server";
import { searchFoodPlaces, foodPlacesData } from "@/data/food";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || searchParams.get("destination") || "";
    const diet = searchParams.get("diet") || "All";

    const results = searchFoodPlaces(query, diet);
    return NextResponse.json({
      success: true,
      count: results.length,
      foodPlaces: results.length > 0 ? results : foodPlacesData,
    });
  } catch (error) {
    console.error("Food search error:", error);
    return NextResponse.json({ error: "Failed to search food places" }, { status: 500 });
  }
}
