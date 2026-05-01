// lib/repositories/project.repository.ts
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/src/generated/prisma/client";
export const projectInclude = {
  tags: { include: { tag: true } },
  techItems: { include: { techItem: true } },
  roles: { include: { role: true } },
  sections: {
    include: {
      contentTexts: true,
      contentImages: true,
      contentVideos: true,
    },
  },
} satisfies Prisma.ProjectInclude; // use 'satisfies' to ensure this matches the expected type without losing literal types

export type ProjectWithIncludes = Prisma.ProjectGetPayload<{
  include: typeof projectInclude;
}>;

export const projectRepository = {
  async create(data: Prisma.ProjectCreateInput): Promise<ProjectWithIncludes> {
    return prisma.project.create({ data, include: projectInclude });
  },
  async findById(id: number): Promise<ProjectWithIncludes | null> {
    return prisma.project.findUnique({
      where: { id },
      include: projectInclude,
    });
  },

};
