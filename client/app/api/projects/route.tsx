import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProjectResponse } from "@/lib/project-mapper";
import { projectInclude } from "@/lib/project-includes";
import { projectSchema } from "./schema";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: projectInclude,
  });

  return NextResponse.json(projects.map(toProjectResponse));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = projectSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });
}
