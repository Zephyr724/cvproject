import { Button } from "@radix-ui/themes";
import Link from "next/link";
import ProjectsListDisplay from "@/app/projects/_components/ProjectsListDisplay";
import { projectService } from "@/lib/server/services/project.service";

export const dynamic = "force-dynamic";

export const AdminProjectPage = async () => {
  const projects = await projectService.getAllProjects();

  return (
    <div className="p-4">
      <Button asChild color="green">
        <Link href="/admin/projects/new">New Project</Link>
      </Button>

      <ProjectsListDisplay projects={projects} />
    </div>
  );
};

export default AdminProjectPage;
