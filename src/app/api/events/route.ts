import { NextResponse } from "next/server";
import { eventsData } from "@/data/events";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");

  if (month && month !== "All") {
    const filtered = eventsData.filter((e) => e.date.month === month);
    return NextResponse.json({ success: true, data: filtered });
  }

  return NextResponse.json({ success: true, data: eventsData });
}

