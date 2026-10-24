import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ValidateUpdateProfileType } from "@/app/api/profiles/validationSchema";
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

  async getProfileByUserId(userId: string) {
    const profile = await profileRepository.findById(userId);
    if (!profile) return null;
    return profile;
  },

  async ensureProfile(user: {
    id: string;
    name?: string | null;
    email?: string | null;
    resume?: string | null;
  }) {
    const existingProfile = await profileRepository.findById(user.id);

    if (existingProfile) {
      return existingProfile;
    }
    await profileService.createProfile(user);

    const createdProfile = await profileRepository.findById(user.id);

    if (!createdProfile) {
      throw new Error("Failed to create profile");
    }

    return createdProfile;
  },

  async createProfile(user: {
    id: string;
    name?: string | null;
    email?: string | null;
  }) {
    const displayName =
      user.name?.trim() || user.email?.split("@")[0] || "New User";
    const slug = generateProfileSlug(displayName);
    const websiteDomain = process.env.WEBSITEDOMAIN;

    if (!websiteDomain) {
      throw new Error("WEBSITEDOMAIN is not configured");
    }

    const website = new URL(slug, websiteDomain).toString();
    try {
      const createdProfile = await profileRepository.create({
        userId: user.id,
        displayName,
        email: user.email ?? null,
        slug,
        website,
      });
      return createdProfile;
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async updateProfile(data: ValidateUpdateProfileType) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new BusinessError("Unauthorized", 401);

    if (data.slug) {
      // The slug column is unique, so this lookup returns at most one profile.
      const existingProfile = await profileRepository.findBySlug(data.slug);

      // Keeping the current user's existing slug is valid. A matching slug is
      // a conflict only when it belongs to a different profile owner.
      if (existingProfile && existingProfile.userId !== session.user.id) {
        throw new BusinessError("This portfolio URL is already in use", 409);
      }
    }

    try {
      const prismaInput = toPrismaUpdateProfileInput(data);

      if (data.slug) {
        const websiteDomain = process.env.WEBSITEDOMAIN;

        if (!websiteDomain) {
          throw new Error("WEBSITEDOMAIN is not configured");
        }

        // Keep the stored public URL synchronized with the editable slug.
        prismaInput.slug = data.slug;
        prismaInput.website = new URL(
          `/${data.slug}`,
          websiteDomain,
        ).toString();
      }

      const updatedProfile = await profileRepository.update(
        session.user.id,
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

function toPrismaUpdateProfileInput(
  data: ValidateUpdateProfileType,
): Prisma.ProfileUpdateInput {
  const updateData: Prisma.ProfileUpdateInput = {};

  if (data.displayName !== undefined) {
    updateData.displayName = data.displayName;
  }

  if (data.slug !== undefined) {
    updateData.slug = data.slug;
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
