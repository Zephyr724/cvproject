"use client";

import { Button } from "@radix-ui/themes/components/index";
import ExperienceFormContent from "./ExperienceForm";
import Link from "next/link";
import { Experience } from "@/app/admin/about/types";
import ExperienceCard from "@/app/components/ExperienceCard";
import { useState } from "react";

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const [showExperienceFormContent, setShowExperienceFormContent] =
    useState(false);
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
        <ExperienceFormContent
          onCancel={() => setShowExperienceFormContent(false)}
        />
      )}
      {experiences?.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          showActions={true}
        />
      ))}
    </>
  );
}

export default ExperienceSection;
