import ProjectsListDisplay from "./_components/ProjectsListDisplay";
import { projectService } from "@/lib/server/services/project.service";

const ProjectsPage = async () => {
  const projects = await projectService.getAllProjects();

  return (
    <div>
      <ProjectsListDisplay projects={projects} />
    </div>
  );
};

export default ProjectsPage;
