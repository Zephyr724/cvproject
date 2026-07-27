import { NextRequest, NextResponse } from "next/server";
import { educationService } from "@/lib/server/services/education.service";
import { validateCreateEducationSchema } from "./validationSchema";
import { BusinessError } from "@/lib/server/errors";

export async function GET() {
  const educations = await educationService.getAllEducations();
  return NextResponse.json(educations);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validateReq = validateCreateEducationSchema.safeParse(body);
  if (!validateReq.success) {
    return NextResponse.json(
      { error: validateReq.error.issues },
      { status: 400 },
    );
  }

  try {
    const education = await educationService.createEduction(validateReq.data);
    return NextResponse.json(education, { status: 201 });
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
