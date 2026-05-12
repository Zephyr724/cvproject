"use client";

import dynamic from "next/dynamic";
import {
  validateCreateProjectSchema,
  type ValidateCreateProjectType,
  type TechItem,
} from "@/app/api/projects/validationSchema";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import TagInput from "./TagInput";
import RoleInput from "./RoleInput";
import TechItemInput from "./TechItemInput";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import SectionInput from "./SectionInput";
import SectionEditor from "./SectionEditor";

interface NewProjectProps {
  register: UseFormRegister<ValidateCreateProjectType>;
  control: Control<ValidateCreateProjectType>;
  errors: FieldErrors<ValidateCreateProjectType>;
  onSubmit: (e: React.FormEvent) => void;
}

const NewProject = ({
  register,
  control,
  errors,
  onSubmit,
}: NewProjectProps) => {
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
      <form className="space-y-3 p-1" onSubmit={onSubmit}>
        <div>
          <label>Project Title</label>
          <TextField.Root placeholder="Title" {...register("title")} />
          <ErrorMessage> {errors.title?.message} </ErrorMessage>
        </div>

        <div>
          <label>Tags</label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagInput
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder="Input tag and press Enter to confirm"
              />
            )}
          />
          <ErrorMessage>{errors.tags?.message}</ErrorMessage>
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

        <Controller
          name="techItems"
          control={control}
          render={({ field }) => {
            const allItems: TechItem[] = field.value ?? [];
            const frontendItems = allItems.filter(
              (t) => t.category === "frontend",
            );
            const backendItems = allItems.filter(
              (t) => t.category === "backend",
            );

            return (
              <>
                <div>
                  <label>Frontend</label>
                  <TechItemInput
                    value={frontendItems}
                    category="frontend"
                    onChange={(newFrontend) => {
                      const merged = [
                        ...newFrontend,
                        ...backendItems.map((item, i) => ({
                          ...item,
                          order: newFrontend.length + i,
                        })),
                      ];
                      field.onChange(merged);
                    }}
                  />
                </div>

                <div>
                  <label>Backend</label>
                  <TechItemInput
                    value={backendItems.map((item, i) => ({
                      ...item,
                      order: i,
                    }))}
                    category="backend"
                    onChange={(newBackend) => {
                      const merged = [
                        ...frontendItems,
                        ...newBackend.map((item, i) => ({
                          ...item,
                          order: frontendItems.length + i,
                        })),
                      ];
                      field.onChange(merged);
                    }}
                  />
                </div>
              </>
            );
          }}
        />

        <div>
          <label>Responsibility</label>
          <Controller
            name="roles"
            control={control}
            render={({ field }) => (
              <RoleInput
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder="Input role and press Enter to confirm"
              />
            )}
          />
          <ErrorMessage>{errors.roles?.message}</ErrorMessage>
        </div>
        {/* <TextField.Root placeholder="Sections" {...register("sections")} /> */}

        <div className="flex flex-col gap-1">
          <label>Implementations</label>
          <Controller
            name="sections"
            control={control}
            render={({ field }) => {
              return (
                <SectionEditor
                  sections={field.value ?? []}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </div>

        {/* <div>
          <label>Sections</label>
          <Controller
            name="sections"
            control={control}
            render={({ field }) => (
              <SectionInput
                value={field.value ?? []}
                onChange={field.onChange}
              />
            )}
          />
          <ErrorMessage>{errors.sections?.message}</ErrorMessage>
        </div> */}

        <Button>Submit New Project</Button>
      </form>
    </div>
  );
};

export default NewProject;
