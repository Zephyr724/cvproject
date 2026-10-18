import { z } from "zod";

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
});

export type ValidateCreateProfileType = z.infer<
  typeof validateCreateProfileSchema
>;

export const validateUpdateProfileSchema =
  validateCreateProfileSchema.partial();

export type ValidateUpdateProfileType = z.infer<
  typeof validateUpdateProfileSchema
>;
