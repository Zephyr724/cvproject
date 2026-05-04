"use client";
import type { ValidateCreateProjectSchema } from "@/app/api/projects/schema";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import form from "react";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const INITIAL_FORM: ValidateCreateProjectSchema = {
  title: "",
  projectUrl: "",
  githubUrl: "",
  tags: [],
  techItems: [],
  roles: [],
  sections: [],
};

const NewProject = () => {
  const [formData, setFormData] =
    useState<ValidateCreateProjectSchema>(INITIAL_FORM);
  const router = useRouter();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //   handleSubmit();
        }}
      >
        <div className="max-w-xl space-y-3">
          <label>Project Title</label>
          <TextField.Root placeholder="Title">
            <TextField.Slot />
          </TextField.Root>
          <SimpleMDE placeholder="Project implementation" />
          <Button>Submit New Project</Button>
        </div>
      </form>
    </div>
  );
};

export default NewProject;
