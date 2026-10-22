import { z } from "zod";

// These names already belong to application routes and cannot identify a
// public profile at the root of the site.
const RESERVED_PROFILE_SLUGS = new Set([
  "about",
  "admin",
  "api",
  "education",
  "experience",
  "projects",
  "3dmodel",
  "test-tiptap",
]);

export const validateCreateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(100, "Display name is too long"),

  headline: z
    .string()
    .max(150, "Headline is too long")
    .optional()
    .or(z.literal("")),

  bio: z.string().max(1000, "Bio is too long").optional().or(z.literal("")),

  isPublic: z.boolean(),

  linkedin: z
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),

  github: z.url("Please enter a valid GitHub URL").optional().or(z.literal("")),

  email: z
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  website: z
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),

  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(60, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only",
    )
    .refine(
      (slug) => !RESERVED_PROFILE_SLUGS.has(slug),
      "This portfolio URL is reserved",
    ),
});

export type ValidateCreateProfileType = z.infer<
  typeof validateCreateProfileSchema
>;

export const validateUpdateProfileSchema =
  validateCreateProfileSchema.partial();

export type ValidateUpdateProfileType = z.infer<
  typeof validateUpdateProfileSchema
>;
