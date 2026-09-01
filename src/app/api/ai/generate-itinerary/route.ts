import { NextResponse } from "next/server";
import { generateAITripPlan, type AIPlanInput } from "@/lib/ai-trip-engine";

export async function POST(req: Request) {
  try {
    const body: AIPlanInput = await req.json();

    if (!body || !body.destination) {
      return NextResponse.json(
        { error: "Destination is required for AI trip generation." },
        { status: 400 }
      );
    }

    const itinerary = generateAITripPlan(body);

    return NextResponse.json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    console.error("AI Generation Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI trip plan." },
      { status: 500 }
    );
  }
}

