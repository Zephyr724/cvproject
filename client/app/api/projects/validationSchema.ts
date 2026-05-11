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

export const contentTextSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
});

export const contentImagesSchema = z.object({
  id: z.number().optional(),
  url: z.string(),
  alt: z.string().max(191).optional(),
});

export const contentVideosSchema = z.object({
  id: z.number().optional(),
  url: z.string(),
});

export const layoutTypeEnum = z.enum([
  "imgTopTextBottom",
  "imgLeftTextRight",
  "imgRightTextLeft",
  "textTopImgMiddleTextBottom",
]);

export const sectionSchema = z.object({
  id: z.number().optional(),
  order: z.number().optional(),
  title: z.string().min(1).max(191),
  layoutType: layoutTypeEnum,
  contentTexts: z.array(contentTextSchema).optional(),
  contentImages: z.array(contentImagesSchema).optional(),
  contentVideos: z.array(contentVideosSchema).optional(),
});

//define api request DTO (also used for Zod validation)
export const validateCreateProjectSchema = z.object({
  title: z.string().min(1),
  projectUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  tags: z.array(tagSchema).optional(),
  techItems: z.array(techItemSchema).optional(),
  roles: z.array(roleSchema).optional(),
  sections: z.array(sectionSchema).optional(),
});

export type ValidateCreateProjectType = z.infer<
  typeof validateCreateProjectSchema
>;

export type TechItem = z.infer<typeof techItemSchema>;

export type Section = z.infer<typeof sectionSchema>;
