import { prisma } from "@/lib/prisma";
import type { Prisma, Education } from "@/src/generated/prisma/client";

export const educationRepository = {
  async findMany(): Promise<Education[]> {
    return prisma.education.findMany({
      orderBy: { startDate: "desc" },
    });
  },
};
