"use client";

import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

/** A physical ground plane beneath the shop, separate from the distant panorama. */
export function DayGround() {
  // A Texture is an image plus sampling settings, not a 3D surface.
  const texture = useTexture("/backgrounds/day-ground-tile.svg");

  const ground = useMemo(() => {
    // Configure a clone so the cached Texture remains unchanged. The clone
    // refers to the same source image; it is not a new image file.
    const copy = texture.clone();

    // S/U and T/V are the two texture-coordinate directions. RepeatWrapping
    // restarts sampling at the opposite image edge when a coordinate exceeds 1.
    copy.wrapS = THREE.RepeatWrapping;
    copy.wrapT = THREE.RepeatWrapping;

    // Repeat the image 1000 times across each axis of the 2000-unit plane.
    // Each tile therefore occupies 2000 / 1000 = 2 world units per axis.
    // More repeats make each tile smaller; they do not add images or meshes.
    copy.repeat.set(1000, 1000);

    // Use the image's display color space and upload these changed settings.
    copy.colorSpace = THREE.SRGBColorSpace;
    copy.needsUpdate = true;
    return copy;
  }, [texture]);

  // Release the configured Texture when it is no longer used.
  useEffect(() => () => ground.dispose(), [ground]);

  return (
    // Mesh = Geometry (shape) + Material (surface). Rotate the default XY plane
    // into the XZ ground plane and place it just below the shop's base.
    <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Geometry sets physical size in world units, not image pixels. */}
      <planeGeometry args={[2000, 2000]} />
      {/* The Material uses "ground" (a Texture) as its image map. BasicMaterial
          does not respond to scene lights; later post-processing can still affect it. */}
      <meshBasicMaterial map={ground} toneMapped={false} />
    </mesh>
  );
}
