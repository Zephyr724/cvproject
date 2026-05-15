"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validateCreateProjectSchema,
  type ValidateCreateProjectType,
} from "@/app/api/projects/validationSchema";
import ProjectDisplay from "@/app/components/ProjectDisplay";
import NewProject from "./NewProject";
import axios from "axios";
import type {
  Project,
  Tag,
  TechItem,
  Role,
  Section,
} from "@/app/projects/_components/types";

function formDataToProject(data: Partial<ValidateCreateProjectType>): Project {
  const techItems = data.techItems ?? [];
  const frontendItems = techItems.filter((t) => t.category === "frontend");
  const backendItems = techItems.filter((t) => t.category === "backend");

  return {
    id: 0,
    title: data.title || "Untitled",
    projectUrl: data.projectUrl ?? "#",
    githubUrl: data.githubUrl ?? "#",
    tags: (data.tags ?? []).map((t, i) => ({
      id: t.id ?? i,
      name: t.name ?? "",
      order: t.order,
    })) as Tag[],
    techStack: {
      frontend: frontendItems.map((t, i) => ({
        id: t.id ?? i,
        name: t.name ?? "",
        slug: t.slug ?? "",
        order: i,
      })) as TechItem[],
      backend: backendItems.map((t, i) => ({
        id: t.id ?? i,
        name: t.name ?? "",
        slug: t.slug ?? "",
        order: i,
      })) as TechItem[],
    },
    responsibilities: (data.roles ?? []).map((r, i) => ({
      id: r.id ?? i,
      name: r.name ?? "",
      order: r.order,
    })) as Role[],
    sections: (data.sections ?? []).map((s, i) => ({
      id: s.order,
      ...s,
    })) as Section[],
  };
}

const NewProjectForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ValidateCreateProjectType>({
    resolver: zodResolver(validateCreateProjectSchema),
  });

  const formValues = watch();
  const liveProject = formDataToProject(formValues);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/projects", data);
    } catch {
      // ...
    }
  });

  return (
    <div className="flex flex-row flex-1">
      <div className="flex-1 overflow-auto  h-full p-5">
        <ProjectDisplay project={liveProject} showCloseButton={false} />
      </div>

      <div className="flex-1 overflow-auto">
        <NewProject
          register={register}
          control={control}
          errors={errors}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default NewProjectForm;
