import { educationRepository } from "@/lib/server/repositories/education.repository";
import { toApiResponse } from "@/lib/server/mappers/education.mapper";
import {
  ValidateCreateEducationType,
  ValidateUpdateEducationType,
} from "@/app/api/education/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BusinessError } from "../errors";
import { Prisma } from "@/src/generated/prisma/client";
import { da } from "zod/v4/locales";
import { handlePrismaError } from "./errorHandle.service";

export const educationService = {
  async getAllEducations() {
    const educations = await educationRepository.findMany();
    return educations.map(toApiResponse);
  },

  async getEducationById(id: number) {
    const education = await educationRepository.findById(id);
    if (!education) return null;
    return toApiResponse(education);
  },

  async createEduction(data: ValidateCreateEducationType) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) throw new BusinessError("Unauthorized", 401);
    const userId = session.user.id;

    try {
      const prismaInput = toPrismaCreateEducationInput(data, userId);
      const createdEducation = await educationRepository.create(prismaInput);
      return toApiResponse(createdEducation);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async updateEducation(
    educationId: number,
    data: ValidateUpdateEducationType,
  ) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) throw new BusinessError("Unauthorized", 401);

    try {
      const prismaInput = toPrismaUpdateEducationInput(data);
      const updatedEducation = await educationRepository.update(
        educationId,
        prismaInput,
      );
      return toApiResponse(updatedEducation);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async deleteById(educationId: number) {
    try {
      const deleted = await educationRepository.deleteById(educationId);
      return `Experience with ID ${deleted.id} has been deleted successfully.`;
    } catch (error) {
      handlePrismaError(error);
    }
  },
};

function toPrismaCreateEducationInput(
  data: ValidateCreateEducationType,
  userId: string,
): Prisma.EducationCreateInput {
  return {
    degree: data.degree,
    institution: data.institution,
    startDate: new Date(data.startDate),
    endDate:
      data.isCurrentlyStudying || !data.endDate ? null : new Date(data.endDate),
    description: data.description ?? undefined,
    user: {
      connect: {
        id: userId,
      },
    },
  };
}
function toPrismaUpdateEducationInput(
  data: ValidateUpdateEducationType,
): Prisma.EducationUpdateInput {
  const updateData: Prisma.EducationUpdateInput = {};

  if (data.degree !== undefined) {
    updateData.degree = data.degree;
  }
  if (data.institution !== undefined) {
    updateData.institution = data.institution;
  }
  if (data.startDate !== undefined) {
    updateData.startDate = new Date(data.startDate);
  }
  if (data.isCurrentlyStudying === true) {
    updateData.endDate = null;
  } else if (data.endDate !== undefined) {
    updateData.endDate = data.endDate ? new Date(data.endDate) : null;
  }
  if (data.degree !== undefined) {
    updateData.degree = data.degree;
  }

  if (data.description !== undefined) {
    updateData.description = data.description;
  }

  return updateData;
}
