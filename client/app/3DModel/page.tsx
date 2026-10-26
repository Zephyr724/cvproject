import { ModelCanvas } from "./_components/ModelCanvas";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { profileService } from "@/lib/server/services/profile.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
      />
    </div>
  );
}
