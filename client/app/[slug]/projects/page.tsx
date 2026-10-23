import { notFound } from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import { projectService } from "@/lib/server/services/project.service";
import SectionTitle from "@/app/about/_components/SectionTitle";
import ProjectCard from "@/app/components/ProjectCard";

interface ContactPageProps {
  params: {
    slug: string;
  };
  searchParams: Promise<{
    embed?: string;
  }>;
}

export default async function ContactPage({
  params,
  searchParams,
}: ContactPageProps) {
  const { slug } = await params;
  const { embed } = await searchParams;

  const isEmbedded = embed === "1";

  const profile = await profileService.getProfileBySlug(slug);
  if (!profile || !profile.isPublic) {
    notFound();
  }
  const userId = profile?.userId;

  // Load every portfolio section with the same owner ID so one public profile
  // can never display another user's content.
  const projects = await projectService.getProjectsByUserId(userId);

  return (
    <div className="w-full">
      <div>
        <SectionTitle title="Project" description="" color="neutral-content" />
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-3 place-items-start p-3">
          {projects?.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              embedded={isEmbedded}
              profileSlug={slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
