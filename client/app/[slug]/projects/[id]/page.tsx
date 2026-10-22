import ProjectDisplay from "@/app/components/ProjectDisplay";
import { profileService } from "@/lib/server/services/profile.service";
import { projectService } from "@/lib/server/services/project.service";
import { notFound } from "next/navigation";

interface PublicProjectPageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
  searchParams: Promise<{
    embed?: string;
  }>;
}

export default async function PublicProjectPage({
  params,
  searchParams,
}: PublicProjectPageProps) {
  const { slug, id } = await params;
  const { embed } = await searchParams;
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    notFound();
  }

  const profile = await profileService.getProfileBySlug(slug);

  if (!profile?.isPublic) {
    notFound();
  }

  const project = await projectService.getProjectByOwnerId(
    projectId,
    profile.userId,
  );

  if (!project) {
    notFound();
  }

  const projectsHref = `/${encodeURIComponent(slug)}/projects`;
  const closeHref = embed === "1" ? `${projectsHref}?embed=1` : projectsHref;

  return <ProjectDisplay project={project} closeHref={closeHref} />;
}
