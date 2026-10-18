import * as THREE from "three";

export type EmbeddedModelAction = {
  type: "embedded";
  title: string;
  url: string;
};
export type ExternalModelAction = { type: "external"; url: string };

export type ModelAction = EmbeddedModelAction | ExternalModelAction;

export const MODEL_ACTIONS: Record<string, ModelAction> = {
  MenuStand: {
    type: "embedded",
    title: "My Projects",
    url: "/projects?embed=1",
  },
  GitHubBag: { type: "external", url: "https://github.com/Zephyr724" },
  LinkedInBag: {
    type: "external",
    url: "https://www.linkedin.com/in/zephyr-chan-7269a06a/",
  },
  VendingMachine: {
    type: "embedded",
    title: "My Experience",
    url: "/experience?embed=1",
  },
  FreeBookLibrary: {
    type: "embedded",
    title: "My Education",
    url: "/education?embed=1",
  },
  Postbox: {
    type: "embedded",
    title: "Send Me Email",
    url: "mailto:",
  },
};

export function findModelAction(object: THREE.Object3D) {
  let current: THREE.Object3D | null = object;

  while (current) {
    const action = MODEL_ACTIONS[current.name];

    if (action) return action;

    current = current.parent;
  }

  return undefined;
}
