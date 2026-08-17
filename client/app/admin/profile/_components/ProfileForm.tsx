"use client";

import {
  validateCreateProfileSchema,
  ValidateCreateProfileType,
} from "@/app/api/profiles/validationSchema";
import { Profile } from "@/src/generated/prisma/browser";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useRouter } from "next/dist/client/components/navigation";
import { useForm } from "react-hook-form";
import profileApiService from "@/lib/api/profile-api-service";
import ProfileFormContent from "./ProfileFormContent";

interface ProfileFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  profileId?: number;
  profile?: Profile | null;
}

function profileToFormData(profile: Profile): ValidateCreateProfileType {
  return {
    displayName: profile.displayName,
    headline: profile.headline ?? "",
    bio: profile.bio ?? "",
    email: profile.email ?? "",
    linkedin: profile.linkedin ?? "",
    github: profile.github ?? "",
    website: profile.website ?? "",
    isPublic: profile.isPublic,
  };
}

const ProfileForm = ({
  onCancel,
  profileId,
  profile,
  onSuccess,
}: ProfileFormProps) => {
  const router = useRouter();
  const isEdit = profileId != null;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ValidateCreateProfileType>({
    resolver: zodResolver(validateCreateProfileSchema),
    values: profile
      ? profileToFormData(profile)
      : {
          displayName: "",
          headline: "",
          bio: "",
          email: "",
          linkedin: "",
          github: "",
          website: "",
          isPublic: false,
        },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      console.log("Editing profile with ID:", profileId, "Data:", data);
      await profileApiService.update(profileId, data);
    } else {
      console.log("Creating new profile with data:", data);
      await profileApiService.create(data);
    }

    onSuccess?.();
    router.refresh();
  });

  return (
    <>
      <ProfileFormContent
        register={register}
        control={control}
        onSubmit={handleFormSubmit}
        watch={watch}
        setValue={setValue}
        errors={errors}
        slug={profile?.slug ?? ""}
      />
    </>
  );
};

export default ProfileForm;
