import { NextResponse } from "next/server";
import { destinationsData } from "@/data/destinations";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");
  const region = searchParams.get("region");

  let results = destinationsData;

  if (filter === "hidden-gems") {
    results = results.filter((d) => d.isHiddenGem);
  }

  if (region) {
    results = results.filter((d) => d.region.toLowerCase() === region.toLowerCase());
  }

  return NextResponse.json({ success: true, data: results });
}

