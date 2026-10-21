import { z } from "zod";

export const contactRequestSchema = z
  .object({
    profileSlug: z
      .string()
      .trim()
      .min(1, "Profile slug is required")
      .max(120, "Profile slug is too long"),

    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name is too long"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(254, "Email address is too long"),

    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(5000, "Message is too long"),
  })
  .strict();

export type ContactRequest = z.infer<typeof contactRequestSchema>;
