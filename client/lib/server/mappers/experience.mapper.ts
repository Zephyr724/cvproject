// experience.mapper.ts

import { Experience, Prisma } from "@/src/generated/prisma/client";
import { JSONContent } from "@tiptap/react";

function formatDate(date: Date | null): string | null {
  if (!date) return null;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

type ExperienceWithTechItems = Prisma.ExperienceGetPayload<{
  include: {
    techItems: {
      include: {
        techItem: true;
      };
    };
  };
}>;

export function toApiResponse(experience: ExperienceWithTechItems) {
  return {
    id: experience.id,
    title: experience.title,
    company: experience.company,
    startDate: formatDate(experience.startDate),
    endDate: formatDate(experience.endDate),
    description: experience.description as JSONContent,
    techItems: experience.techItems.map((item) => item.techItem),
  };
}
