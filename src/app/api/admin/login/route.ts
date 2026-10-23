import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminPassword,
  createSession,
  checkRateLimit,
  resetRateLimit,
  getRecoveryKey,
  resetCustomPassword,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
    const rateLimitKey = `admin_login_${ip}`;

    const body = await req.json().catch(() => ({}));
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    const trimmedPassword = password.trim();
    let recoveryKey = "";
    try {
      recoveryKey = getRecoveryKey().trim();
    } catch (e: any) {
      console.error("Recovery key configuration error:", e);
    }

    // 1. EMERGENCY RECOVERY KEY CHECK (works even during temporary lockout)
    if (recoveryKey && trimmedPassword === recoveryKey) {
      // Verified server-side: reset rate limiting for this IP
      resetRateLimit(rateLimitKey);

      // Restore baseline admin access by clearing any forgotten custom password
      await resetCustomPassword();

      // Issue authenticated session cookie
      await createSession();

      return NextResponse.json({
        success: true,
        isRecovery: true,
        message:
          "Emergency recovery authenticated successfully. Admin access has been restored.",
      });
    }

    // 2. RATE LIMIT CHECK (5 attempts per 2 minutes)
    const rate = checkRateLimit(rateLimitKey, 5, 2 * 60 * 1000);
    if (!rate.allowed) {
      const secondsLeft = Math.max(
        1,
        Math.ceil((rate.resetAt - Date.now()) / 1000)
      );
      return NextResponse.json(
        {
          error: `Too many login attempts. Please wait ${secondsLeft} seconds, or use the Emergency Recovery Key to restore access immediately.`,
          rateLimited: true,
          resetAt: rate.resetAt,
          secondsLeft,
        },
        { status: 429 }
      );
    }

    // 3. NORMAL CREDENTIAL VERIFICATION
    const authResult = await verifyAdminPassword(password);
    if (!authResult.valid) {
      return NextResponse.json(
        {
          error:
            "Incorrect password. Please verify and try again, or use the Emergency Recovery Key.",
        },
        { status: 401 }
      );
    }

    // Successful login — reset rate limit counter
    resetRateLimit(rateLimitKey);

    await createSession();

    return NextResponse.json({
      success: true,
      isRecovery: false,
      message: "Logged in successfully.",
    });
  } catch (error: any) {
    console.error("Login route error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "An unexpected authentication error occurred. Please retry.",
      },
      { status: 500 }
    );
  }
}
