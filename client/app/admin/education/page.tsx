import { educationService } from "@/lib/server/services/education.service";
import EducationSection from "./_components/EducationSection";
export const dynamic = "force-dynamic";

const AdminEducationPage = async () => {
  const educations = await educationService.getAllEducations();
  return (
    <div className="p-4">
      <EducationSection educations={educations} />
    </div>
  );
};

export default AdminEducationPage;
