import { prisma } from "@/lib/prisma";
import { Prisma, Profile } from "@/src/generated/prisma/client";
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

  async findById(id: string) {
    return prisma.profile.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: {
          select: {
            resume: true,
          },
        },
      },
    });
  },

  async create(data: {
    userId: string;
    displayName: string;
    email: string | null;
    slug: string;
    website: string;
  }) {
    return prisma.profile.upsert({
      where: {
        userId: data.userId,
      },
      update: {},
      create: {
        displayName: data.displayName,
        email: data.email,
        slug: data.slug,
        isPublic: false,
        website: data.website,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  },

  async update(userId: string, data: Prisma.ProfileUpdateInput) {
    return prisma.profile.update({
      where: { userId: userId },
      data,
    });
  },

  async deleteById(id: number): Promise<Profile> {
    return prisma.profile.delete({
      where: { id },
    });
  },
};
