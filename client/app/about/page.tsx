import { experienceService } from "@/lib/server/services/experience.service";
import { educationService } from "@/lib/server/services/education.service";
import ExperienceCard from "@/app/components/ExperienceCard";
import EducationCard from "./_components/EducationCard";
import SectionTitle from "./_components/SectionTitle";
export const dynamic = "force-dynamic";

const AboutPage = async () => {
  const experiences = await experienceService.getAllExperiences();
  const educations = await educationService.getAllEducations();

  return (
    <div>
      <SectionTitle
        title="Experience"
        description="Here are some of my work experiences."
      />
      {experiences?.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}

      <br />

      <SectionTitle
        title="Education"
        description="Here are some of my educational achievements."
        color="neutral-content"
      />
      {/* {educations?.map((education) => (
        <EducationCard key={education.id} education={education} />
      ))} */}
    </div>
  );
};

export default AboutPage;
