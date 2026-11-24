import { z } from "zod";

export const tagSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1).max(191).optional(),
    order: z.number(),
  })
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: "have to provide id or name",
  });

//Alias: responsibility
export const roleSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1).max(191).optional(),
    order: z.number(),
  })
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: "have to provide id or name",
  });

const TechCategory = z.enum(["frontend", "backend"]);

export const techItemSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1).max(191).optional(),
    slug: z.string().min(1).max(191).optional(),
    category: TechCategory,
    order: z.number(),
  })
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: "have to provide id or name",
  });

//define api request DTO (also used for Zod validation)
export const validateCreateProjectSchema = z.object({
  title: z.string().min(1),
  introduction: z.string().min(1).max(500),
  coverImageUrl: z.string(),
  outsideWallPosterUrl: z.string().optional(),
  outsideWallSlot: z.number().min(1).max(3).nullable().optional(),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  tags: z.array(tagSchema).optional(),
  techItems: z.array(techItemSchema).optional(),
  roles: z.array(roleSchema).optional(),
  content: z.any().optional(),
});

export type ValidateCreateProjectType = z.infer<
  typeof validateCreateProjectSchema
>;

// Normalize form-select IDs and validate the batch before it reaches the service.
export const validateUpdateOutsideWallPosterSchema = z.array(
  z.object({
    id: z.coerce.number().int().positive(),
    outsideWallPosterUrl: z.string().optional(),
    outsideWallSlot: z.number().min(1).max(3).nullable().optional(),
  }),
);

export type ValidateUpdateProjectType = z.infer<
  typeof validateUpdateOutsideWallPosterSchema
>;

export type TechItem = z.infer<typeof techItemSchema>;
