import { NextRequest, NextResponse } from "next/server";
import { createLead, getLeads } from "@/lib/db";
import { verifySession, checkRateLimit } from "@/lib/auth";
import { normalizeEthiopianPhone, sanitizeText } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
    const rate = checkRateLimit(`lead_submit_${ip}`, 5, 60 * 1000);
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

    // Clean telegram username if supplied (strip leading @)
    const cleanTelegram = rawTelegram ? rawTelegram.replace(/^@/, "").trim() : null;

    const lead = await createLead({
      fullName,
      phone: phoneValidation.normalized,
      telegramUsername: cleanTelegram,
      service,
      preferredDate,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully.",
      lead: {
        id: lead.id,
        fullName: lead.fullName,
        service: lead.service,
        createdAt: lead.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "We were unable to save your inquiry. Please try calling the clinic directly." },
      { status: 500 }
    );
  }
}

// Protected: Only authenticated admins can fetch leads list
export async function GET() {
  const isAuth = await verifySession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Failed to retrieve leads." }, { status: 500 });
  }
}
