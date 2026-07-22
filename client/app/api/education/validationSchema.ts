import { z } from "zod";

export const validateCreateEducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.any().optional(),
});

export type ValidateCreateEducationType = z.infer<
  typeof validateCreateEducationSchema
>;

export const validateUpdateEducationSchema =
  validateCreateEducationSchema.partial();

export type ValidateUpdateEducationType = z.infer<
  typeof validateCreateEducationSchema
>;
