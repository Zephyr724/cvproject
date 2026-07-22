import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireExperienceOwner } from "@/lib/server/auth-guard";
import { experienceService } from "@/lib/server/services/experience.service";
import { validateUpdateExperienceSchema } from "../validationSchema";
import { BusinessError } from "@/lib/server/errors";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const { id } = await params;
    const experienceId = parseInt(id);
    await requireExperienceOwner(session, experienceId);

    const validateReq = validateUpdateExperienceSchema.safeParse(body);
    if (!validateReq.success) {
      return NextResponse.json(
        { error: validateReq.error.issues },
        { status: 400 },
      );
    }

    const experience = await experienceService.updateExperience(
      experienceId,
      validateReq.data,
    );

    return NextResponse.json(experience, { status: 200 });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const experienceId = parseInt(id);
    await requireExperienceOwner(session, experienceId);

    const experience = await experienceService.deleteById(experienceId);
    return NextResponse.json(experience, { status: 200 });
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
