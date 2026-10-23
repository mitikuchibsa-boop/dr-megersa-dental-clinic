import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminPasswordHash } from "@/lib/db";
import { createSession, checkRateLimit } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
    // Maximum 5 login attempts per 5 minutes per IP
    const rate = checkRateLimit(`admin_login_${ip}`, 5, 5 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 5 minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const storedHash = await getAdminPasswordHash();
    const isMatch = await bcrypt.compare(password, storedHash);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    await createSession();

    return NextResponse.json({ success: true, message: "Logged in successfully." });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "An error occurred during authentication." }, { status: 500 });
  }
}
