import { notFound } from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import { experienceService } from "@/lib/server/services/experience.service";
import { educationService } from "@/lib/server/services/education.service";
import { projectService } from "@/lib/server/services/project.service";
import SectionTitle from "@/app/about/_components/SectionTitle";
import ExperienceCard from "@/app/components/ExperienceCard";
import EducationCard from "@/app/components/EducationCard";
import ProjectCard from "@/app/components/ProjectCard";
import ProfolioHeader from "@/app/_components/ProfileHeader";
import ContactForm from "../../_components/ContactForm";

interface ProfolioPageProps {
  params: {
    slug: string;
  };
}

export default async function OverviewPage({ params }: ProfolioPageProps) {
  const { slug } = await params;

  const profile = await profileService.getProfileBySlug(slug);
  if (!profile || !profile.isPublic) {
    notFound();
  }
  const resume = profile?.user?.resume?.fileUrl;
  const userId = profile?.userId;

  // Load every portfolio section with the same owner ID so one public profile
  // can never display another user's content.
  const [experiences, educations, projects] = await Promise.all([
    experienceService.getExperiencesByUserId(userId),
    educationService.getEducationsByUserId(userId),
    projectService.getProjectsByUserId(userId),
  ]);

  return (
    <div className="w-full">
      <main className="mx-auto max-w-7xl px-6">
        <ProfolioHeader profile={profile} resume={resume} />

        <div>
          <SectionTitle
            title="Experience"
            description="Here are some of my work experiences."
          />
          {experiences?.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        <div>
          <SectionTitle
            title="Education"
            description="Here are some of my educational achievements."
            color="neutral-content"
          />
          {educations?.map((education) => (
            <EducationCard key={education.id} education={education} />
          ))}
        </div>

        <div>
          <SectionTitle
            title="Project"
            description=""
            color="neutral-content"
          />
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-3 place-items-start p-3">
            {projects?.map((project) => (
              <ProjectCard project={project} key={project.id} profileSlug={slug} />
            ))}
          </div>
        </div>

        {profile.email ? (
          <ContactForm email={profile.email} profileSlug={slug} />
        ) : (
          <section className="mx-auto max-w-4xl py-20">
            <p>Currently unavailable</p>
          </section>
        )}
      </main>
    </div>
  );
}
