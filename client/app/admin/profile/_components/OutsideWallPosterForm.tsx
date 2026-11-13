"use client";

import { ValidateCreateProjectType } from "@/app/api/projects/validationSchema";
import projectApiService from "@/lib/api/project-api-service";
import type { Project } from "@/app/projects/_components/types";
import z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";

const outsideWallFormDataSchema = z
  .object({
    id: z.string(),
    outsideWallPosterUrl: z.url("Please enter a valid URL").optional(),
    outsideWallSlot: z.string().optional(),
  })
  .refine((poster) => poster.id === "" || poster.outsideWallPosterUrl !== "", {
    path: ["outsideWallPosterUrl"],
    message: "Please enter a poster URL",
  });

const postersFormDataSchema = z.object({
  posters: z.array(outsideWallFormDataSchema).length(3),
});

type OutsideWallsFormType = z.infer<typeof postersFormDataSchema>;

interface OutsideWallPosterParam {
  projects: Project[];
}

export default function OutsideWallPosterForm({
  projects,
}: OutsideWallPosterParam) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OutsideWallsFormType>({
    resolver: zodResolver(postersFormDataSchema),
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    console.log("data", data);

    const assignedProjects = projects.filter(
      (project) => project.outsideWallSlot !== null,
    );

    await Promise.all(
      assignedProjects.map((project) =>
        projectApiService.update(project.id, {
          outsideWallSlot: null,
        }),
      ),
    );

    await Promise.all(
      data.posters.map((poster, index) =>
        projectApiService.update<Partial<ValidateCreateProjectType>>(
          Number(poster.id),
          {
            outsideWallPosterUrl: poster.outsideWallPosterUrl,
            outsideWallSlot: Number(index + 1),
          },
        ),
      ),
    );
  });

  return (
    <section className="rounded-md border border-base-300 bg-base-100 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Update Coffeshop outside wall poster
      </h2>

      <p className="mt-1 text-sm text-base-content/60">
        Upload Poster URL. Uploading a new URL will replace the existing one.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={handleFormSubmit}
        id="new-project-form"
      >
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((slot, index) => {
            const selectedProject = watch(`posters.${index}.id`);
            return (
              <div key={index + 1}>
                <label className="flex items-center gap-3">
                  <span className="w-32 shrink-0">Project #{slot}:</span>

                  <select
                    className="select select-bordered select-sm w-[60%]"
                    defaultValue=""
                    {...register(`posters.${index}.id`)}
                  >
                    <option value="">Select a project first</option>

                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex gap-3 items-center  shrink-0">
                  OutsideWallPoster #{slot}:
                  <TextField.Root
                    placeholder="E.g., E-Commerce Platform"
                    disabled={!selectedProject}
                    {...register(`posters.${index}.outsideWallPosterUrl`)}
                  />
                  <ErrorMessage>
                    {errors.posters?.[index]?.outsideWallPosterUrl?.message}
                  </ErrorMessage>
                </label>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            form="new-project-form"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
}
