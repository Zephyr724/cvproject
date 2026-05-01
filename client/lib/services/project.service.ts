// lib/services/project.service.ts
import { projectRepository } from "@/lib/repositories/project.repository";
import {
  toPrismaCreateInput,
  toApiResponse,
} from "@/lib/mappers/project.mapper";
import { CreateProjectDTO } from "@/app/api/projects/schema";

export const projectService = {
  async createProject(dto: CreateProjectDTO) {
    //optional: add business validations (like unique title, checking if related IDs exist, etc.)
    //transform DTO → Prisma Input
    const prismaInput = toPrismaCreateInput(dto);
    //call repository to write to database
    const created = await projectRepository.create(prismaInput);
    //transform database model → API response format
    return toApiResponse(created);
  },

  async getProject(id: number) {
    const project = await projectRepository.findById(id);
    if (!project) return null;
    return toApiResponse(project);
  },
};
