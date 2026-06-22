// experience.mapper.ts

import { Experience } from "@/src/generated/prisma/client";

function formatDate(date: Date | null): string | null {
  if (!date) return null;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function toApiResponse(experience: Experience) {
  return {
    id: experience.id,
    title: experience.title,
    company: experience.company,
    startDate: formatDate(experience.startDate),
    endDate: formatDate(experience.endDate),
    description: experience.description,
  };
}
