// lib/services/project.service.ts
import { projectRepository } from "@/lib/repositories/project.repository";
import {
  toPrismaCreateInput,
  toApiResponse,
} from "@/lib/mappers/project.mapper";
import { CreateProjectDTO } from "@/app/api/projects/schema";
import { BusinessError } from "@/lib/errors";
import { Prisma } from "@/src/generated/prisma/client";


export const projectService = {
  async createProject(dto: CreateProjectDTO) {
    try{
    //optional: add business validations (like unique title, checking if related IDs exist, etc.)
    //transform DTO → Prisma Input
    const prismaInput = toPrismaCreateInput(dto);
    //call repository to write to database
    const created = await projectRepository.create(prismaInput);
    //transform database model → API response format
    return toApiResponse(created);}
     catch (error) {
      // Known Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        //P2025: Related record not found (e.g. invalid id in connect)
        if (error.code === "P2025") {
          throw new BusinessError(
            `Related record not found: ${error.meta?.cause || "please check the IDs in tags / techItems / roles"}`,
            422,
          );
        }
        // P2002: Unique constraint failed
        if (error.code === "P2002") {
          throw new BusinessError("Data already exists", 409);
        }
      }
      //other errors: rethrow to be handled by route error handler (logged and return 500)
      throw error;
    }
  
  },

  async getProject(id: number) {
    const project = await projectRepository.findById(id);
    if (!project) return null;
    return toApiResponse(project);
  },
};
