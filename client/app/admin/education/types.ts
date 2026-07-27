import { JSONContent } from "@tiptap/react";

export interface Education {
  id: number;
  degree: string;
  institution: string;
  startDate: string | null;
  endDate?: string | null;
  description: JSONContent | null;
  userId: string;
}
