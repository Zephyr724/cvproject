import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProjectResponse } from "@/lib/project-mapper";
import { projectInclude } from "@/lib/project-includes";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: projectInclude,
  });

  return NextResponse.json(projects.map(toProjectResponse));
}
