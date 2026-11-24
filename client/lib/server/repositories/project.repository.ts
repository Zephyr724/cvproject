// lib/repositories/project.repository.ts
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/src/generated/prisma/client";
export const projectInclude = {
  tags: { include: { tag: true } },
  techItems: { include: { techItem: true } },
  roles: { include: { role: true } },
  owner: { select: { email: true } },
} satisfies Prisma.ProjectInclude; // use 'satisfies' to ensure this matches the expected type without losing literal types

export type ProjectWithIncludes = Prisma.ProjectGetPayload<{
  include: typeof projectInclude;
}>;

export type OutsideWallPosterUpdate = {
  projectId: number;
} & Pick<Prisma.ProjectUpdateInput, "outsideWallPosterUrl" | "outsideWallSlot">;

export const projectRepository = {
  async create(data: Prisma.ProjectCreateInput): Promise<ProjectWithIncludes> {
    return prisma.project.create({ data, include: projectInclude });
  },

  async update(id: number, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({
      where: { id },
      data,
      include: projectInclude,
    });
  },

  async updateOutsideWallPosters(
    ownerId: string,
    updates: OutsideWallPosterUpdate[],
  ) {
    return prisma.$transaction(async (tx) => {
      // Release existing slots before applying the new order to avoid unique conflicts.
      await tx.project.updateMany({
        where: { ownerId },
        data: { outsideWallSlot: null },
      });

      const results = [];

      // Keep the writes sequential on the transaction connection and roll back on failure.
      for (const update of updates) {
        const project = await tx.project.update({
          where: { ownerId, id: update.projectId },
          data: {
            outsideWallPosterUrl: update.outsideWallPosterUrl,
            outsideWallSlot: update.outsideWallSlot,
          },
          include: projectInclude,
        });
        results.push(project);
      }

      return results;
    });
  },

  async findById(id: number): Promise<ProjectWithIncludes | null> {
    return prisma.project.findUnique({
      where: { id },
      include: projectInclude,
    });
  },
  async findByIdAndOwnerId(
    id: number,
    ownerId: string,
  ): Promise<ProjectWithIncludes | null> {
    return prisma.project.findFirst({
      where: { id, ownerId },
      include: projectInclude,
    });
  },
  async findMany(): Promise<ProjectWithIncludes[]> {
    return prisma.project.findMany({
      include: projectInclude,
    });
  },

  async findManyByOwnerId(ownerId: string): Promise<ProjectWithIncludes[]> {
    return prisma.project.findMany({
      where: { ownerId },
      include: projectInclude,
    });
  },

  async deleteById(projectId: number) {
    return await prisma.project.delete({
      where: { id: projectId },
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
