import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, verifySession } from "@/lib/auth";
import { normalizeEthiopianPhone, sanitizeText } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
    const rate = checkRateLimit(`lead_submit_${ip}`, 6, 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const fullName = sanitizeText(body.fullName, 100);
    const rawPhone = body.phone;
    const rawTelegram = body.telegramUsername ? sanitizeText(body.telegramUsername, 50) : null;
    const service = sanitizeText(body.service, 150);
    const preferredDate = body.preferredDate ? sanitizeText(body.preferredDate, 30) : null;

    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
    }

    const phoneValidation = normalizeEthiopianPhone(rawPhone);
    if (!phoneValidation.isValid) {
      return NextResponse.json({ error: phoneValidation.error || "Invalid phone number." }, { status: 400 });
    }

    if (!service || service.length < 2) {
      return NextResponse.json({ error: "Please select or describe the service you are inquiring about." }, { status: 400 });
    }

    const cleanTelegram = rawTelegram ? rawTelegram.replace(/^@/, "").trim() : null;

    return NextResponse.json({
      success: true,
      message: "Inquiry validated successfully.",
      validatedData: {
        fullName,
        phone: phoneValidation.normalized,
        telegramUsername: cleanTelegram,
        service,
        preferredDate,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Lead validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate inquiry. Please try calling the clinic directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    message: "Inquiries are stored in browser local storage for showcase demonstration.",
    storageType: "localStorage",
    maxLimit: 10,
  });
}
