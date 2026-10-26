import { useEffect, useMemo } from "react";
import * as THREE from "three";

export interface VendingScreenLayout {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  width: number;
  height: number;
}

export default function useVendingScreen(scene: THREE.Object3D) {
  useEffect(() => {
    // The screen is a separate mesh inside the GLB. Looking it up by its
    // exported Blender name lets us prepare its background without changing
    // the vending machine model or any other material in the scene.
    const screen = scene.getObjectByName("WorkExperienceScreen");

    // getObjectByName can return undefined or a non-mesh Object3D, so stop if
    // the expected screen mesh is unavailable.
    if (!(screen instanceof THREE.Mesh)) {
      console.warn("WorkExperienceScreen was not found");
      return;
    }

    // The exported screen currently uses a MeshStandardMaterial. Checking the
    // material type keeps the code safe if the GLB structure changes later.
    if (!(screen.material instanceof THREE.MeshStandardMaterial)) {
      console.warn("WorkExperienceScreen has an unsupported material");
      return;
    }

    // Keep the original material so cleanup can restore the cached GLB scene.
    // Clone it before making changes because imported materials can be shared
    // by multiple meshes, and changing a shared material would affect them all.
    const originalMaterial = screen.material;
    const screenMaterial = originalMaterial.clone();

    screenMaterial.map = null;
    screenMaterial.emissiveMap = null;
    screenMaterial.color.set("#171717");
    screenMaterial.emissive.set("#000000");

    // The material's texture references changed, so its shader state must be
    // refreshed before the next render.
    screenMaterial.needsUpdate = true;

    // Assign the cloned runtime material only to the vending machine screen.
    screen.material = screenMaterial;

    return () => {
      // useGLTF caches the loaded scene, so restore the original material when
      // this effect is removed or rerun. This also keeps React Strict Mode's
      // development-only effect cycle from leaving modified cached state.
      screen.material = originalMaterial;

      // Three.js cannot automatically know when GPU resources are no longer
      // needed. Dispose the runtime cloned material to prevent a
      // resource leak when the page is entered more than once.
      screenMaterial.dispose();
    };
  }, [scene]);

  const screenLayout: VendingScreenLayout | null = useMemo(() => {
    const screen = scene.getObjectByName("WorkExperienceScreen");
    if (!(screen instanceof THREE.Mesh)) return null;

    screen.geometry.computeBoundingBox();
    const box = screen.geometry.boundingBox;
    if (!box) return null;

    // World transforms must be current before converting the mesh's local
    // bounds into the position, rotation, and dimensions used by UIKit.
    scene.updateMatrixWorld(true);

    const localCenter = box.getCenter(new THREE.Vector3());
    const localSize = box.getSize(new THREE.Vector3());
    const worldScale = screen.getWorldScale(new THREE.Vector3());
    const quaternion = screen.getWorldQuaternion(new THREE.Quaternion());

    const position = screen.localToWorld(localCenter);
    const front = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion);

    // Move the UI slightly in front of the GLB surface to prevent z-fighting.
    position.addScaledVector(front, 0.002);

    return {
      position,
      quaternion,
      width: localSize.x * worldScale.x,
      height: localSize.y * worldScale.y,
    };
  }, [scene]);

  return screenLayout;
}
