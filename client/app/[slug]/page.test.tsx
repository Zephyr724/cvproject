import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  getProfileBySlug,
  getExperiencesByUserId,
  getEducationsByUserId,
  getProjectsByUserId,
} = vi.hoisted(() => ({
  getProfileBySlug: vi.fn(),
  getExperiencesByUserId: vi.fn(),
  getEducationsByUserId: vi.fn(),
  getProjectsByUserId: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  default: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock("@/lib/server/services/profile.service", () => ({
  profileService: { getProfileBySlug },
}));

vi.mock("@/lib/server/services/experience.service", () => ({
  experienceService: { getExperiencesByUserId },
}));

vi.mock("@/lib/server/services/education.service", () => ({
  educationService: { getEducationsByUserId },
}));

vi.mock("@/lib/server/services/project.service", () => ({
  projectService: { getProjectsByUserId },
}));

vi.mock("@/app/about/_components/SectionTitle", () => ({
  default: ({ title }: { title: string }) => <h2>{title}</h2>,
}));

vi.mock("@/app/_components/ProfileHeader", () => ({
  default: ({ profile }: { profile: { displayName: string } }) => (
    <h1>{profile.displayName}</h1>
  ),
}));

vi.mock("@/app/components/ExperienceCard", () => ({
  default: ({ experience }: { experience: { title: string } }) => (
    <article>{experience.title}</article>
  ),
}));

vi.mock("@/app/components/EducationCard", () => ({
  default: ({ education }: { education: { degree: string } }) => (
    <article>{education.degree}</article>
  ),
}));

vi.mock("@/app/components/ProjectCard", () => ({
  default: ({ project }: { project: { title: string } }) => (
    <article>{project.title}</article>
  ),
}));

vi.mock("../_components/ContactForm", () => ({
  default: () => <form aria-label="Contact form" />,
}));

import OverviewPage from "./overview/page";

describe("public profile isolation", () => {
  beforeEach(() => {
    getProfileBySlug.mockImplementation(async (slug: string) => ({
      userId: slug === "user-a-profile" ? "user-a" : "user-b",
      displayName: slug === "user-a-profile" ? "User A" : "User B",
      headline: "Developer",
      bio: null,
      email: slug === "user-a-profile" ? "a@example.com" : "b@example.com",
      github: null,
      linkedin: null,
      isPublic: true,
      user: { resume: null },
    }));
    getExperiencesByUserId.mockImplementation(async (userId: string) => [
      {
        id: userId === "user-a" ? 1 : 2,
        title: userId === "user-a" ? "A Experience" : "B Experience",
      },
    ]);
    getEducationsByUserId.mockImplementation(async (userId: string) => [
      {
        id: userId === "user-a" ? 1 : 2,
        degree: userId === "user-a" ? "A Education" : "B Education",
      },
    ]);
    getProjectsByUserId.mockImplementation(async (userId: string) => [
      {
        id: userId === "user-a" ? 1 : 2,
        title: userId === "user-a" ? "A Project" : "B Project",
      },
    ]);
  });

  it("loads and renders only the owner of the requested profile", async () => {
    const page = await OverviewPage({ params: { slug: "user-a-profile" } });
    const html = renderToStaticMarkup(page);

    expect(getProfileBySlug).toHaveBeenCalledWith("user-a-profile");
    expect(getExperiencesByUserId).toHaveBeenCalledWith("user-a");
    expect(getEducationsByUserId).toHaveBeenCalledWith("user-a");
    expect(getProjectsByUserId).toHaveBeenCalledWith("user-a");
    expect(html).toContain("A Experience");
    expect(html).toContain("A Education");
    expect(html).toContain("A Project");
    expect(html).not.toContain("B Experience");
    expect(html).not.toContain("B Education");
    expect(html).not.toContain("B Project");
  });
});
