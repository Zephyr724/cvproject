import ProjectDisplay from "@/app/components/ProjectDisplay";
import { projectService } from "@/lib/server/services/project.service";

interface Props {
  params: Promise<{ id: string }>;
}

export const ProjectPage = async ({ params }: Props) => {
  const { id } = await params;

  const project = await projectService.getProject(parseInt(id));

  if (!project) {
    return <div> Project not found</div>;
  }

  return <ProjectDisplay project={project} />;
};

export default ProjectPage;
