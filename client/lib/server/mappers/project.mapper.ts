// lib/mappers/project.mapper.ts
import type { Prisma, TechCategory } from "@/src/generated/prisma/client";
import type { ProjectWithIncludes } from "@/lib/server/repositories/project.repository";
import type { ValidateCreateProjectType } from "@/app/api/projects/validationSchema";

/**

 * Transform API request body (CreateProject projectData) into Prisma's ProjectCreateInput
 * note: This is purely a format transformation, without any business logic (like deciding between connect or create)
 */

interface ResolvedData {
  tags: { id: number; order: number }[];
  techItems: { id: number; category: TechCategory; order: number }[];
  roles: { id: number; order: number }[];
}

export function toPrismaCreateInput(
  projectData: ValidateCreateProjectType,
  resolvedData: ResolvedData,
): Prisma.ProjectCreateInput {
  return {
    title: projectData.title,
    projectUrl: projectData.projectUrl ?? null,
    githubUrl: projectData.githubUrl ?? null,
    tags: {
      create: resolvedData.tags.map(({ id, order }) => ({
        order,
        tag: { connect: { id } },
      })),
    },
    techItems: {
      create: resolvedData.techItems.map(({ id, category, order }) => ({
        category,
        order,
        techItem: { connect: { id } },
      })),
    },
    roles: {
      create: resolvedData.roles.map(({ id, order }) => ({
        order,
        role: { connect: { id } },
      })),
    },
    sections: {
      create:
        projectData.sections?.map((section) => ({
          order: section.order ?? 0,
          title: section.title,
          layoutType: section.layoutType,
          contentTexts: {
            create:
              section.contentTexts?.map(({ content }) => ({ content })) ?? [],
            //only create content without id (which automatically created by db)
          },
          contentImages: {
            create:
              section.contentImages?.map(({ url, alt }) => ({ url, alt })) ??
              [],
          },
          contentVideos: {
            create: section.contentVideos?.map(({ url }) => ({ url })) ?? [],
          },
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

// update's transformation is more complex,
// because we need to handle the logic of connect vs create vs delete for related entities
// (tags, techItems, roles, sections)
// For simplicity, we assume the frontend sends the complete updated list of related entities
// (with ids if they exist, without ids if new), and we do a full replace on the backend:
export function toPrismaUpdateInput(
  projectData: Partial<ValidateCreateProjectType>,
  resolvedData?: Partial<ResolvedData>,
): Prisma.ProjectUpdateInput {
  const data: Prisma.ProjectUpdateInput = {};

  if (projectData.title !== undefined) data.title = projectData.title;
  if (projectData.projectUrl !== undefined)
    data.projectUrl = projectData.projectUrl ?? null;
  if (projectData.githubUrl !== undefined)
    data.githubUrl = projectData.githubUrl ?? null;

  // tags
  if (projectData.tags !== undefined && resolvedData?.tags) {
    data.tags = {
      deleteMany: {},
      create: resolvedData.tags.map(({ id, order }) => ({
        order,
        tag: { connect: { id } },
      })),
    };
  }

  // techItems
  if (projectData.techItems !== undefined && resolvedData?.techItems) {
    data.techItems = {
      deleteMany: {},
      create: resolvedData.techItems.map(({ id, category, order }) => ({
        category,
        order,
        techItem: { connect: { id } },
      })),
    };
  }

  // roles
  if (projectData.roles !== undefined && resolvedData?.roles) {
    data.roles = {
      deleteMany: {},
      create: resolvedData.roles.map(({ id, order }) => ({
        order,
        role: { connect: { id } },
      })),
    };
  }

  // sections —— key difference: sections have their own content (texts, images, videos),
  // so we also need to handle them
  if (projectData.sections !== undefined) {
    data.sections = {
      deleteMany: {}, //delete all old sections (with CASCADE, child content auto-deleted)

      create: projectData.sections.map((section) => ({
        order: section.order ?? 0,
        title: section.title,
        layoutType: section.layoutType,
        contentTexts: {
          create:
            section.contentTexts?.map(({ content }) => ({ content })) ?? [],
        },
        contentImages: {
          create:
            section.contentImages?.map(({ url, alt }) => ({ url, alt })) ?? [],
        },
        contentVideos: {
          create: section.contentVideos?.map(({ url }) => ({ url })) ?? [],
        },
      })),
    };
  }

  return data;
}
