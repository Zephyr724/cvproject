"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Education } from "../types";
import educationApiService from "@/lib/api/education-api-service";
import {
  validateCreateEducationSchema,
  ValidateCreateEducationType,
} from "@/app/api/educations/validationSchema";
import EducationFormContent from "./EducationFormContent";

interface EducationFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  educationId?: number;
  education?: Education | null;
}

function toDateInputValue(date: string | null | undefined): string {
  if (!date) return "";

  return date.slice(0, 10);
}

function educationToFormData(
  education: Education,
): ValidateCreateEducationType {
  return {
    degree: education.degree,
    institution: education.institution,
    startDate: toDateInputValue(education.startDate),
    endDate: toDateInputValue(education.endDate),
    description: education.description ?? null,
    isCurrentlyStudying: education.endDate == null,
  };
}

const ExperienceForm = ({
  onCancel,
  educationId,
  education,
  onSuccess,
}: EducationFormProps) => {
  const router = useRouter();
  const isEdit = educationId != null;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ValidateCreateEducationType>({
    resolver: zodResolver(validateCreateEducationSchema),
    values: education
      ? educationToFormData(education)
      : {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
          description: null,
          isCurrentlyStudying: false,
        },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      console.log("Editing education with ID:", educationId, "Data:", data);
      await educationApiService.update(educationId, data);
    } else {
      console.log("Creating new education with data:", data);
      await educationApiService.create(data);
    }

    onSuccess?.();
    router.refresh();
  });

  return (
    <>
      <EducationFormContent
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
