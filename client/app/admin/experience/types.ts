import { JSONContent } from "@tiptap/react";

type TechItem = {
  id: number;
  name: string;
  slug: string;
  isFrontend: boolean;
  isBackend: boolean;
};

export interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string | null;
  endDate?: string | null;
  description: JSONContent | null;
  techItems: TechItem[];
  userId: string;
}
