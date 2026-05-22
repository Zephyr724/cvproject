import { Button } from "@radix-ui/themes";
import Link from "next/link";
import ProjectsListDisplay from "@/app/projects/_components/ProjectsListDisplay";
import { projectService } from "@/lib/server/services/project.service";

const AdminProjectPage = async () => {
  const projects = await projectService.getAllProjects();

  return (
    <div>
      <div>AdminProjectPage</div>
      <h1>My Projects</h1>

      <ProjectsListDisplay projects={projects} />

      <Button asChild color="green">
        <Link href="/admin/projects/new" color="green">
          New Project
        </Link>
      </Button>
    </div>
  );
};

export default AdminProjectPage;
