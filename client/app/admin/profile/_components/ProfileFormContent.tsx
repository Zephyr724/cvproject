import dynamic from "next/dynamic";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { ValidateCreateProfileType } from "@/app/api/profiles/validationSchema";
import { Callout } from "@radix-ui/themes/components/index";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
interface ProfileFormContentProps {
  register: UseFormRegister<ValidateCreateProfileType>;
  control: Control<ValidateCreateProfileType>;
  errors: FieldErrors<ValidateCreateProfileType>;
  watch: UseFormWatch<ValidateCreateProfileType>;
  setValue: UseFormSetValue<ValidateCreateProfileType>;
  onSubmit: (e: React.FormEvent) => void;
  isEdit?: boolean;
  slug: string;
  email: string;
  website: string;
}

const ProfileFormContent = ({
  register,
  control,
  errors,
  watch,
  setValue,
  onSubmit,
  isEdit,
  slug,
  email,
  website,
}: ProfileFormContentProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-control">
          <span className="mb-2 text-sm font-medium">Display Name</span>

          <input
            type="text"
            {...register("displayName")}
            className="input input-bordered w-full rounded-md mt-2"
            placeholder="Display name"
          />

          {errors.displayName && (
            <span className="mt-1 text-sm text-error">
              {errors.displayName.message}
            </span>
          )}
        </label>

        <label className="form-control">
          <span className="mb-2 text-sm font-medium">Headline</span>

          <input
            type="text"
            {...register("headline")}
            className="input input-bordered w-full rounded-md mt-2"
            placeholder="Graduate Software Developer"
          />

          {errors.headline && (
            <span className="mt-1 text-sm text-error">
              {errors.headline.message}
            </span>
          )}
        </label>
      </div>

      <label className="form-control">
        <span className="mb-2 text-sm font-medium">Bio</span>

        <textarea
          {...register("bio")}
          className="textarea textarea-bordered min-h-32 w-full rounded-md mt-2 mb-2"
          placeholder="Write a short introduction about yourself..."
        />

        {errors.bio && (
          <span className="mt-1 text-sm text-error">{errors.bio.message}</span>
        )}
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-control">
          <span className="mb-2 text-sm font-medium">Contact Email</span>

          <input
            type="email"
            {...register("email")}
            className="input input-bordered w-full rounded-md mt-2"
            placeholder={email}
            disabled={true}
          />
        </label>

        <label className="form-control">
          <span className="mb-2 text-sm font-medium">LinkedIn</span>

          <input
            type="url"
            {...register("linkedin")}
            className="input input-bordered w-full rounded-md mt-2"
            placeholder="https://linkedin.com/in/..."
          />

          {errors.linkedin && (
            <span className="mt-1 text-sm text-error">
              {errors.linkedin.message}
            </span>
          )}
        </label>

        <label className="form-control">
          <span className="mb-2 text-sm font-medium">GitHub</span>

          <input
            type="url"
            {...register("github")}
            className="input input-bordered w-full rounded-md mt-2"
            placeholder="https://github.com/..."
          />

          {errors.github && (
            <span className="mt-1 text-sm text-error">
              {errors.github.message}
            </span>
          )}
        </label>
      </div>

      <div className="rounded-md border border-base-300 p-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isPublic")}
            className="checkbox checkbox-primary"
          />

          <span className="text-sm font-medium">Make my portfolio public</span>
        </label>

        <p className="mt-3 text-sm text-base-content/60">
          Your portfolio link:
          <span className="ml-1">{website}</span>
        </p>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileFormContent;
