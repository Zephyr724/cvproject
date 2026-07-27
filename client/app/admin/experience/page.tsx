import { experienceService } from "@/lib/server/services/experience.service";
import { educationService } from "@/lib/server/services/education.service";
import ExperienceSection from "./_components/ExperienceSection";
export const dynamic = "force-dynamic";

const AdminExperiencePage = async () => {
  const experiences = await experienceService.getAllExperiences();
  return (
    <div className="p-4">
      <ExperienceSection experiences={experiences} />
    </div>
  );
};

export default AdminExperiencePage;
