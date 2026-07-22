// experience.mapper.ts

import { Experience, Prisma } from "@/src/generated/prisma/client";
import { JSONContent } from "@tiptap/react";
import { exp } from "three/src/nodes/math/MathNode.js";

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
    startDate: experience.startDate.toISOString(),
    endDate: experience.endDate?.toISOString(),
    description: experience.description as JSONContent,
    techItems: experience.techItems.map((item) => item.techItem),
    userId: experience.userId,
  };
}
