import { Project } from "@/app/projects/_components/types";
import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

let DEFAULT_POSTER_URLS = [
  "/images/project-posters/outsidewall_projects-poster-01.png",
  "/images/project-posters/outsidewall_projects-poster-02.png",
  "/images/project-posters/outsidewall_projects-poster-03.png",
] as const;

const POSTER_NAMES = [
  "outside_wall_poster_01_surface",
  "outside_wall_poster_02_surface",
  "outside_wall_poster_03_surface",
];

export default function useOutsideWallPosterTexture(
  scene: THREE.Object3D,
  projects: Project[],
) {
  // Load the Projects poster separately so it can replace the material texture
  // on the matching mesh inside the GLB scene.

  const posterUrls: string[] = [...DEFAULT_POSTER_URLS];

  console.log("projects", projects);

  projects.forEach((project) => {
    if (
      typeof project.outsideWallPosterUrl === "string" &&
      project.outsideWallSlot != null &&
      project.outsideWallSlot > 0 &&
      project.outsideWallSlot <= DEFAULT_POSTER_URLS.length
    ) {
      posterUrls[project.outsideWallSlot - 1] = project.outsideWallPosterUrl;
    }
  });

  // TODO: Handle invalid or unreachable poster URLs without blocking the whole
  // 3D scene; fall back to the default poster for the affected slot.
  const [texture1, texture2, texture3] = useTexture(posterUrls, (textures) => {
    // Mirror each poster horizontally using its UV transform.
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = true;
      texture.needsUpdate = true;
    });
  });
  console.log("POSTER_URLS", posterUrls);
  console.log("Projects", projects);

  useEffect(() => {
    const textures = [texture1, texture2, texture3];
    const originals: {
      material: THREE.MeshStandardMaterial;
      map: THREE.Texture | null;
      color: THREE.Color;
    }[] = [];

    POSTER_NAMES.forEach((name, index) => {
      const mesh = scene.getObjectByName(name);

      if (!(mesh instanceof THREE.Mesh)) {
        console.warn(`${name} was not found in the GLB scene`);
        return;
      }
      if (!(mesh.material instanceof THREE.MeshStandardMaterial)) {
        console.warn(`${name} does not use MeshStandardMaterial`);
        return;
      }

      const texture = textures[index];

      const material = mesh.material;
      originals.push({
        material,
        map: material.map,
        color: material.color.clone(),
      });

      material.map = texture;
      material.color.set("#ffffff");
      material.needsUpdate = true;
    });

    return () => {
      originals.forEach(({ material, map, color }) => {
        material.map = map;
        material.color.copy(color);
        material.needsUpdate = true;
      });
    };
  }, [scene, texture1, texture2, texture3]);
}
