import { NextResponse } from "next/server";
import { destinationsData } from "@/data/destinations";

export async function GET() {
  try {
    const popular = destinationsData.slice(0, 5).map((d) => ({
      slug: d.slug,
      name: d.name,
      state: d.state,
      views: Math.floor(Math.random() * 5000) + 1200,
    }));

    return NextResponse.json({ popular });
  } catch (error) {
    return NextResponse.json({ error: "Could not fetch popular views." }, { status: 500 });
  }
}

