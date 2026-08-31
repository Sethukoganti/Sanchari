import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

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
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = body.phone ? String(body.phone).trim().slice(0, 40) : null;
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }
    if (message.length < 12) {
      return NextResponse.json(
        { error: "Message is too short." },
        { status: 400 },
      );
    }

    await db.insert(contactMessages).values({
      name: name.slice(0, 120),
      email: email.slice(0, 180),
      phone,
      subject: subject.slice(0, 120),
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact error", error);
    return NextResponse.json(
      { error: "Could not send message right now. Try again shortly." },
      { status: 500 },
    );
  }
}
