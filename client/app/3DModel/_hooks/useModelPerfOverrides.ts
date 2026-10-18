import { useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import { MODEL_PERF } from "../_components/ModelPerfToggles";

export default function useModelPerfOverrides(scene: THREE.Object3D) {
  // Blender's "Plane.005" is sanitized to "Plane005" by GLTFLoader.
  // Toggle hidePlane005 in ModelPerfToggles.tsx to compare the backdrop cost.
  useLayoutEffect(() => {
    const plane005 = scene.getObjectByName("Plane005");
    if (!plane005 || !MODEL_PERF.hidePlane005) return;

    const originalVisible = plane005.visible;

    plane005.visible = false;

    return () => {
      plane005.visible = originalVisible;
    };
  }, [scene]);

  useEffect(() => {
    // Store each real PointLight object as the key and a snapshot of its
    // original primitive values as the value, so cleanup can restore it later.
    const lightStates = new Map<
      THREE.PointLight,
      {
        visible: boolean;
        intensity: number;
      }
    >();

    const materialStates = new Map<
      THREE.Material,
      {
        side: THREE.Side;
        physical?: {
          transmission: number;
          transparent: boolean;
          opacity: number;
          depthWrite: boolean;
          roughness: number;
        };
      }
    >();

    // Walk through the complete Blender scene and normalize its point lights.
    // This reuses the exported light positions instead of rebuilding them in JSX.
    scene.traverse((object) => {
      if (object instanceof THREE.PointLight) {
        // The key is the actual light object from the scene. The value is a separate
        // snapshot containing its original boolean and number values.
        lightStates.set(object, {
          visible: object.visible,
          intensity: object.intensity,
        });

        object.visible = !MODEL_PERF.disableImportedPointLights;
        object.intensity = 1;
      }

      if (object instanceof THREE.Mesh) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        for (const material of materials) {

          // Multiple meshes may share the same material, so record each material only
          // once and always capture its values before applying any overrides.
          if (!materialStates.has(material)) {
            materialStates.set(material, {
              side: material.side,
              physical:
                material instanceof THREE.MeshPhysicalMaterial
                  ? {
                      transmission: material.transmission,
                      transparent: material.transparent,
                      opacity: material.opacity,
                      depthWrite: material.depthWrite,
                      roughness: material.roughness,
                    }
                  : undefined,
            });
          }

          if (MODEL_PERF.forceFrontSide) material.side = THREE.FrontSide;
          if (
            MODEL_PERF.disableTransmission &&
            material instanceof THREE.MeshPhysicalMaterial &&
            material.transmission > 0
          ) {
            material.transmission = 0;
            material.transparent = true;
            material.opacity = 0.28;
            material.depthWrite = false;
            material.roughness = 0.15;
          }
          material.needsUpdate = true;
        }
      }
    });

    return () => {
      // Each Map entry is [real scene light, original value snapshot].
      // Writing the saved values to the light restores the same object held by scene.
      for (const [light, original] of lightStates) {
        light.visible = original.visible;
        light.intensity = original.intensity;
      }

      // Restore every real material object from the independent snapshot saved
      // before the performance overrides were applied.
      for (const [material, original] of materialStates) {
        material.side = original.side;

        if (
          original.physical &&
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          material.transmission = original.physical.transmission;
          material.transparent = original.physical.transparent;
          material.opacity = original.physical.opacity;
          material.depthWrite = original.physical.depthWrite;
          material.roughness = original.physical.roughness;
        }

        material.needsUpdate = true;
      }
    };
  }, [scene]);
}
