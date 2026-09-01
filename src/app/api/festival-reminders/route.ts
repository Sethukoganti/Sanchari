import { NextResponse } from "next/server";
import { db } from "@/db";
import { festivalReminders } from "@/db/schema";
import { isValidEmail } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { festivalSlug, festivalName, email } = body;

    if (!festivalSlug || !email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Valid email and festival slug are required." },
        { status: 400 }
      );
    }

    if (db) {
      await db.insert(festivalReminders).values({
        festivalSlug,
        email,
        remindBefore: "1_week",
      });
    }

    return NextResponse.json({
      success: true,
      message: `Reminder set! We will alert you 1 week before ${festivalName || festivalSlug}.`,
    });
  } catch (error) {
    console.error("Error setting festival reminder:", error);
    return NextResponse.json(
      { error: "Could not save festival reminder. Please try again." },
      { status: 500 }
    );
  }
}

