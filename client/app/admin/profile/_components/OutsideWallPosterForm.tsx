"use client";

import { ValidateCreateProjectType } from "@/app/api/projects/validationSchema";
import projectApiService from "@/lib/api/project-api-service";
import type { Project } from "@/app/projects/_components/types";
import z from "zod";

interface OutsideWallPosterParam {
  projects: Project[];
}

const outsideWallSchema = z
  .array(z.url("Please enter a valid URL").or(z.literal("")))
  .length(3);

const projectIdsSchema = z
  .array(z.string().regex(/^\d+$/, "Please select a project").or(z.literal("")))
  .length(3);

export default function OutsideWallPosterForm({
  projects,
}: OutsideWallPosterParam) {
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const projectIdsResult = projectIdsSchema.safeParse(
      formData.getAll("projectIds"),
    );

    const postersResult = outsideWallSchema.safeParse(
      formData.getAll("outsideWallPosters"),
    );

    if (!projectIdsResult.success) {
      console.log(projectIdsResult.error.issues);
      return;
    }

    if (!postersResult.success) {
      console.log(postersResult.error.issues);
      return;
    }

    const projectIds = projectIdsResult.data.map(
      (projectId) => projectId || null,
    );

    const posters = postersResult.data.map((url) => url || null);

    for (let index = 0; index < posters.length; index++) {
      const projectId = projectIds[index];
      const posterUrl = posters[index];

      await projectApiService.update<Partial<ValidateCreateProjectType>>(
        Number(projectId),
        {
          outsideWallPosterUrl: posterUrl || undefined,
          outsideWallSlot: index + 1,
        },
      );
    }

    console.log(posters);
  }
  return (
    <section className="rounded-md border border-base-300 bg-base-100 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Update Coffeshop outside wall poster
      </h2>

      <p className="mt-1 text-sm text-base-content/60">
        Upload Poster URL. Uploading a new URL will replace the existing one.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((slot) => (
            <div key={slot}>
              <label className="flex items-center gap-3">
                <span className="w-32 shrink-0">Project #{slot}:</span>

                <select
                  name="projectIds"
                  className="select select-bordered select-sm w-[60%]"
                  defaultValue=""
                >
                  <option value="">Select a project</option>

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex gap-3 items-center  shrink-0">
                OutsideWallPoster #{slot}:
                <input
                  className="file-input file-input-bordered border-2 w-[60%] file-input-sm pl-4  placeholder:text-gray-500 "
                  name="outsideWallPosters"
                  type="url"
                  placeholder="URL only."
                />
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </section>
  );
}
