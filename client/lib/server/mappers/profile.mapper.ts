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
