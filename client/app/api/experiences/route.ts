import { NextRequest, NextResponse } from "next/server";
import { experienceService } from "@/lib/server/services/experience.service";
import {
  validateCreateExperienceSchema,
  validateUpdateExperienceSchema,
} from "./validationSchema";
import { error, log } from "console";
import { BusinessError } from "@/lib/server/errors";
import { requireAuth, requireExperienceOwner } from "@/lib/server/auth-guard";

export async function GET() {
  const experiences = await experienceService.getAllExperiences();
  return NextResponse.json(experiences);
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  const validateReq = validateCreateExperienceSchema.safeParse(req);
  if (!validateReq.success) {
    return NextResponse.json(
      { error: validateReq.error.issues },
      { status: 400 },
    );
  }

  try {
    const experience = await experienceService.createExperience(
      validateReq.data,
    );
    return NextResponse.json(experience, { status: 201 });
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

