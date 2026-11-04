import { Project } from "@/app/projects/_components/types";
import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

let POSTER_URLS = [
  "/images/project-posters/outsidewall_projects-poster-01.png",
  "/images/project-posters/outsidewall_projects-poster-02.png",
  "/images/project-posters/outsidewall_projects-poster-03.png",
];

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
  const [texture1, texture2, texture3] = useTexture(POSTER_URLS, (textures) => {
    // Mirror each poster horizontally using its UV transform.
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = true;
      texture.needsUpdate = true;
    });
  });

  projects.forEach((project) => {
    if (
      project.outsideWallPosterUrl !== null &&
      project.outsideWallSlot != null &&
      project.outsideWallSlot > 0 &&
      project.outsideWallSlot <= POSTER_URLS.length
    ) {
      POSTER_URLS[project.outsideWallSlot - 1] = project.outsideWallPosterUrl;
    }
  });
  console.log("POSTER_URLS", POSTER_URLS);
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
