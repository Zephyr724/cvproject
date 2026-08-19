import { Profile } from "@/src/generated/prisma/client";

export interface PublicProfile {
  displayName: string;
  headline: string | null;
  bio: string | null;
  isPublic: boolean;
  linkedin: string | null;
  github: string | null;
  email: string | null;

  user: {
    resume: {
      fileUrl: string;
      originalName: string;
    } | null;
  };
}

export function toApiResponse(profile: Profile) {
  return {
    id: profile.id,
    displayName: profile.displayName,
    headline: profile.headline,
    bio: profile.bio,
    slug: profile.slug,
    isPublic: profile.isPublic,
    linkedin: profile.linkedin,
    github: profile.github,
    email: profile.email,
    website: profile.website,
    userId: profile.userId,
  };
}
