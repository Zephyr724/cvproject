import { experienceService } from "@/lib/server/services/experience.service";
import ExperienceCard from "../components/ExperienceCard";
import SectionTitle from "../about/_components/SectionTitle";

export default async function ExperiencePage() {
  const experiences = await experienceService.getAllExperiences();
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
    </div>
  );
}
