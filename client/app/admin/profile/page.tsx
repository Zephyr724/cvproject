import { getServerSession } from "next-auth/next";
import ProfileForm from "./_components/ProfileForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import ResumeForm from "./_components/ResumeForm";
import OutsideWallPosterForm from "./_components/OutsideWallPosterForm";
import { projectService } from "@/lib/server/services/project.service";

export default async function AdminProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }
  const profile = await profileService.ensureProfile({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  const projects = await projectService.getProjectsByUserId(profile.userId);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      <section className="rounded-md border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Modify Profile</h1>
        <p className="mt-1 text-sm text-base-content/60">
          Modify the information shown on your public portfolio.
        </p>

        <ProfileForm profile={profile} />
      </section>

      <ResumeForm />
      <OutsideWallPosterForm projects={projects} />
    </div>
  );
}
