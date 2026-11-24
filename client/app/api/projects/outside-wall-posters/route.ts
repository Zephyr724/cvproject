import { NextRequest, NextResponse } from "next/server";
import { projectService } from "@/lib/server/services/project.service";
import { BusinessError } from "@/lib/server/errors";
import { requireAuth } from "@/lib/server/auth-guard";
import { validateUpdateOutsideWallPosterSchema } from "../validationSchema";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  // Validate and normalize the request before passing it to the service layer.
  const validation = validateUpdateOutsideWallPosterSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues },
      { status: 400 },
    );
  }
  try {
    // Scope every update to the authenticated owner.
    const session = await requireAuth();
    const ownerId = session.user.id;

    const project = await projectService.updateOutsideWallPosters(
      ownerId,
      validation.data,
    );
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
