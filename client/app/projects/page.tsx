import ProjectCard from "../components/ProjectCard";
import ProjectsListDisplay from "./_components/ProjectsListDisplay";
import { projectService } from "@/lib/server/services/project.service";

const ProjectsPage = async () => {
  const projects = await projectService.getAllProjects();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-3 place-items-center p-3">
      {projects?.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};

export default ProjectsPage;
