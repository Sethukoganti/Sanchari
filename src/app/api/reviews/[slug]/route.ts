import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { action } = await req.json();

    const reviewId = parseInt(slug, 10);

    if (action === "vote-helpful" && db && !isNaN(reviewId)) {
      await db
        .update(reviews)
        .set({ helpful: sql`${reviews.helpful} + 1` })
        .where(eq(reviews.id, reviewId));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating review vote:", error);
    return NextResponse.json({ error: "Could not update vote." }, { status: 500 });
  }
}

