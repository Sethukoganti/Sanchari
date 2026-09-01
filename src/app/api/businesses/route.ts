import { NextResponse } from "next/server";
import { businessesData } from "@/data/businesses";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (category && category !== "All") {
    const filtered = businessesData.filter((b) => b.category === category);
    return NextResponse.json({ success: true, data: filtered });
  }

  return NextResponse.json({ success: true, data: businessesData });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.name || !body.phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const newBiz = {
      id: `biz-${Date.now()}`,
      ...body,
      verified: false,
      rating: 5.0,
      reviewsCount: 1,
    };

    return NextResponse.json({ success: true, data: newBiz });
  } catch (e) {
    return NextResponse.json({ error: "Failed to register business." }, { status: 500 });
  }
}

