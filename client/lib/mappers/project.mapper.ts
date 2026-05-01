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
        dto.tags?.map((t) => ({
          order: t.order,
          tag: t.id
            ? { connect: { id: t.id } }
            : {
                connectOrCreate: {
                  where: { name: t.name! },
                  create: { name: t.name! },
                },
              },
        })) ?? [],
    },
    techItems: {
      create:
        dto.techItems?.map((ti) => ({
          category: ti.category,
          order: ti.order,
          techItem: ti.id
            ? { connect: { id: ti.id } }
            : {
                connectOrCreate: {
                  where: { slug: ti.slug! },
                  create: { name: ti.name!, slug: ti.slug! },
                },
              },
        })) ?? [],
    },
    roles: {
      create:
        dto.roles?.map((r) => ({
          order: r.order,
          role: r.id
            ? { connect: { id: r.id } }
            : {
                connectOrCreate: {
                  where: { name: r.name! },
                  create: { name: r.name! },
                },
              },
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
