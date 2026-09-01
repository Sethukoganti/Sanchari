import { NextResponse } from "next/server";
import { db } from "@/db";
import { pageViews } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pathname, destinationSlug, slug, page } = body;

    const pageName = page || (pathname ? String(pathname) : "destination");
    const slugName = slug || destinationSlug || "home";

    if (db) {
      await db.insert(pageViews).values({
        page: pageName,
        slug: slugName,
        views: 1,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging page view:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

