import { emailService } from "@/lib/server/services/email.service";
import { profileService } from "@/lib/server/services/profile.service";
import { NextRequest, NextResponse } from "next/server";
import { contactRequestSchema } from "./validationSchema";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 },
    );
  }

  const validation = contactRequestSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Invalid contact request",
        issues: validation.error.issues,
      },
      { status: 400 },
    );
  }

  const { profileSlug, name, email, message } = validation.data;

  try {
    // Resolve the recipient on the server instead of trusting browser input.
    const profile = await profileService.getProfileBySlug(profileSlug);

    // Treat private and missing profiles the same to avoid exposing private data.
    if (!profile || !profile.isPublic) {
      return NextResponse.json(
        { error: "Public profile not found" },
        { status: 404 },
      );
    }

    if (!profile.email) {
      return NextResponse.json(
        { error: "This profile cannot receive contact messages" },
        { status: 422 },
      );
    }

    await emailService.sendContactEmail({
      recipientEmail: profile.email,
      visitorName: name,
      visitorEmail: email,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    // Log the internal error without exposing provider details to the visitor.
    console.error("Failed to process contact request:", error);

    return NextResponse.json(
      { error: "Unable to send the message at this time" },
      { status: 500 },
    );
  }
}