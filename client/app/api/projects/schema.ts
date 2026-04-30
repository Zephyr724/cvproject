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

export const projectSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  tags: z.array(tagSchema).optional(),
  projectUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  responsibilities: z.array(roleSchema),
  techStack: z
    .object({
      frontend: z.array(techItemSchema).optional(),
      backend: z.array(techItemSchema).optional(),
    })
    .optional(),
  sections: z.array(sectionSchema).optional(),
});
