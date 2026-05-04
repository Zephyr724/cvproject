"use client";
import type { ValidateCreateProjectSchema } from "@/app/api/projects/schema";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import form from "react";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { projectData } from "@/app/projects/[id]/mockData";

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
  const { register, control, handleSubmit } =
    useForm<ValidateCreateProjectSchema>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-3 p-1"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/projects", data);
        // router.push("/projects");
      })}
    >
      <label>Project Title</label>
      <TextField.Root placeholder="Title" {...register("title")} />
      <TextField.Root placeholder="Tags" {...register("tags")} />
      <TextField.Root placeholder="ProjectUrl" {...register("projectUrl")} />
      <TextField.Root placeholder="GithubUrl" {...register("githubUrl")} />
      {/* <TextField.Root placeholder="Frontend" {...register("techItems.0.name")} />
      <TextField.Root placeholder="Backend" {...register("techItems.0.name")} /> */}
      <TextField.Root placeholder="Responsibilities" {...register("roles")} />
      <TextField.Root placeholder="Sections" {...register("sections")} />

      
      <Controller
        name="sections.0.contentTexts.0.content"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Project implementation" {...field} />
        )}
      />

      <Button>Submit New Project</Button>
    </form>
  );
};

export default NewProject;
