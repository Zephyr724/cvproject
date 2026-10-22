import { describe, expect, it } from "vitest";
import { createModelActions } from "./modelActions";

describe("createModelActions", () => {
  it("builds profile-scoped embedded routes", () => {
    const actions = createModelActions({
      slug: "user-profile",
      github: "https://github.com/user",
      linkedin: "https://www.linkedin.com/in/user",
    });

    expect(actions.MenuStand).toEqual({
      type: "embedded",
      title: "My Projects",
      url: "/user-profile/projects?embed=1",
    });
    expect(actions.GitHubBag).toEqual({
      type: "external",
      url: "https://github.com/user",
    });
  });

  it("does not create actions for missing social links", () => {
    const actions = createModelActions({
      slug: "user-profile",
      github: null,
      linkedin: null,
    });

    expect(actions.GitHubBag).toBeUndefined();
    expect(actions.LinkedInBag).toBeUndefined();
  });
});
