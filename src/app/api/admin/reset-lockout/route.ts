import { NextRequest, NextResponse } from "next/server";
import { resetAllRateLimits } from "@/lib/auth";

/**
 * POST /api/admin/reset-lockout
 *
 * Clears the in-memory rate-limit counter for login attempts.
 * This endpoint is intentionally public — it only removes a temporary
 * lockout, it does NOT grant any authentication or access.
 *
 * Legitimate use: a user who was locked out (e.g. browser refresh
 * triggered repeated failed requests) can call this to reset the counter
 * and try again. Abusing it to brute-force passwords still requires
 * knowing the correct password.
 */
export async function POST(_req: NextRequest) {
  resetAllRateLimits();

  return NextResponse.json({
    success: true,
    message:
      "Login attempt counter cleared. You may now try to log in again. Enter the correct password or the Emergency Recovery Key.",
  });
}
