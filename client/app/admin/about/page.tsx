import { experienceService } from "@/lib/server/services/experience.service";
import { educationService } from "@/lib/server/services/education.service";
import NewExperienceForm from "./_components/NewExperienceForm";
import { Button } from "@radix-ui/themes/components/index";

import Link from "next/link";
import ExperienceSection from "./_components/ExperienceSection";
export const dynamic = "force-dynamic";

const AdminAboutPage = async () => {
  const experiences = await experienceService.getAllExperiences();
  const educations = await educationService.getAllEducations();
  return (
    <div className="p-4">
      <ExperienceSection experiences={experiences} />

      <div className="divider"></div>

      <h1>Education</h1>
      <Button asChild color="green">
        <Link href="">New Education</Link>
      </Button>

      {/* {educations?.map((education) => (
        <div
          tabIndex={0}
          className="collapse collapse-arrow bg-base-100 border-base-300 border mb-3"
        >
          <div className="collapse-title font-semibold">
            {education.degree} - {education.institution}
          </div>
          <div className="collapse-content text-sm">
            <ul>
              <li>Start Date: {education.startDate}</li>
              <li>End Date: {education.endDate || "Present"}</li>
              <li>Description:</li>
              <ul className="list-disc list-inside">
                {education.description?.split("\n").map((line, index) => (
                  <li key={index} className="text-md">
                    {line.replace(/^- /, "")}
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default AdminAboutPage;
