"use client";
import type { ValidateCreateProjectSchema } from "@/app/api/projects/schema";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import form from "react";
import { Button, Callout, TextField } from "@radix-ui/themes";
import Link from "next/link";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { projectData } from "@/app/projects/[id]/mockData";
import { IoCalculatorOutline } from "react-icons/io5";

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
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3 p-1"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/projects", data);
            // router.push("/projects");
          } catch (error) {
            setError("A unexpected error occurred.");
          }
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
    </div>
  );
};

export default NewProject;
