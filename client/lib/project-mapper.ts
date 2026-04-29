import type { Prisma, TechItem } from "@/src/generated/prisma/client";
import type { ProjectInclude } from "./project-includes";

type ProjectWithIncludes = Prisma.ProjectGetPayload<{
  include: ProjectInclude;
}>;

type TechItemWithDetails = Prisma.ProjectTechItemGetPayload<{
  include: { techItem: true };
}>;

function mapTechItems(techItems: TechItemWithDetails[]) {
  const frontend: TechItem[] = [];
  const backend: TechItem[] = [];

  for (const { category, order, techItem } of techItems) {
    //destruct and flatten Data
    const item = {
      id: techItem.id,
      order,
      name: techItem.name,
      slug: techItem.slug,
      isFrontend: techItem.isFrontend,
      isBackend: techItem.isBackend,
    };
    if (category === "frontend") frontend.push(item);
    else backend.push(item);
  }

  return { frontend, backend };
}

export function toProjectResponse(project: ProjectWithIncludes) {
  return {
    id: project.id,
    title: project.title,
    projectUrl: project.projectUrl,
    githubUrl: project.githubUrl,

    //Data Flattening
    tags: project.tags.map((t) => ({
      id: t.tag.id,
      name: t.tag.name,
      order: t.order,
    })),

    techStack: mapTechItems(project.techItems),

    //Data Flattening
    responsibilities: project.roles.map((r) => ({
      id: r.role.id,
      order: r.order,
      name: r.role.name,
    })),
    sections: project.sections.map((s) => ({
      id: s.id,
      order: s.order,
      title: s.title,
      layoutType: s.layoutType,
      contentTexts: s.contentTexts.map((t) => ({
        id: t.id,
        content: t.content,
      })),
      contentImages: s.contentImages.map((img) => ({
        id: img.id,
        alt: img.alt ?? "",
        url: img.url,
      })),
      contentVideos: s.contentVideos.map((v) => ({ id: v.id, url: v.url })),
    })),
  };
}
