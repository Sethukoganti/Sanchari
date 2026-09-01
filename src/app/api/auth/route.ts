import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, action } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = {
      id: `usr-${Date.now()}`,
      name: name || email.split("@")[0] || "Explorer",
      email,
      travelStyle: "Balanced",
    };

    return NextResponse.json({ success: true, user });
  } catch (e) {
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}

