import { prisma } from "@/lib/prisma";
import type { Prisma, Experience } from "@/src/generated/prisma/client";

export const experienceRepository = {
  async findMany(): Promise<Experience[]> {
    return prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
  },
};
