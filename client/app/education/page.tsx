import { educationService } from "@/lib/server/services/education.service";
import EducationCard from "../components/EducationCard";
import SectionTitle from "../about/_components/SectionTitle";

export default async function EducationPage() {
  const educations = await educationService.getAllEducations();

  return (
    <div>
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
}
