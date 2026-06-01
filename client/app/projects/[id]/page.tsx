import { Project } from "../_components/types";
import ProjectDisplay from "@/app/components/ProjectDisplay";

interface Props {
  params: Promise<{ id: string }>;
}

export const ProjectPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`,
  );

  if (!res.ok) {
    return <div> Project not found</div>;
  }

  const project = (await res.json()) as Project;

  return <ProjectDisplay project={project} />;
};

export default ProjectPage;
