import { profileRepository } from "@/lib/server/repositories/profile.repository";

export const profileService = {
  async getProfileBySlug(slug: string) {
    const profile = await profileRepository.findBySlug(slug);
    if (!profile) return null;
    return profile;
  },
};
