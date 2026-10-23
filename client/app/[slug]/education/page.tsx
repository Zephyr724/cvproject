import { notFound } from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import { educationService } from "@/lib/server/services/education.service";
import SectionTitle from "@/app/about/_components/SectionTitle";
import EducationCard from "@/app/components/EducationCard";

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
  const resume = profile?.user?.resume?.fileUrl;
  const userId = profile?.userId;

  // Load every portfolio section with the same owner ID so one public profile
  // can never display another user's content.
  const educations = await educationService.getEducationsByUserId(userId);

  return (
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
  );
}
