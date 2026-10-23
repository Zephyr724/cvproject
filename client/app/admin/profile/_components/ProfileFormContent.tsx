import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { ValidateCreateProfileType } from "@/app/api/profiles/validationSchema";
interface ProfileFormContentProps {
  register: UseFormRegister<ValidateCreateProfileType>;
  errors: FieldErrors<ValidateCreateProfileType>;
  watch: UseFormWatch<ValidateCreateProfileType>;
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  website: string;
}

const ProfileFormContent = ({
  register,
  errors,
  watch,
  onSubmit,
  email,
  website,
}: ProfileFormContentProps) => {
  const slugValue = watch("slug");

  let portfolioOrigin = "";

  try {
    portfolioOrigin = website ? new URL(website).origin : "";
  } catch {
    portfolioOrigin = "";
  }

  const previewUrl = portfolioOrigin
    ? `${portfolioOrigin}/${slugValue}`
    : `/${slugValue}`;
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

      <div className="rounded-xl border border-base-300 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Public portfolio</h3>
            <p className="mt-1 text-sm text-base-content/60">
              Allow anyone with the link to view your portfolio.
            </p>
          </div>

          <input
            type="checkbox"
            {...register("isPublic")}
            className="toggle toggle-primary"
            aria-label="Make portfolio public"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="profile-slug" className="text-sm font-semibold">
            Portfolio address
          </label>

          <div className="mt-2 flex overflow-hidden rounded-lg border border-base-300 focus-within:border-primary">
            {portfolioOrigin && (
              <span className="flex items-center bg-base-200 px-3 text-sm text-base-content/60">
                {portfolioOrigin}/
              </span>
            )}

            <input
              id="profile-slug"
              type="text"
              {...register("slug")}
              className="min-w-0 flex-1 bg-base-100 px-3 py-3 outline-none"
              placeholder="zephyr-chen"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          {errors.slug ? (
            <p role="alert" className="mt-2 text-sm text-error">
              {errors.slug.message}
            </p>
          ) : (
            <p className="mt-2 text-sm text-base-content/60">
              Use lowercase letters, numbers, and hyphens.
            </p>
          )}

          {errors.root?.server?.message && (
            <p role="alert" className="mt-2 text-sm text-error">
              {errors.root.server.message}
            </p>
          )}

          {slugValue && (
            <p className="mt-4 text-sm">
              Preview:{" "}
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="link link-primary break-all"
              >
                {previewUrl}
              </a>
            </p>
          )}
        </div>
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
