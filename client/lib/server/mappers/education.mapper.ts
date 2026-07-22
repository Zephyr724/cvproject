// education.mapper.ts
import { Education } from "@/src/generated/prisma/client";

function formatDate(date: Date | null): string | null {
  if (!date) return null;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function toApiResponse(education: Education) {
  return {
    id: education.id,
    degree: education.degree,
    institution: education.institution,
    startDate: formatDate(education.startDate),
    endDate: formatDate(education.endDate),
    description: education.description,
    userId: education.userId,
  };
}
