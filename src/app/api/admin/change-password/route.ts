import { NextRequest, NextResponse } from "next/server";
import { verifySession, verifyAdminPassword, setCustomPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized session. Please log in again." }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "Please complete all password fields." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const currentVerify = await verifyAdminPassword(currentPassword);
    if (!currentVerify.valid) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      );
    }

    await setCustomPassword(newPassword);

    return NextResponse.json({
      success: true,
      message: "Admin password updated successfully. Please keep your new password in a safe place.",
    });
  } catch (error: any) {
    console.error("Change password route error:", error);
    return NextResponse.json(
      { error: "Failed to update password." },
      { status: 500 }
    );
  }
}
