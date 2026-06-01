import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectInclude } from "@/lib/server/repositories/project.repository";
import { projectService } from "@/lib/server/services/project.service";
import { BusinessError } from "@/lib/server/errors";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  //
  const { id } = await params;
  const idNumber = parseInt(id);
  const project = await projectService.getProject(idNumber);

  if (!project)
    return NextResponse.json({ error: "Project not found." }, { status: 404 });

  return NextResponse.json(project, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = parseInt(id);
  const body = await request.json();

  try {
    const project = await projectService.update(idNumber, body);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = parseInt(id);

  try {
    const project = await projectService.deleteById(idNumber);
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
