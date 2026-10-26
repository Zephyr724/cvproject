import { notFound } from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import { ModelCanvas } from "../3DModel/_components/ModelCanvas";
import { experienceService } from "@/lib/server/services/experience.service";

interface ModelPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { slug } = await params;

  const profile = await profileService.getProfileBySlug(slug);

  if (!profile || !profile.isPublic) {
    notFound();
  }

  const experiences = await experienceService.getExperiencesByUserId(
    profile.userId,
  );

  return (
    <ModelCanvas
      profile={{
        slug,
        github: profile.github,
        linkedin: profile.linkedin,
        resumeUrl: profile?.user?.resume?.fileUrl ?? null,
      }}
      experiences={experiences}
    />
  );
}
