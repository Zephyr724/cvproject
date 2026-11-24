import { notFound } from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import { experienceService } from "@/lib/server/services/experience.service";
import SectionTitle from "@/app/about/_components/SectionTitle";
import ExperienceCard from "@/app/components/ExperienceCard";

interface ContactPageProps {
  params: {
    slug: string;
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { slug } = await params;

  const profile = await profileService.getProfileBySlug(slug);
  if (!profile || !profile.isPublic) {
    notFound();
  }

  const userId = profile?.userId;

  // Load every portfolio section with the same owner ID so one public profile
  // can never display another user's content.
  const experiences = await experienceService.getExperiencesByUserId(userId);

  return (
    <div className="pb-[70vh]">
      <SectionTitle
        title="Experience"
        description="Here are some of my work experiences."
      />
      {experiences?.map((experience) => (
        <div
          key={experience.id}
          id={`experience-${experience.id}`}
          className="scroll-mt-4"
        >
          <ExperienceCard experience={experience} />{" "}
        </div>
      ))}
    </div>
  );
}
