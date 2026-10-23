import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, createSession, checkRateLimit, resetRateLimit } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
    const rateLimitKey = `admin_login_${ip}`;
    
    // Check rate limit: 5 attempts per 5 minutes
    const rate = checkRateLimit(rateLimitKey, 5, 5 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Please wait 5 minutes, or use the documented emergency recovery key.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const authResult = await verifyAdminPassword(password);

    if (!authResult.valid) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your password or use the recovery key." },
        { status: 401 }
      );
    }

    // Reset rate limit on success
    resetRateLimit(rateLimitKey);

    // Create secure HttpOnly session cookie
    await createSession();

    return NextResponse.json({
      success: true,
      isRecovery: authResult.isRecovery,
      message: authResult.isRecovery
        ? "Emergency recovery authenticated successfully."
        : "Logged in successfully.",
    });
  } catch (error: any) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication. Please retry." },
      { status: 500 }
    );
  }
}
