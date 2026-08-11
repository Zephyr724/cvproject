import { z } from "zod";

export const validateContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type ValidateContactFormData = z.infer<typeof validateContactFormSchema>;
