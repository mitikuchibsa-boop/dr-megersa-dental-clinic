import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export const SESSION_COOKIE_NAME = "megersa_admin_session";
export const CUSTOM_HASH_COOKIE = "megersa_admin_phash";

// Documented default credentials — shown on the login page help section.
// Override via Vercel env vars: ADMIN_PASSWORD and ADMIN_RECOVERY_KEY
export const DEFAULT_ADMIN_PASSWORD = "MegersaDental2026!Adama";
export const DEFAULT_RECOVERY_KEY = "MegersaRecovery2026!Adama";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "dr_megersa_dental_adama_showcase_jwt_secret_2026"
);

// In-memory runtime override for password changes during active server instance
let runtimePasswordHash: string | null = null;

// ---------------------------------------------------------------------------
// Password helpers
// ---------------------------------------------------------------------------

/**
 * Returns the expected admin password.
 * Priority: ADMIN_PASSWORD → ADMIN_INITIAL_PASSWORD (legacy) → hard-coded default.
 * ADMIN_INITIAL_PASSWORD is kept for backward compatibility with existing Vercel deployments.
 */
export function getExpectedPassword(): string {
  return (
    process.env.ADMIN_PASSWORD ||
    process.env.ADMIN_INITIAL_PASSWORD ||
    DEFAULT_ADMIN_PASSWORD
  );
}

/**
 * Returns the emergency recovery key.
 * Priority: ADMIN_RECOVERY_KEY env var → hard-coded default.
 */
export function getRecoveryKey(): string {
  return process.env.ADMIN_RECOVERY_KEY || DEFAULT_RECOVERY_KEY;
}

export async function verifyAdminPassword(
  candidatePassword: string
): Promise<{ valid: boolean; isRecovery: boolean }> {
  if (!candidatePassword || typeof candidatePassword !== "string") {
    return { valid: false, isRecovery: false };
  }

  // 1. Emergency recovery key — always accepted regardless of password state
  const recoveryKey = getRecoveryKey();
  if (candidatePassword.trim() === recoveryKey.trim()) {
    return { valid: true, isRecovery: true };
  }

  // 2. Custom password hash (set via change-password, stored in runtime + cookie)
  let activeHash: string | null = runtimePasswordHash;
  if (!activeHash) {
    try {
      const cookieStore = await cookies();
      const customHashCookie = cookieStore.get(CUSTOM_HASH_COOKIE);
      if (customHashCookie?.value) {
        activeHash = customHashCookie.value;
      }
    } catch {
      // Ignore cookie errors (e.g. during static rendering)
    }
  }

  if (activeHash) {
    // A custom password is active — the candidate must match it.
    // The original initial password is intentionally rejected once changed.
    const isMatch = await bcrypt.compare(candidatePassword, activeHash);
    return { valid: isMatch, isRecovery: false };
  }

  // 3. Configured or default admin password (plain-text comparison)
  const expectedPassword = getExpectedPassword();
  if (candidatePassword === expectedPassword) {
    return { valid: true, isRecovery: false };
  }

  return { valid: false, isRecovery: false };
}

export async function setCustomPassword(newPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  runtimePasswordHash = hash;

  // Persist hash in a secure HttpOnly cookie so it survives serverless restarts
  // on the same browser session (same origin, same cookie jar).
  const cookieStore = await cookies();
  cookieStore.set(CUSTOM_HASH_COOKIE, hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return hash;
}

export async function resetCustomPassword(): Promise<void> {
  runtimePasswordHash = null;
  const cookieStore = await cookies();
  cookieStore.set(CUSTOM_HASH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// ---------------------------------------------------------------------------
// Session helpers
// ---------------------------------------------------------------------------

export async function createSession(): Promise<string> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return false;
    const { payload } = await jwtVerify(sessionCookie.value, SECRET_KEY);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// ---------------------------------------------------------------------------
// In-memory rate limiter
// ---------------------------------------------------------------------------

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// Exported so the reset-lockout endpoint can clear specific keys
export const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    const resetAt = now + windowMs;
    rateLimitMap.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetAt: record.resetAt };
}

export function resetRateLimit(key: string): void {
  rateLimitMap.delete(key);
}

/** Clear ALL rate limit records — use only for the lockout-reset endpoint */
export function resetAllRateLimits(): void {
  rateLimitMap.clear();
}
