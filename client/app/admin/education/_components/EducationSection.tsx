"use client";

import { useState } from "react";
import { Education } from "../types";
import { useRouter } from "next/navigation";
import { educationService } from "@/lib/server/services/education.service";
import educationApiService from "@/lib/api/education-api-service";
import { Button } from "@radix-ui/themes";
import EducationCard from "@/app/components/EducationCard";
import EducationForm from "../_components/EducationForm";

function EducationSection({ educations }: { educations: Education[] }) {
  const [showEducationForm, setShowEducationForm] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    console.log("Test delete id get: ", id);
    try {
      const res = await educationApiService.delete(id);
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
      <h1>Education</h1>

      <div className="my-2">
        <Button color="green" onClick={() => setShowEducationForm(true)}>
          New Education
        </Button>
      </div>

      {showEducationForm && (
        <EducationForm
          onCancel={() => setShowEducationForm(false)}
          onSuccess={() => setShowEducationForm(false)}
        />
      )}

      {educations?.map((education) => (
        <EducationCard
          key={education.id}
          education={education}
          showActions={true}
          onDelete={() => handleDelete(education.id)}
        />
      ))}
    </>
  );
}

export default EducationSection;
