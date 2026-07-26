import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import { BusinessError } from "./errors";
import { projectService } from "./services/project.service";
import experienceApiService from "../api/experience-api-service";
import { experienceService } from "./services/experience.service";
import { educationService } from "./services/education.service";

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

export async function requireExperienceOwner(
  session: Session,
  experienceId: number,
) {
  const experience = await experienceService.getExperienceById(experienceId);
  if (!experience) throw new BusinessError("Experience not found", 404);
  if (session.user.role !== "ADMIN" && experience.userId !== session.user.id) {
    throw new BusinessError("Forbidden", 403);
  }
  return experience;
}

export async function requireEducationOwner(
  session: Session,
  educationId: number,
) {
  const experience = await educationService.getEducationById(educationId);
  if (!experience) throw new BusinessError("Education not found", 404);
  if (session.user.role !== "ADMIN" && experience.userId !== session.user.id) {
    throw new BusinessError("Forbidden", 403);
  }
  return experience;
}
