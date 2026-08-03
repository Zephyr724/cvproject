import notFound from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import { experienceService } from "@/lib/server/services/experience.service";
import { educationService } from "@/lib/server/services/education.service";
import { projectService } from "@/lib/server/services/project.service";
import SectionTitle from "@/app/about/_components/SectionTitle";
import ExperienceCard from "@/app/components/ExperienceCard";
import EducationCard from "@/app/components/EducationCard";
import ProjectCard from "@/app/components/ProjectCard";
import { Button } from "@radix-ui/themes";
import { FaGithub, FaLinkedin, FaRegFile } from "react-icons/fa";
import ProfolioHeader from "@/app/_components/ProfileHeader";
import ContactForm from "../_components/ContactForm";

interface ProfolioPageProps {
  params: {
    slug: string;
  };
}

export default async function ProfolioPage({ params }: ProfolioPageProps) {
  const { slug } = await params;

  const profile = await profileService.getProfileBySlug(slug);
  if (!profile || !profile.isPublic) {
    return (
      <div>
        <h1>Profile Not Found</h1>
      </div>
    );
  }
  const resume = profile?.user?.resume?.fileUrl;

  // Later add project
  const [experiences, educations] = await Promise.all([
    experienceService.getAllExperiences(),
    educationService.getAllEducations(),
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
            title="Project"
            description=""
            color="neutral-content"
          />
          {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-3 place-items-start p-3">
            {projects?.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div> */}
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
          <ContactForm email={profile.email || ""} />
        </div>
      </main>
    </div>
  );
}
