"use client";

import { outsideWallPosterApiService } from "@/lib/api/project-api-service";
import type { Project } from "@/app/projects/_components/types";
import z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useState } from "react";
import { useRouter } from "next/navigation";

const outsideWallPosterSchema = z
  .object({
    id: z.string(),
    outsideWallPosterUrl: z.url("Please enter a valid URL").or(z.literal("")),
  })
  // Empty slots are allowed; selecting a project requires a poster URL.
  .refine((poster) => poster.id === "" || poster.outsideWallPosterUrl !== "", {
    path: ["outsideWallPosterUrl"],
    message: "Please enter a poster URL",
  });

const outsideWallPosterFormSchema = z.object({
  posters: z.array(outsideWallPosterSchema).length(3),
});

type OutsideWallPosterFormData = z.infer<typeof outsideWallPosterFormSchema>;

interface OutsideWallPosterFormProps {
  projects: Project[];
}

export default function OutsideWallPosterForm({
  projects,
}: OutsideWallPosterFormProps) {
  // Keep all three slots in display order, including slots without a project.
  const defaultPosters: OutsideWallPosterFormData["posters"] = [1, 2, 3].map(
    (slot) => {
      const project = projects.find(
        (project) => project.outsideWallSlot === slot,
      );
      return {
        id: project ? String(project.id) : "",
        outsideWallPosterUrl: project?.outsideWallPosterUrl ?? "",
      };
    },
  );

  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();
  const [isSaveError, setIsSaveError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<OutsideWallPosterFormData>({
    resolver: zodResolver(outsideWallPosterFormSchema),
    defaultValues: { posters: defaultPosters },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      setSaveMessage("");
      setIsSaveError(false);

      // Convert zero-based form indexes to slot numbers before removing empty slots.
      const selectedPosters = data.posters
        .map((poster, index) => ({
          ...poster,
          outsideWallSlot: index + 1,
        }))
        .filter((poster) => poster.id !== "");

      // Submit one batch so the server can replace all slot assignments atomically.
      await outsideWallPosterApiService.put(selectedPosters);
      // Treat the saved values as the new baseline so the form is no longer dirty.
      reset(data);
      setSaveMessage("Settings saved.");
      // Refresh server-provided project data after all updates succeed.
      router.refresh();
      setIsSaveError(false);
    } catch {
      setIsSaveError(true);
      setSaveMessage("Saving failed. Please try again.");
    }
  });

  const handleProjectSelect = (
    targetProjectIndex: number,
    selectedProjectId: string,
  ) => {
    const posters = [...getValues("posters")];

    if (selectedProjectId === "") {
      // Clearing a slot also clears its poster URL in the form.
      posters[targetProjectIndex] = { id: "", outsideWallPosterUrl: "" };
    } else {
      const sourceProjectIndex = posters.findIndex(
        (poster) => poster.id === selectedProjectId,
      );
      if (sourceProjectIndex !== -1) {
        // Swap entire entries so each project keeps its URL and occupies only one slot.
        [posters[targetProjectIndex], posters[sourceProjectIndex]] = [
          posters[sourceProjectIndex],
          posters[targetProjectIndex],
        ];
      } else {
        // A newly selected project starts with its existing poster URL, if available.
        const project = projects.find(
          (project) => String(project.id) === selectedProjectId,
        );
        posters[targetProjectIndex] = {
          id: selectedProjectId,
          outsideWallPosterUrl: project?.outsideWallPosterUrl ?? "",
        };
      }
    }

    // Revalidate the updated slots and recalculate whether the form has changed.
    setValue("posters", posters, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <section className="rounded-md border border-base-300 bg-base-100 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Update Coffeeshop outside wall poster
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
              <div
                key={index + 1}
                className="flex flex-col gap-2 bg-gray-200 rounded p-2 "
              >
                <label className="flex items-center gap-3">
                  <span className="w-32 shrink-0">Project #{slot}:</span>

                  <select
                    className="select select-bordered select-sm w-[60%] justify-center text-lg"
                    disabled={isSubmitting}
                    {...register(`posters.${index}.id`)}
                    onChange={(event) =>
                      handleProjectSelect(index, event.target.value)
                    }
                  >
                    <option value="">None — leave this slot empty</option>

                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex gap-3 items-start  shrink-0">
                  OutsideWallPoster #{slot}:
                  <div className="w-[75%] min-w-0  max-w-3xl">
                    <TextField.Root
                      className="w-full"
                      placeholder="https://example.com/poster.jpg"
                      disabled={!selectedProject || isSubmitting}
                      {...register(`posters.${index}.outsideWallPosterUrl`)}
                    />
                    <ErrorMessage>
                      {errors.posters?.[index]?.outsideWallPosterUrl?.message}
                    </ErrorMessage>
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-end gap-2">
          {(!isDirty || isSaveError) && <p role="status">{saveMessage}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            form="new-project-form"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
