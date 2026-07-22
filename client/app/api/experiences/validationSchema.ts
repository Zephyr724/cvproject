import { z } from "zod";

const techItemSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1).max(191).optional(),
    slug: z.string().min(1).max(191).optional(),
    category: z.enum(["frontend", "backend"]),
    order: z.number(),
  })
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: "have to provide id or name",
  });

export const validateCreateExperienceSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.any().optional(),
  techItems: z.array(techItemSchema).optional(),
  isCurrentlyWorking: z.boolean(),
});

export type ValidateCreateExperienceType = z.infer<
  typeof validateCreateExperienceSchema
>;

export type TechItem = z.infer<typeof techItemSchema>;
