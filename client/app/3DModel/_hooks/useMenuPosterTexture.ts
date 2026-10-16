import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function useMenuPosterTexture(scene: THREE.Object3D) {
  // Load the Projects poster separately so it can replace the material texture
  // on the matching mesh inside the GLB scene.
  const posterTexture = useTexture(
    "/images/projects-poster.jpeg",
    (texture) => {
      // JPEG colors are authored in sRGB. GLTF texture coordinates also expect
      // this replacement image to be flipped vertically for the correct orientation.
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
    },
  );

  useEffect(() => {
    // Blender object names are preserved in a GLB, so the poster mesh can be
    // located without depending on its position in the scene hierarchy.
    const poster = scene.getObjectByName("MenuPoster");

    if (!(poster instanceof THREE.Mesh)) {
      console.warn("MenuPoster was not found in the GLB scene");
      return;
    }
    if (!(poster.material instanceof THREE.MeshStandardMaterial)) {
      console.warn("MenuPoster does not use MeshStandardMaterial");
      return;
    }

    const material = poster.material as THREE.MeshStandardMaterial;
    const originalMap = material.map;
    const originalColor = material.color.clone();

    // Replace only this mesh's color map. Resetting the base color to white
    // prevents it from tinting the poster, and needsUpdate refreshes the shader.
    material.map = posterTexture;
    material.color.set("#ffffff");
    material.needsUpdate = true;

    return () => {
      material.map = originalMap;
      material.color.copy(originalColor);
      material.needsUpdate = true;
    };
  }, [scene, posterTexture]);
}
