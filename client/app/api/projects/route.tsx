import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProjectResponse } from "@/lib/project-mapper";
import { projectInclude } from "@/lib/project-includes";
import {
  projectService,
  createProjectSchema,
} from "@/lib/services/project.service";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: projectInclude,
  });

  return NextResponse.json(projects.map(toProjectResponse));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parse = createProjectSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.issues }, { status: 400 });
  }

  try {
    const project = await projectService.createProject(parse.data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
