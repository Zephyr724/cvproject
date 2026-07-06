import { Button } from "@radix-ui/themes";
import Link from "next/link";
import ProjectsListDisplay from "@/app/projects/_components/ProjectsListDisplay";
import { projectService } from "@/lib/server/services/project.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export const AdminProjectPage = async () => {
  const session = await getServerSession(authOptions);

  const projects = await projectService.getAccessibleProjectsList(session);

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
