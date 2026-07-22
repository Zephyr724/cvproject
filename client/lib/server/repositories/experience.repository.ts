import { prisma } from "@/lib/prisma";
import type { Prisma, Experience } from "@/src/generated/prisma/client";

export const experienceRepository = {
  async findMany() {
    return prisma.experience.findMany({
      include: {
        techItems: {
          include: {
            techItem: true,
          },
        },
      },
      orderBy: { startDate: "desc" },
    });
  },

  async findById(id: number) {
    return prisma.experience.findFirst({
      where: { id },
      include: {
        techItems: {
          include: {
            techItem: true,
          },
        },
      },
      orderBy: { startDate: "desc" },
    });
  },

  async create(data: Prisma.ExperienceCreateInput) {
    return prisma.experience.create({
      data,
      include: {
        techItems: {
          include: {
            techItem: true,
          },
        },
      },
    });
  },

  async update(id: number, data: Prisma.ExperienceUpdateInput) {
    return prisma.experience.update({
      where: { id },
      data,
      include: {
        techItems: {
          include: {
            techItem: true,
          },
        },
      },
    });
  },

  async deleteById(id: number): Promise<Experience> {
    return prisma.experience.delete({
      where: { id },
      include: {
        techItems: {
          include: {
            techItem: true,
          },
        },
      },
    });
  },
};
