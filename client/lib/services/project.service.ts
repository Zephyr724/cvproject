// lib/services/project.service.ts
import { projectRepository } from "@/lib/repositories/project.repository";
import {
  toPrismaCreateInput,
  toApiResponse,
} from "@/lib/mappers/project.mapper";
import { z } from "zod";

//define api request DTO (also used for Zod validation)
export const createProjectSchema = z.object({
  title: z.string().min(1),
  projectUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  tags: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1).optional(),
        order: z.number(),
      }),
    )
    .optional(),
  techItems: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        category: z.enum(["frontend", "backend"]),
        order: z.number(),
      }),
    )
    .optional(),
  roles: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1).optional(),
        order: z.number(),
      }),
    )
    .optional(),
  sections: z
    .array(
      z.object({
        order: z.number(),
        title: z.string(),
        layoutType: z.enum([
          "imgTopTextBottom",
          "imgLeftTextRight",
          "imgRightTextLeft",
          "textTopImgMiddleTextBottom",
        ]),
        contentTexts: z.array(z.object({ content: z.string() })).optional(),
        contentImages: z
          .array(
            z.object({ url: z.string().url(), alt: z.string().optional() }),
          )
          .optional(),
        contentVideos: z.array(z.object({ url: z.string().url() })).optional(),
      }),
    )
    .optional(),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;

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
