/**
 * Phone validation & normalization utility
 * Supports Ethiopian mobile numbers (Ethio Telecom 09..., Safaricom 07..., international +251...)
 */
export function normalizeEthiopianPhone(input: string): { isValid: boolean; normalized: string; error?: string } {
  if (!input || typeof input !== "string") {
    return { isValid: false, normalized: "", error: "Phone number is required." };
  }

  // Remove spaces, hyphens, parentheses, and dots
  const cleaned = input.trim().replace(/[\s\-\(\)\.]/g, "");

  // Match formats:
  // 09XXXXXXXX or 07XXXXXXXX (10 digits)
  // +2519XXXXXXXX or +2517XXXXXXXX (13 chars)
  // 2519XXXXXXXX or 2517XXXXXXXX (12 digits)
  // 9XXXXXXXX or 7XXXXXXXX (9 digits)

  let normalized = "";

  if (/^(?:\+251|251|0)?([79]\d{8})$/.test(cleaned)) {
    const match = cleaned.match(/^(?:\+251|251|0)?([79]\d{8})$/);
    if (match) {
      const suffix = match[1];
      normalized = `+251${suffix}`;
      return { isValid: true, normalized };
    }
  }

  // Generic fallback if user enters another valid telephone format (at least 9 digits, at most 15 digits)
  if (/^\+?\d{9,15}$/.test(cleaned)) {
    normalized = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
    return { isValid: true, normalized };
  }

  return {
    isValid: false,
    normalized: cleaned,
    error: "Please enter a valid phone number (e.g., 0921 48 90 71 or +251 92 148 9071).",
  };
}

export function sanitizeText(input: string, maxLength = 300): string {
  if (!input || typeof input !== "string") return "";
  return input.trim().replace(/[<>]/g, "").slice(0, maxLength);
}
