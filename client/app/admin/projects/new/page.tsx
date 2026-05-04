"use client";
import ProjectDisplay from "@/app/components/ProjectDisplay";
import { projectData } from "@/app/projects/[id]/mockData";
import type { ValidateCreateProjectSchema } from "@/app/api/projects/schema";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import form from "react";
import { Button } from "@radix-ui/themes";

const adminProjectPage = () => {
  const INITIAL_FORM: ValidateCreateProjectSchema = {
    title: "",
    projectUrl: "",
    githubUrl: "",
    tags: [],
    techItems: [],
    roles: [],
    sections: [],
  };

  const [formData, setFormData] =
    useState<ValidateCreateProjectSchema>(INITIAL_FORM);
  const router = useRouter();

  const handleSubmit = () => {};

  return (
    <>
      <h1>New Projectpage</h1>
      <div className="flex flex-row">
        <div className="flex-1 overflow-auto max-h-[calc(100vh-2rem)] p-5">
          <ProjectDisplay project={projectData} showCloseButton={false} />
        </div>
        <div className="flex-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label>Project Title</label>
              <input className="input" name="query" />
              <Button>New Project</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default adminProjectPage;
