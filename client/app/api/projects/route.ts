import { NextRequest, NextResponse } from "next/server";
import { projectService } from "@/lib/server/services/project.service";
import { validateCreateProjectSchema } from "./validationSchema";
import { BusinessError } from "@/lib/server/errors";
import { requireAuth } from "@/lib/server/auth-guard";

export async function GET() {
  // Ensure user is authenticated; throws 401 if no valid session
  const session = await requireAuth();
  const projects = await projectService.getAccessibleProjects(session);
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = validateCreateProjectSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues },
      { status: 400 },
    );
  }

  try {
    const project = await projectService.createProject(validation.data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    // Business errors: return specific message and corresponding status code
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    // Unknown errors: log and return 500
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
