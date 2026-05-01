import { z } from "zod";

export const tagSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
  order: z.number(),
});

//Alias: responsibility
export const roleSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  name: z.string().min(1).max(255),
});

export const techItemsSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
  category: z.enum(["frontend", "backend"]),
  order: z.number(),
});

export const techItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
  order: z.number(),
  slug: z.string().min(1),
});

export const contentTextSchema = z.object({
  id: z.number().optional(),
  content: z.string().optional(),
});

export const contentImagesSchema = z.object({
  id: z.number().optional(),
  alt: z.string().optional(),
  url: z.url().optional(),
});

export const contentVideosSchema = z.object({
  id: z.number().optional(),
  url: z.url().optional(),
});

export const layoutTypeEnum = z.enum([
  "imgTopTextBottom",
  "imgLeftTextRight",
  "imgRightTextLeft",
  "textTopImgMiddleTextBottom",
]);

export const sectionSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  title: z.string().min(1).max(255),
  layoutType: layoutTypeEnum,
  contentTexts: z.array(contentTextSchema),
  contentImages: z.array(contentImagesSchema),
  contentVideos: z.array(contentVideosSchema),
});

export const createProjectInputSchema = z.object({
  title: z.string().min(1),
  tags: z.array(tagSchema).optional(),
  projectUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  techStack: z.object({
    frontend: z.array(techItemsSchema).optional(),
    backend: z.array(techItemsSchema).optional(),
  }),

  responsibilities: z.array(roleSchema),
  sections: z.array(sectionSchema).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;
