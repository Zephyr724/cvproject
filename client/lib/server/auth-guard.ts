import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import { BusinessError } from "./errors";
import { projectService } from "./services/project.service";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new BusinessError("Unauthorized", 401);
  return session;
}

export async function requireProjectOwner(session: Session, projectId: number) {
  const project = await projectService.getProject(projectId);
  if (!project) throw new BusinessError("Project not found", 404);
  if (session.user.role !== "ADMIN" && project.ownerId !== session.user.id) {
    throw new BusinessError("Forbidden", 403);
  }
  return project;
}
