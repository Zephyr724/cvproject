"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validateCreateProjectSchema,
  type ValidateCreateProjectType,
} from "@/app/api/projects/validationSchema";
import ProjectDisplay from "@/app/components/ProjectDisplay";
import NewProject from "./NewProject";
import projectApiService from "@/lib/api/project-api-service";
import type {
  Project,
  Tag,
  TechItem,
  Role,
  Section,
  LayoutType,
} from "@/app/projects/_components/types";
import { Spinner } from "@radix-ui/themes";
import useFetchProjectById from "@/hooks/useFetchProjectById";

interface Props {
  projectId?: number;
}

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

function projectToFormData(project: Project): ValidateCreateProjectType {
  return {
    title: project.title,
    projectUrl: project.projectUrl,
    githubUrl: project.githubUrl,
    tags: project.tags.map((t, i) => ({ ...t, order: t.order ?? i })),
    techItems: [
      ...project.techStack.frontend.map((t) => ({
        ...t,
        category: "frontend" as const,
        order: t.order ?? 0,
      })),
      ...project.techStack.backend.map((t) => ({
        ...t,
        category: "backend" as const,
        order: t.order ?? 0,
      })),
    ],
    roles: project.responsibilities.map((r, i) => ({
      ...r,
      order: r.order ?? i,
    })),
    sections: project.sections.map((s) => ({
      ...s,
      layoutType: s.layoutType as LayoutType,
    })),
  };
}

const NewProjectForm = ({ projectId }: Props) => {
  const { project, setProject, error, setError, isLoading } =
    useFetchProjectById(projectId);

  const isEdit = projectId != null; //tell the component is edit mode or not

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ValidateCreateProjectType>({
    resolver: zodResolver(validateCreateProjectSchema),
    values: project ? projectToFormData(project) : undefined,
  });

  const formValues = watch();
  const liveProject = formDataToProject(formValues);

  const handleFormSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      projectApiService
        .update<ValidateCreateProjectType>(1, data)
        .catch((err) => {
          setError(err.message);
        });
    } else {
      projectApiService.create<ValidateCreateProjectType>(data).catch((err) => {
        setError(err.message);
      });
    }
  });

  return (
    <div className="flex flex-row flex-1">
      <div className="flex-1 overflow-auto  h-full p-5">
        {error && <p className="text-red-500">{error}</p>}
        {isLoading && <Spinner />}
        <ProjectDisplay project={liveProject} showCloseButton={false} />
      </div>

      <div className="flex-1 overflow-auto">
        <NewProject
          register={register}
          control={control}
          errors={errors}
          onSubmit={handleFormSubmit}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
};

export default NewProjectForm;
