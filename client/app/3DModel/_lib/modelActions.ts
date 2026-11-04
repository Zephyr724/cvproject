import { Project } from "@/app/projects/_components/types";
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
  resumeUrl: string | null;
}

export function createModelActions(
  profile: ModelProfileContext,
  projects: Project[],
): Record<string, ModelAction> {
  const profilePath = `/${encodeURIComponent(profile.slug)}`;

  const actions: Record<string, ModelAction> = {
    menu_stand_01: {
      type: "embedded",
      title: "My Projects",
      url: `${profilePath}/projects?embed=1`,
    },

    vending_machine_01_root: {
      type: "embedded",
      title: "My Experience",
      url: `${profilePath}/experience?embed=1`,
    },

    free_book_library_01_root: {
      type: "embedded",
      title: "My Education",
      url: `${profilePath}/education?embed=1`,
    },

    postbox_01_root: {
      type: "embedded",
      title: "Contact Me",
      url: `${profilePath}/contact?embed=1`,
    },
    outside_wall_poster_01_root: {
      type: "embedded",
      title: "My Project",
      url: ``,
    },
    outside_wall_poster_02_root: {
      type: "embedded",
      title: "My Project",
      url: ``,
    },
    outside_wall_poster_03_root: {
      type: "embedded",
      title: "My Project",
      url: ``,
    },
  };

  if (profile.resumeUrl) {
    actions.order_pickup_stand_01_cv_bag = {
      type: "external",
      url: profile.resumeUrl,
    };
  }

  if (profile.github) {
    actions.order_pickup_stand_01_github_bag = {
      type: "external",
      url: profile.github,
    };
  }

  if (profile.linkedin) {
    actions.order_pickup_stand_01_linkedin_bag = {
      type: "external",
      url: profile.linkedin,
    };
  }

  projects.forEach((project) => {
    if (project.outsideWallSlot !== null) {
      actions[`outside_wall_poster_0${project.outsideWallSlot}_root`] = {
        type: "embedded",
        title: project.title,
        url: `/projects/${project.id}?embed=1`,
      };
    }
  });

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
