import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminPasswordHash, setAdminPasswordHash } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "Please fill in all password fields." },
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

    const storedHash = await getAdminPasswordHash();
    const isMatch = await bcrypt.compare(currentPassword, storedHash);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);
    await setAdminPasswordHash(newHash);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully. Please keep your new password safe.",
    });
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Failed to update password." },
      { status: 500 }
    );
  }
}
