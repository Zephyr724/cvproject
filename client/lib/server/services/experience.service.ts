import { experienceRepository } from "@/lib/server/repositories/experience.repository";
import { toApiResponse } from "@/lib/server/mappers/experience.mapper";
import { BusinessError } from "../errors";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import {
  ValidateCreateExperienceType,
  ValidateUpdateExperienceType,
} from "@/app/api/experiences/validationSchema";
import { Prisma } from "@/src/generated/prisma/client";
import error from "next/dist/api/error";

export const experienceService = {
  async getAllExperiences() {
    const experiences = await experienceRepository.findMany();
    return experiences.map(toApiResponse);
  },

  async getExperienceById(id: number) {
    const experience = await experienceRepository.findById(id);
    if (!experience) return null;
    return toApiResponse(experience);
  },

  async createExperience(data: ValidateCreateExperienceType) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new BusinessError("Unauthorized", 401);

    const userId = session.user.id;

    try {
      const prismaInput = toPrismaCreateExperienceInput(data, userId);

      const createdExperience = await experienceRepository.create(prismaInput);

      return toApiResponse(createdExperience);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async updateExperience(
    experienceId: number,
    data: ValidateUpdateExperienceType,
  ) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new BusinessError("Unauthorized", 401);
    try {
      // logic for update the experience

      const prismaInput = toPrismaUpdateExperienceInput(data);
      const updatedExperience = await experienceRepository.update(
        experienceId,
        prismaInput,
      );
      return toApiResponse(updatedExperience);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async deleteById(experienceId: number) {
    try {
      const deleted = await experienceRepository.deleteById(experienceId);
      return `Experience with ID ${deleted.id} has been deleted successfully.`;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};

function toPrismaCreateExperienceInput(
  data: ValidateCreateExperienceType,
  userId: string,
): Prisma.ExperienceCreateInput {
  return {
    title: data.title,
    company: data.company,
    startDate: new Date(data.startDate),
    endDate:
      data.isCurrentlyWorking || !data.endDate ? null : new Date(data.endDate),
    description: data.description ?? undefined,

    user: {
      connect: {
        id: userId,
      },
    },

    techItems: {
      create: (data.techItems ?? []).map((item) => ({
        techItem: {
          connectOrCreate: {
            where: {
              slug: item.slug!,
            },
            create: {
              name: item.name!,
              slug: item.slug!,
              isFrontend: false,
              isBackend: false,
            },
          },
        },
      })),
    },
  };
}

function toPrismaUpdateExperienceInput(
  data: ValidateUpdateExperienceType,
): Prisma.ExperienceUpdateInput {
  const updateData: Prisma.ExperienceUpdateInput = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
  }

  if (data.company !== undefined) {
    updateData.company = data.company;
  }

  if (data.startDate !== undefined) {
    updateData.startDate = new Date(data.startDate);
  }

  if (data.isCurrentlyWorking === true) {
    updateData.endDate = null;
  } else if (data.endDate !== undefined) {
    updateData.endDate = data.endDate ? new Date(data.endDate) : null;
  }

  if (data.description !== undefined) {
    updateData.description = data.description;
  }

  if (data.techItems !== undefined) {
    updateData.techItems = {
      deleteMany: {},
      create: data.techItems.map((item) => ({
        techItem: {
          connectOrCreate: {
            where: {
              slug: item.slug!,
            },
            create: {
              name: item.name!,
              slug: item.slug!,
              isFrontend: false,
              isBackend: false,
            },
          },
        },
      })),
    };
  }

  return updateData;
}

function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      throw new BusinessError(
        `Related record not found: ${error.meta?.cause || "please check the IDs in tags / techItems / roles / content"}`,
        422,
      );
    }
    if (error.code === "P2002") {
      throw new BusinessError(
        "A record with that unique value already exists",
        409,
      );
    }
    if (error.code === "P2014") {
      // The change you are trying to make would violate the required relation
      throw new BusinessError(
        `Cannot delete: related records still exist. Remove them first.`,
        409,
      );
    }
  }
  throw error; // unknown error → let global error handler handle → 500
}
