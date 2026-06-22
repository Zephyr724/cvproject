import { experienceRepository } from "@/lib/server/repositories/experience.repository";
import { toApiResponse } from "@/lib/server/mappers/experience.mapper";

export const experienceService = {
  async getAllExperiences() {
    const experiences = await experienceRepository.findMany();
    return experiences.map(toApiResponse);
  },
};
