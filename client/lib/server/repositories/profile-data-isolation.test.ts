import { beforeEach, describe, expect, it, vi } from "vitest";

const { findExperienceMany, findEducationMany, findProjectMany } = vi.hoisted(
  () => ({
    findExperienceMany: vi.fn(),
    findEducationMany: vi.fn(),
    findProjectMany: vi.fn(),
  }),
);

vi.mock("@/lib/prisma", () => ({
  prisma: {
    experience: { findMany: findExperienceMany },
    education: { findMany: findEducationMany },
    project: { findMany: findProjectMany },
  },
}));

import { educationRepository } from "./education.repository";
import { experienceRepository } from "./experience.repository";
import { projectRepository } from "./project.repository";

describe("profile data isolation", () => {
  beforeEach(() => {
    findExperienceMany.mockResolvedValue([]);
    findEducationMany.mockResolvedValue([]);
    findProjectMany.mockResolvedValue([]);
  });

  it("filters experiences by the requested user", async () => {
    await experienceRepository.findManyByUserId("user-a");

    expect(findExperienceMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: "user-a" } }),
    );
  });

  it("filters educations by the requested user", async () => {
    await educationRepository.findManyByUserId("user-a");

    expect(findEducationMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: "user-a" } }),
    );
  });

  it("filters projects by the requested owner", async () => {
    await projectRepository.findManyByOwnerId("user-a");

    expect(findProjectMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { ownerId: "user-a" } }),
    );
  });
});
