import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toApiResponse } from "@/lib/mappers/project.mapper";
import { projectInclude } from "@/lib/repositories/project.repository";
import { projectService } from "@/lib/services/project.service";
import { validateCreateProjectSchema } from "./schema";
import { BusinessError } from "@/lib/errors";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: projectInclude,
  });

  return NextResponse.json(projects.map(toApiResponse));
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
