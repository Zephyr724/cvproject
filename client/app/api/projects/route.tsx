import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const projects = await prisma.project.findMany({
    include: {
      tags: {
        include: {
          tag: true, // ProjectTag → Tag
        },
      },
      techItems: {
        include: {
          techItem: true, // ProjectTechItem → TechItem
        },
      },
      roles: {
        include: {
          role: true, // ProjectRole → Role
        },
      },
      sections: {
        include: {
          contentTexts: true,
          contentImages: true,
          contentVideos: true,
        },
      },
    },
  });

  return NextResponse.json(projects);
}
