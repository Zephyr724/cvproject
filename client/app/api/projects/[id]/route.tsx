import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { number } from "zod";
import { projectInclude } from "@/lib/project-includes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  //
  const { id } = await params;
  const idNumber = parseInt(id);
  const project = await prisma.project.findUnique({
    where: { id: idNumber },
    include: projectInclude,
  });

  if (!project)
    return NextResponse.json({ error: "Project not found." }, { status: 400 });

  return NextResponse.json(project, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = parseInt(id);
  const body = await request.json();

  const product = await prisma.project.update({
    where: { id: idNumber },
    data: {
      name: body.title,
      projectUrl: body.projectUrl,
    },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found." }, { status: 400 });

  return NextResponse.json(product, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idNumber = parseInt(id);

  const updateProducted = await prisma.project.findUnique({
    where: { id: idNumber },
  });

  if (!updateProducted)
    return NextResponse.json({ error: "Product not found." }, { status: 404 });

  await prisma.project.delete({
    where: { id: idNumber },
  });

  return NextResponse.json(updateProducted);
}
