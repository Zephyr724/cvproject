import { requireAuth, requireEducationOwner } from "@/lib/server/auth-guard";
import { NextRequest, NextResponse } from "next/server";
import { validateUpdateEducationSchema } from "../validationSchema";
import { educationService } from "@/lib/server/services/education.service";
import { BusinessError } from "@/lib/server/errors";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const { id } = await params;
    const educationId = parseInt(id);
    await requireEducationOwner(session, educationId);

    const validateReq = validateUpdateEducationSchema.safeParse(body);
    if (!validateReq.success) {
      return NextResponse.json(
        { error: validateReq.error.message },
        { status: 400 },
      );
    }

    const education = await educationService.updateEducation(
      educationId,
      validateReq.data,
    );

    return NextResponse.json(education, { status: 200 });
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
    const educationId = parseInt(id);
    await requireEducationOwner(session, educationId);

    const education = await educationService.deleteById(educationId);
    return NextResponse.json(education, { status: 200 });
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
