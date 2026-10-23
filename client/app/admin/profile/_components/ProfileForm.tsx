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
import { useSession } from "next-auth/react";
import axios from "axios";

interface ProfileFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  profile?: Profile | null;
}

function profileToFormData(profile: Profile): ValidateCreateProfileType {
  return {
    displayName: profile.displayName,
    slug: profile.slug,
    headline: profile.headline ?? "",
    bio: profile.bio ?? "",
    email: profile.email ?? "",
    linkedin: profile.linkedin ?? "",
    github: profile.github ?? "",
    website: profile.website ?? "",
    isPublic: profile.isPublic,
  };
}

const ProfileForm = ({ profile, onSuccess }: ProfileFormProps) => {
  const router = useRouter();

  const { data: session } = useSession();
  const email = session?.user?.email || "";

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ValidateCreateProfileType>({
    resolver: zodResolver(validateCreateProfileSchema),
    values: profile
      ? profileToFormData(profile)
      : {
          displayName: "",
          slug: "",
          headline: "",
          bio: "",
          email: email,
          linkedin: "",
          github: "",
          website: "",
          isPublic: false,
        },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    // Remove errors from the previous submission before trying again.
    clearErrors();

    try {
      await profileApiService.updateCurrent(data);

      onSuccess?.();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError<{ error?: string }>(error)) {
        const message =
          error.response?.data?.error || "Unable to update profile.";

        if (error.response?.status === 409) {
          // A slug conflict belongs to the slug field so the message appears
          // beside the value the user needs to change.
          setError(
            "slug",
            {
              type: "server",
              message,
            },
            {
              shouldFocus: true,
            },
          );

          return;
        }

        setError("root.server", {
          type: "server",
          message,
        });

        return;
      }

      setError("root.server", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  });

  return (
    <>
      <ProfileFormContent
        register={register}
        onSubmit={handleFormSubmit}
        watch={watch}
        errors={errors}
        email={email}
        website={profile?.website ?? ""}
      />
    </>
  );
};

export default ProfileForm;
