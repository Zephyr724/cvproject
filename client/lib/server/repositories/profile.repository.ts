import { prisma } from "@/lib/prisma";
import { Prisma, Profile, Resume } from "@/src/generated/prisma/client";
export const profileRepository = {
  async findBySlug(slug: string) {
    return prisma.profile.findUnique({
      where: {
        slug,
      },
      select: {
        displayName: true,
        headline: true,
        bio: true,
        email: true,
        linkedin: true,
        github: true,
        isPublic: true,

        user: {
          select: {
            resume: {
              select: {
                id: true,
                originalName: true,
                fileUrl: true,
                mimeType: true,
                fileSize: true,
                uploadedAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  },

  async findById(id: number) {
    return prisma.profile.findUnique({
      where: {
        id,
      },
      select: {
        displayName: true,
        headline: true,
        bio: true,
        email: true,
        linkedin: true,
        github: true,
        isPublic: true,

        user: {
          select: {
            resume: {
              select: {
                id: true,
                originalName: true,
                fileUrl: true,
                mimeType: true,
                fileSize: true,
                uploadedAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  },

  async create(data: Prisma.ProfileCreateInput) {
    return prisma.profile.create({
      data,
    });
  },

  async update(id: number, data: Prisma.ProfileUpdateInput) {
    return prisma.profile.update({
      where: { id },
      data,
    });
  },

  async deleteById(id: number): Promise<Profile> {
    return prisma.profile.delete({
      where: { id },
    });
  },
};
