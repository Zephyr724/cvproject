import { experienceService } from "@/lib/server/services/experience.service";
import { educationService } from "@/lib/server/services/education.service";
import ExperienceCard from "@/app/components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import SectionTitle from "./_components/SectionTitle";
export const dynamic = "force-dynamic";

const AboutPage = async () => {
  const experiences = await experienceService.getAllExperiences();
  const educations = await educationService.getAllEducations();

  return (
    <div>
      <section id="experience">
        <SectionTitle
          title="Experience"
          description="Here are some of my work experiences."
        />
        {experiences?.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}

        <br />
      </section>

      <section id="education" className="min-h-screen">
        <SectionTitle
          title="Education"
          description="Here are some of my educational achievements."
          color="neutral-content"
        />
        {educations?.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
