"use client";

import { useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function BlenderCamera() {
  // useGLTF loads every camera stored in the Blender-exported GLB file.
  const { cameras } = useGLTF("/models/coffee_shop-all.glb");

  // Select only the React Three Fiber state used by this component. The canvas
  // size changes when the browser is resized, so width and height are reactive.
  const set = useThree((state) => state.set);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  // Rebuild the camera only when the loaded cameras or canvas size change.
  const camera = useMemo(() => {
    // Find the specifically named Blender camera instead of relying on array order.
    const source = cameras.find(
      (item) => item.name === "WebCamera",
    );

    // This component needs perspective-camera properties such as aspect.
    if (!(source instanceof THREE.PerspectiveCamera)) {
      console.warn("WebCamera is not a PerspectiveCamera", source);
      return null;
    }

    // useGLTF caches its result. Clone the camera so resizing this canvas does
    // not mutate the shared camera object for another component or canvas.
    const nextCamera = source.clone();

    // Blender exported a 1:1 aspect ratio, but the browser canvas may be wide or
    // tall. updateProjectionMatrix() applies the new ratio to the final image.
    nextCamera.aspect = width / height;
    nextCamera.updateProjectionMatrix();

    return nextCamera;
  }, [cameras, width, height]);

  useLayoutEffect(() => {
    if (!camera) return;

    // Make the cloned Blender camera the active React Three Fiber camera before
    // the browser paints, preventing one frame from using the fallback camera.
    set({ camera });
  }, [camera, set]);

  // This component configures canvas state and does not render a visible object.
  return null;
}
