import { getServerSession } from "next-auth";
import ProjectCard from "../components/ProjectCard";
import { projectService } from "@/lib/server/services/project.service";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const session = await getServerSession(authOptions);

  const projects =
    session?.user?.role === "ADMIN"
      ? await projectService.getAllProjectsList()
      : await projectService.getAllProjectsList(session?.user.id);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-3 place-items-start p-3">
      {projects?.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};

export default ProjectsPage;
