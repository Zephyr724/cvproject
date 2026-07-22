"use client";

import { Button } from "@radix-ui/themes/components/index";
import ExperienceForm from "./ExperienceForm";
import { Experience } from "@/app/admin/experience/types";
import ExperienceCard from "@/app/components/ExperienceCard";
import { useState } from "react";
import experienceApiService from "@/lib/api/experience-api-service";
import { useRouter } from "next/navigation";

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const [showExperienceFormContent, setShowExperienceFormContent] =
    useState(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    console.log("Test delete id get: ", id);
    const res = await experienceApiService.delete(id);

    if (res.status == 200) {
      console.log(res.data);
    } else {
      console.log("Have error");
    }

    router.refresh();
  };

  return (
    <>
      <h1>Experience</h1>

      <div className="my-2">
        <Button
          color="green"
          onClick={() => setShowExperienceFormContent(true)}
        >
          New Experience
        </Button>
      </div>

      {showExperienceFormContent && (
        <ExperienceForm
          onCancel={() => setShowExperienceFormContent(false)}
          onSuccess={() => setShowExperienceFormContent(false)}
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
