// lib/services/project.service.ts
import {
  projectRepository,
  roleRepository,
  tagRepository,
  techItemRepository,
} from "@/lib/server/repositories/project.repository";
import {
  toPrismaCreateInput,
  toApiResponse,
  toPrismaUpdateInput,
} from "@/lib/server/mappers/project.mapper";
import { ValidateCreateProjectType } from "@/app/api/projects/validationSchema";
import { BusinessError } from "@/lib/server/errors";
import { Prisma, TechCategory } from "@/src/generated/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const projectService = {
  async createProject(projectData: ValidateCreateProjectType) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new BusinessError("Unauthorized", 401);

    try {
      const [tags, techItems, roles] = await Promise.all([
        Promise.all((projectData.tags ?? []).map(ensureTag)),
        Promise.all((projectData.techItems ?? []).map(ensureTechItem)),
        Promise.all((projectData.roles ?? []).map(ensureRole)),
      ]);

      //optional: add business validations (like unique title, checking if related IDs exist, etc.)
      //transform projectData(DTO) → Prisma Input
      const prismaInput = toPrismaCreateInput(
        projectData,
        {
          tags,
          techItems,
          roles,
        },
        session.user.id,
      );
      //call repository to write to database
      const created = await projectRepository.create(prismaInput);
      //transform database model → API response format
      return toApiResponse(created);
    } catch (error) {
      handlePrismaError(error);
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

  async getAllProjectsList() {
    const projects = await projectRepository.findManylight();
    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      introduction: p.introduction,
      coverImageUrl: p.coverImageUrl,
      projectUrl: p.projectUrl ?? null, // ← undefined → null
      githubUrl: p.githubUrl ?? null, // ← undefined → null
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      // List do not need tags/sections，default is []
      tags: [],
      techStack: { frontend: [], backend: [] },
      responsibilities: [],
      sections: [],
    }));
  },

  async update(
    projectId: number,
    projectData: Partial<ValidateCreateProjectType>,
  ) {
    try {
      const [tags, techItems, roles] = await Promise.all([
        projectData.tags
          ? Promise.all(projectData.tags.map(ensureTag))
          : undefined,
        projectData.techItems
          ? Promise.all(projectData.techItems.map(ensureTechItem))
          : undefined,
        projectData.roles
          ? Promise.all(projectData.roles.map(ensureRole))
          : undefined,
      ]);

      //optional: add business validations (like unique title, checking if related IDs exist, etc.)
      //transform projectData(DTO) → Prisma Input
      const prismaInput = toPrismaUpdateInput(projectData, {
        tags,
        techItems,
        roles,
      });
      //call repository to write to database
      const updated = await projectRepository.update(projectId, prismaInput);
      //transform database model → API response format
      return toApiResponse(updated);
    } catch (error) {
      handlePrismaError(error);
    }
  },

  async deleteById(projectId: number) {
    try {
      const deleted = await projectRepository.deleteById(projectId);
      return toApiResponse(deleted);
    } catch (error) {
      handlePrismaError(error);
    }
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

function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      throw new BusinessError(
        `Related record not found: ${error.meta?.cause || "please check the IDs in tags / techItems / roles / sections"}`,
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
