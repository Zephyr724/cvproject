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
};
