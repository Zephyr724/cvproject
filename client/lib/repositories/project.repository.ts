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

export const tagRepository = {
  async findById(id: number) {
    return prisma.tag.findUnique({ where: { id } });
  },
  async upsertByName(name: string) {
    return prisma.tag.upsert({ where: { name }, update: {}, create: { name } });
  },
};

export const techItemRepository = {
  async findById(id: number) {
    return prisma.techItem.findUnique({ where: { id } });
  },
  async upsertBySlug(slug: string, name: string) {
    return prisma.techItem.upsert({
      where: { slug },
      update: {},
      create: { slug, name },
    });
  },
};

export const roleRepository = {
  async findById(id: number) {
    return prisma.role.findUnique({ where: { id } });
  },
  async upsertByName(name: string) {
    return prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  },
};
