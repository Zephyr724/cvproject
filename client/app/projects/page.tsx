import ProjectCard from "../components/ProjectCard";
import ProjectsListDisplay from "./_components/ProjectsListDisplay";
import { projectService } from "@/lib/server/services/project.service";

export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const projects = await projectService.getAllProjectsList();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-3 place-items-start p-3">
      {projects?.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};

export default ProjectsPage;
