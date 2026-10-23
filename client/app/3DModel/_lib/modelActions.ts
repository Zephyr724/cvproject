import * as THREE from "three";

export type EmbeddedModelAction = {
  type: "embedded";
  title: string;
  url: string;
};
export type ExternalModelAction = { type: "external"; url: string };

export type ModelAction = EmbeddedModelAction | ExternalModelAction;

export interface ModelProfileContext {
  slug: string;
  github: string | null;
  linkedin: string | null;
}

export function createModelActions(
  profile: ModelProfileContext,
): Record<string, ModelAction> {
  const profilePath = `/${encodeURIComponent(profile.slug)}`;

  const actions: Record<string, ModelAction> = {
    MenuStand: {
      type: "embedded",
      title: "My Projects",
      url: `${profilePath}/projects?embed=1`,
    },

    VendingMachine: {
      type: "embedded",
      title: "My Experience",
      url: `${profilePath}/experience?embed=1`,
    },

    FreeBookLibrary: {
      type: "embedded",
      title: "My Education",
      url: `${profilePath}/education?embed=1`,
    },

    Postbox: {
      type: "embedded",
      title: "Contact Me",
      url: `${profilePath}/contact?embed=1`,
    },
  };

  if (profile.github) {
    actions.GitHubBag = { type: "external", url: profile.github };
  }

  if (profile.linkedin) {
    actions.LinkedInBag = { type: "external", url: profile.linkedin };
  }

  return actions;
}

export function findModelAction(
  object: THREE.Object3D,
  actions: Record<string, ModelAction>,
) {
  let current: THREE.Object3D | null = object;

  while (current) {
    const action = actions[current.name];

    if (action) return action;

    current = current.parent;
  }

  return undefined;
}
