import { experienceService } from "@/lib/server/services/experience.service";
import { ModelCanvas } from "./_components/ModelCanvas";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { profileService } from "@/lib/server/services/profile.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import projectApiService from "@/lib/api/project-api-service";
import { projectService } from "@/lib/server/services/project.service";

export default async function ModelPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const profile = await profileService.ensureProfile({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  const experiences = await experienceService.getExperiencesByUserId(
    profile.userId,
  );

  const projects = await projectService.getProjectsByUserId(profile.userId);

  return (
    <div>
      <h3>3D Model</h3>
      <ModelCanvas
        profile={{
          slug: profile.slug,
          github: profile.github,
          linkedin: profile.linkedin,
          resumeUrl: profile?.user?.resume?.fileUrl ?? null,
        }}
        experiences={experiences}
        projects={projects}
      />
    </div>
  );
}
