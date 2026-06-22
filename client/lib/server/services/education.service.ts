import { educationRepository } from "@/lib/server/repositories/education.repository";
import { toApiResponse } from "@/lib/server/mappers/education.mapper";

export const educationService = {
  async getAllEducations() {
    const educations = await educationRepository.findMany();
    return educations.map(toApiResponse);
  },
};
