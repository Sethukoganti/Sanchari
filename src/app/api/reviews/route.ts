import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetSlug = searchParams.get("targetSlug") || searchParams.get("destinationSlug");

    if (db && targetSlug) {
      const results = await db
        .select()
        .from(reviews)
        .where(eq(reviews.destinationSlug, targetSlug))
        .orderBy(desc(reviews.createdAt));
      return NextResponse.json({ reviews: results });
    }

    return NextResponse.json({ reviews: [] });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Could not fetch reviews." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      destinationSlug,
      targetSlug,
      userName,
      authorName,
      userEmail,
      rating,
      title,
      content,
      comment,
    } = body;

    const slug = targetSlug || destinationSlug;
    const name = userName || authorName;
    const text = comment || content;

    if (!slug || !name || !title || !text) {
      return NextResponse.json(
        { error: "Destination, name, title, and comments are required." },
        { status: 400 }
      );
    }

    if (db) {
      const inserted = await db
        .insert(reviews)
        .values({
          destinationSlug: slug,
          userName: name,
          userEmail: userEmail || null,
          rating: Number(rating || 5),
          title,
          comment: text,
          photos: [],
          helpful: 0,
        })
        .returning();

      return NextResponse.json({ success: true, review: inserted[0] });
    }

    return NextResponse.json({
      success: true,
      review: {
        id: Date.now(),
        destinationSlug: slug,
        userName: name,
        rating: Number(rating || 5),
        title,
        comment: text,
        photos: [],
        helpful: 0,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Could not post review." }, { status: 500 });
  }
}

