import { prisma } from "@/lib/prisma";
import { Prisma, Education } from "@/src/generated/prisma/client";

export const educationRepository = {
  async findMany(): Promise<Education[]> {
    return prisma.education.findMany({
      orderBy: { startDate: "desc" },
    });
  },

  async findById(id: number) {
    return prisma.education.findFirst({
      where: { id },
    });
  },

  async create(data: Prisma.EducationCreateInput) {
    return prisma.education.create({
      data,
    });
  },

  async update(id: number, data: Prisma.EducationUpdateInput) {
    return prisma.education.update({
      where: { id },
      data,
    });
  },

  async deleteById(id: number): Promise<Education> {
    return prisma.education.delete({
      where: { id },
    });
  },
};
