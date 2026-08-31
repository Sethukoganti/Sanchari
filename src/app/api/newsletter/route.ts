import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const source = String(body.source || "site").slice(0, 60);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    await db.insert(newsletterSubscribers).values({ email, source });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("newsletter error", error);
    return NextResponse.json(
      { error: "Could not subscribe right now. Try again shortly." },
      { status: 500 },
    );
  }
}
