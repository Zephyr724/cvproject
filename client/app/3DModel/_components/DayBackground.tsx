"use client";

import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

/** Displays a 2:1 daylight panorama behind the physical ground and model. */
export function DayBackground() {
  // Load the test panorama as a cached Texture. A future street panorama can
  // replace this file without changing how the background is attached.
  const texture = useTexture("/backgrounds/day-test-360.svg");

  const background = useMemo(() => {
    // Configure a clone without changing useTexture's cached Texture.
    const copy = texture.clone();

    // Map the 2:1 image around the viewer; its left and right edges must join.
    copy.mapping = THREE.EquirectangularReflectionMapping;

    // Interpret ordinary image colors as sRGB, then upload the changed settings.
    copy.colorSpace = THREE.SRGBColorSpace;
    copy.needsUpdate = true;
    return copy;
  }, [texture]);

  // Dispose of the configured clone when it is no longer used.
  useEffect(() => () => background.dispose(), [background]);

  // Assign the Texture to scene.background. Unlike DayGround's mesh, this has
  // no geometry, world-space size, or surface that can receive shadows.
  return <primitive attach="background" object={background} />;
}
