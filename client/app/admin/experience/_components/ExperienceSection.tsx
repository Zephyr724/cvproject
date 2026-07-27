"use client";

import { Button } from "@radix-ui/themes/components/index";
import ExperienceForm from "./ExperienceForm";
import { Experience } from "@/app/admin/experience/types";
import ExperienceCard from "@/app/components/ExperienceCard";
import { useState } from "react";
import experienceApiService from "@/lib/api/experience-api-service";
import { useRouter } from "next/navigation";

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    console.log("Test delete id get: ", id);
    
    try {
          const res = await experienceApiService.delete(id);
          if (res.status == 200) {
            console.log(res.data);
          } else {
            console.log("Have error");
          }
        } catch (error) {
          console.log("Have server error");
        }

    router.refresh();
  };

  return (
    <>
      <h1>Experience</h1>

      <div className="my-2">
        <Button color="green" onClick={() => setShowExperienceForm(true)}>
          New Experience
        </Button>
      </div>

      {showExperienceForm && (
        <ExperienceForm
          onCancel={() => setShowExperienceForm(false)}
          onSuccess={() => setShowExperienceForm(false)}
        />
      )}
      {experiences?.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          showActions={true}
          onDelete={() => handleDelete(experience.id)}
        />
      ))}
    </>
  );
}

export default ExperienceSection;
