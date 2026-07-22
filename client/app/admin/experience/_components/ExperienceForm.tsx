"use client";

import ExperienceFormContent from "./ExperienceFormContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  validateCreateExperienceSchema,
  ValidateCreateExperienceType,
} from "@/app/api/experiences/validationSchema";
import { Experience } from "../types";

import experienceApiService from "@/lib/api/experience-api-service";

interface ExperienceFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  experienceId?: number;
  experience?: Experience | null;
}

function toDateInputValue(date: string | null | undefined): string {
  if (!date) return "";

  return date.slice(0, 10);
}

function experienceToFormData(
  experience: Experience,
): ValidateCreateExperienceType {
  return {
    title: experience.title,
    company: experience.company,
    startDate: toDateInputValue(experience.startDate),
    endDate: toDateInputValue(experience.endDate),
    description: experience.description ?? null,
    techItems: experience.techItems.map((item, index) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      category: item.isFrontend ? "frontend" : "backend",
      order: index,
    })),
    isCurrentlyWorking: experience.endDate == null,
  };
}

const ExperienceForm = ({
  onCancel,
  experienceId,
  experience,
  onSuccess,
}: ExperienceFormProps) => {
  const router = useRouter();
  const isEdit = experienceId != null;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ValidateCreateExperienceType>({
    resolver: zodResolver(validateCreateExperienceSchema),
    values: experience
      ? experienceToFormData(experience)
      : {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: null,
          techItems: [],
          isCurrentlyWorking: false,
        },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      console.log("Editing experience with ID:", experienceId, "Data:", data);
      await experienceApiService.update(experienceId, data);
    } else {
      console.log("Creating new experience with data:", data);
      await experienceApiService.create(data);
    }

    onSuccess?.();
    router.refresh();
  });

  return (
    <>
      <ExperienceFormContent
        register={register}
        control={control}
        errors={errors}
        watch={watch}
        setValue={setValue}
        onSubmit={handleFormSubmit}
        isEdit={isEdit}
        onCancel={onCancel || (() => router.back())}
      />
    </>
  );
};

export default ExperienceForm;
