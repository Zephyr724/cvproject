"use client";

import { Button } from "@radix-ui/themes/components/index";
import NewExperienceForm from "./NewExperienceForm";
import Link from "next/link";
import { Experience } from "@/app/admin/about/types";
import ExperienceCard from "@/app/components/ExperienceCard";
import { useState } from "react";

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const [showNewExperienceForm, setShowNewExperienceForm] = useState(false);
  return (
    <>
      <h1>Experience</h1>

      <div className="my-2">
        <Button color="green" onClick={() => setShowNewExperienceForm(true)}>
          New Experience
        </Button>
      </div>

      {showNewExperienceForm && (
        <NewExperienceForm onCancel={() => setShowNewExperienceForm(false)} />
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
