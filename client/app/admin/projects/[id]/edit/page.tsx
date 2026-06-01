import NewProjectForm from "@/app/admin/_components/NewProjectForm";
import { projectService } from "@/lib/server/services/project.service";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

const ProjectDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const idNumber = parseInt(id);

  const project = await projectService.getProject(idNumber);

  if (!project) notFound();

  return (
    <div className="h-screen flex flex-col">
      <h1>New Projectpage</h1>
      <NewProjectForm projectId={idNumber} project={project} />
    </div>
  );
};

export default ProjectDetailPage;
