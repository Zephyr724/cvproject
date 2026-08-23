import { requireAuth } from "@/lib/server/auth-guard";
import { BusinessError } from "@/lib/server/errors";
import { profileService } from "@/lib/server/services/profile.service";
import { NextRequest, NextResponse } from "next/server";
import { validateUpdateProfileSchema } from "./validationSchema";

export async function GET() {
  const session = await requireAuth();
  const userId = session.user.id;
  const profile = await profileService.getProfileByUserId(userId);
  return NextResponse.json(profile);
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAuth();
    const body = await req.json();

    const validateReq = validateUpdateProfileSchema.safeParse(body);
    if (!validateReq.success) {
      return NextResponse.json(
        { error: validateReq.error.issues },
        { status: 400 },
      );
    }

    const profile = await profileService.updateProfile(validateReq.data);

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.log("Unexpected error: ", error);
  }
}

