import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectInclude } from "@/lib/server/repositories/project.repository";
import { projectService } from "@/lib/server/services/project.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  //
  const { id } = await params;
  const idNumber = parseInt(id);
  const project = await projectService.getProject(idNumber);

  if (!project)
    return NextResponse.json({ error: "Project not found." }, { status: 400 });

  return NextResponse.json(project, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = parseInt(id);
  const body = await request.json();

  const project = await projectService.update(idNumber, body);

  if (!project)
    return NextResponse.json({ error: "Project not found." }, { status: 404 });

  return NextResponse.json(project, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = parseInt(id);

  const project = await prisma.project.findUnique({
    where: { id: idNumber },
    include: projectInclude,
  });

  if (!project)
    return NextResponse.json({ error: "Project not found." }, { status: 404 });

  await prisma.project.delete({
    where: { id: idNumber },
  });

  return NextResponse.json(project);
}
