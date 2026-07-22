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
  onSave?: () => void;
  onCancel?: () => void;
  experienceId?: number;
  experience?: Experience | null;
}

const ExperienceForm = ({
  onCancel,
  experienceId,
  experience,
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
    // values: experience ? experience : undefined,
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      console.log("Editing experience with ID:", experienceId, "Data:", data);
      await experienceApiService.update(experienceId!, data);
    } else {
      console.log("Creating new experience with data:", data);
      await experienceApiService.create(data);
    }

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
