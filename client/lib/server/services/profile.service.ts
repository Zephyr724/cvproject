import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  ValidateCreateProfileType,
  ValidateUpdateProfileType,
} from "@/app/api/profiles/validationSchema";
import { profileRepository } from "@/lib/server/repositories/profile.repository";
import { getServerSession } from "next-auth/next";
import { BusinessError } from "../errors";
import { Prisma } from "@/src/generated/prisma/client";
import { handlePrismaError } from "./errorHandle.service";
import { toApiResponse } from "../mappers/profile.mapper";
import { randomUUID } from "node:crypto";

export const profileService = {
  async getProfileBySlug(slug: string) {
    const profile = await profileRepository.findBySlug(slug);
    if (!profile) return null;
    return profile;
  },

  async getProfileById(id: number) {
    const profile = await profileRepository.findById(id);
    if (!profile) return null;
    return profile;
  },

  async createProfile(data: ValidateCreateProfileType) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new BusinessError("Unauthorized", 401);

    const userId = session.user.id;
    const slug = generateProfileSlug(data.displayName);
    try {
      const prismaInput = toPrismaCreateProfileInput(data, userId, slug);
      const createdProfile = await profileRepository.create(prismaInput);
      return toApiResponse(createdProfile);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async updateProfile(userId: number, data: ValidateUpdateProfileType) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new BusinessError("Unauthorized", 401);

    try {
      const prismaInput = toPrismaUpdateProfileInput(data);
      const updatedProfile = await profileRepository.update(
        userId,
        prismaInput,
      );
      return toApiResponse(updatedProfile);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async deleteById(profileId: number) {
    try {
      const deleted = await profileRepository.deleteById(profileId);
      return `Profile with ID ${deleted.id} has been deleted successfully.`;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};

function generateProfileSlug(displayName: string): string {
  const namePart = displayName
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  const uniquePart = randomUUID();
  return namePart ? `${namePart}-${uniquePart}` : uniquePart;
}

function toPrismaCreateProfileInput(
  data: ValidateCreateProfileType,
  userId: string,
  slug: string,
): Prisma.ProfileCreateInput {
  return {
    displayName: data.displayName,
    headline: data.headline || null,
    bio: data.bio || null,
    linkedin: data.linkedin || null,
    github: data.github || null,
    email: data.email || null,
    website: data.website || null,
    isPublic: data.isPublic,
    slug,

    user: {
      connect: {
        id: userId,
      },
    },
  };
}

function toPrismaUpdateProfileInput(
  data: ValidateUpdateProfileType,
): Prisma.ProfileUpdateInput {
  const updateData: Prisma.ProfileUpdateInput = {};

  if (data.displayName !== undefined) {
    updateData.displayName = data.displayName;
  }

  if (data.headline !== undefined) {
    updateData.headline = data.headline;
  }

  if (data.bio !== undefined) {
    updateData.bio = data.bio;
  }

  if (data.linkedin !== undefined) {
    updateData.linkedin = data.linkedin;
  }

  if (data.github !== undefined) {
    updateData.github = data.github;
  }

  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  if (data.website !== undefined) {
    updateData.website = data.website;
  }

  if (data.isPublic !== undefined) {
    updateData.isPublic = data.isPublic;
  }

  return updateData;
}
