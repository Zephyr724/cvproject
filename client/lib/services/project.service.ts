// lib/services/project.service.ts
import {
  projectRepository,
  roleRepository,
  tagRepository,
  techItemRepository,
} from "@/lib/repositories/project.repository";
import {
  toPrismaCreateInput,
  toApiResponse,
} from "@/lib/mappers/project.mapper";
import { ValidateCreateProjectSchema } from "@/app/api/projects/validationSchema";
import { BusinessError } from "@/lib/errors";
import { Prisma, TechCategory } from "@/src/generated/prisma/client";

export const projectService = {
  async createProject(projectData: ValidateCreateProjectSchema) {
    try {
      const [tags, techItems, roles] = await Promise.all([
        Promise.all((projectData.tags ?? []).map(ensureTag)),
        Promise.all((projectData.techItems ?? []).map(ensureTechItem)),
        Promise.all((projectData.roles ?? []).map(ensureRole)),
      ]);

      //optional: add business validations (like unique title, checking if related IDs exist, etc.)
      //transform projectData(DTO) → Prisma Input
      const prismaInput = toPrismaCreateInput(projectData, {
        tags,
        techItems,
        roles,
      });
      //call repository to write to database
      const created = await projectRepository.create(prismaInput);
      //transform database model → API response format
      return toApiResponse(created);
    } catch (error) {
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
  async getAllProjects() {
    const projects = await projectRepository.findMany();
    return projects.map(toApiResponse);
  },
};

async function ensureTag(tag: { id?: number; name?: string; order: number }) {
  if (tag.id) {
    const exists = await tagRepository.findById(tag.id);
    if (!exists)
      throw new BusinessError(`Tag id=${tag.id} doesn't exist.`, 422);
    return { id: tag.id, order: tag.order };
  }
  const result = await tagRepository.upsertByName(tag.name!);
  return { id: result.id, order: tag.order };
}

async function ensureTechItem(item: {
  id?: number;
  name?: string;
  slug?: string;
  category: TechCategory;
  order: number;
}) {
  if (item.id) {
    const exists = await techItemRepository.findById(item.id);
    if (!exists)
      throw new BusinessError(`TechItem id=${item.id} doesn't exist.`, 422);
    return { id: item.id, category: item.category, order: item.order };
  }
  const result = await techItemRepository.upsertBySlug(
    item.slug as string,
    item.name as string,
  );
  return { id: result.id, category: item.category, order: item.order };
}

async function ensureRole(role: { id?: number; name?: string; order: number }) {
  if (role.id) {
    const exists = await roleRepository.findById(role.id);
    if (!exists)
      throw new BusinessError(`Role id=${role.id} doesn't exist.`, 422);
    return { id: role.id, order: role.order };
  }
  const result = await roleRepository.upsertByName(role.name!);
  return { id: result.id, order: role.order };
}
