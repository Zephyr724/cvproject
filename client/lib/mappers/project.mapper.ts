// lib/mappers/project.mapper.ts
import type { Prisma } from "@/src/generated/prisma/client";
import type { ProjectWithIncludes } from "@/lib/repositories/project.repository";
import type { CreateProjectDTO } from "../services/project.service"; 

/**

 * Transform API request body (CreateProjectDTO) into Prisma's ProjectCreateInput
 * note: This is purely a format transformation, without any business logic (like deciding between connect or create)
 */
export function toPrismaCreateInput(
  dto: CreateProjectDTO,
): Prisma.ProjectCreateInput {
  return {
    title: dto.title,
    projectUrl: dto.projectUrl ?? null,
    githubUrl: dto.githubUrl ?? null,
    tags: {
      create:
        dto.tags?.map(({ id, order }) => ({
          order,
          tag: { connect: { id } },
        })) ?? [],
    },
    techItems: {
      create:
        dto.techItems?.map(({ id, category, order }) => ({
          category,
          order,
          techItem: { connect: { id } },
        })) ?? [],
    },
    roles: {
      create:
        dto.roles?.map(({ id, order }) => ({
          order,
          role: { connect: { id } },
        })) ?? [],
    },
    sections: {
      create:
        dto.sections?.map((section) => ({
          order: section.order,
          title: section.title,
          layoutType: section.layoutType,
          contentTexts: { create: section.contentTexts ?? [] },
          contentImages: { create: section.contentImages ?? [] },
          contentVideos: { create: section.contentVideos ?? [] },
        })) ?? [],
    },
  };
}

/**
 * Transform the database model (ProjectWithIncludes) into a flattened API response format needed by the frontend
 */
export function toApiResponse(project: ProjectWithIncludes) {
  return {
    id: project.id,
    title: project.title,
    projectUrl: project.projectUrl,
    githubUrl: project.githubUrl,
    tags: project.tags.map((t) => ({
      id: t.tag.id,
      name: t.tag.name,
      order: t.order,
    })),
    techStack: {
      frontend: project.techItems
        .filter((ti) => ti.category === "frontend")
        .map((ti) => ({
          id: ti.techItem.id,
          name: ti.techItem.name,
          slug: ti.techItem.slug,
          order: ti.order,
        })),
      backend: project.techItems
        .filter((ti) => ti.category === "backend")
        .map((ti) => ({
          id: ti.techItem.id,
          name: ti.techItem.name,
          slug: ti.techItem.slug,
          order: ti.order,
        })),
    },
    responsibilities: project.roles.map((r) => ({
      id: r.role.id,
      name: r.role.name,
      order: r.order,
    })),
    sections: project.sections.map((s) => ({
      id: s.id,
      order: s.order,
      title: s.title,
      layoutType: s.layoutType,
      contentTexts: s.contentTexts.map((ct) => ({
        id: ct.id,
        content: ct.content,
      })),
      contentImages: s.contentImages.map((ci) => ({
        id: ci.id,
        url: ci.url,
        alt: ci.alt,
      })),
      contentVideos: s.contentVideos.map((cv) => ({ id: cv.id, url: cv.url })),
    })),
  };
}
