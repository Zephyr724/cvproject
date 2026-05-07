"use client";

import dynamic from "next/dynamic";
import {
  validateCreateProjectSchema,
  type ValidateCreateProjectType,
} from "@/app/api/projects/validationSchema";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";

const NewProject = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateCreateProjectType>({
    resolver: zodResolver(validateCreateProjectSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded" />,
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3 p-1"
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
        <div>
          <TextField.Root placeholder="Title" {...register("title")} />
          <ErrorMessage> {errors.title?.message} </ErrorMessage>
        </div>

        <div>
          <TextField.Root placeholder="Tags" {...register("tags")} />
          <ErrorMessage> {errors.tags?.message} </ErrorMessage>
        </div>

        <div>
          <TextField.Root
            placeholder="ProjectUrl"
            {...register("projectUrl")}
          />
          <ErrorMessage>{errors.projectUrl?.message} </ErrorMessage>
        </div>

        <div>
          <TextField.Root placeholder="GithubUrl" {...register("githubUrl")} />
          <ErrorMessage> {errors.githubUrl?.message} </ErrorMessage>
        </div>
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
