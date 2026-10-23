"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const HINGE_NAME = "Entrance_door_01_hinge";

const OPEN_ANGLE = -90;

export default function useEntranceDoor(scene: THREE.Object3D) {
  // Keep a reference to the real hinge node so it only needs to be found once.
  const hingeRef = useRef<THREE.Object3D | null>(null);

  // Preserve the door's original orientation so it can be restored on cleanup.
  const closedQuaternionRef = useRef(new THREE.Quaternion());

  // Store the final open orientation that will later become the animation target.
  const openQuaternionRef = useRef(new THREE.Quaternion());

  // Track the door's current target state so each valid click toggles direction.
  const isOpenRef = useRef(false);

  // Store all values that belong to the currently running transition. The
  // start orientation is captured on each click, which allows a smooth reversal
  // even when the user clicks again before the previous animation has finished.
  const animationRef = useRef({
    isRunning: false,
    elapsed: 0,
    duration: 0.9,
    startQuaternion: new THREE.Quaternion(),
    targetQuaternion: new THREE.Quaternion(),
  });

  useLayoutEffect(() => {
    // Find the Empty exported from Blender that acts as the physical door hinge.
    const hinge = scene.getObjectByName(HINGE_NAME);
    const closedQuaternion = closedQuaternionRef.current;

    const animation = animationRef.current;

    if (!hinge) {
      console.warn(`${HINGE_NAME} was not found`);

      return;
    }

    hingeRef.current = hinge;

    // Capture the exact Blender-exported closed orientation instead of assuming
    // that the hinge starts with a zero rotation.
    closedQuaternion.copy(hinge.quaternion);

    // Describe the extra local-Y rotation needed to open the door.
    const openRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      THREE.MathUtils.degToRad(OPEN_ANGLE),
    );

    // The open orientation is the original closed orientation plus the opening
    // rotation. Keeping both orientations prepares them for later interpolation.
    openQuaternionRef.current.copy(closedQuaternion).multiply(openRotation);

    return () => {
      // useGLTF caches its scene, so restore the closed orientation when this
      // component unmounts instead of leaving the cached door open.
      hinge.quaternion.copy(closedQuaternionRef.current);

      // Stop and reset any transition that may still be running.
      animation.isRunning = false;
      animation.elapsed = 0;

      // Release runtime references and reset the interaction state.
      hingeRef.current = null;
      isOpenRef.current = false;
    };
  }, [scene]);

  const handleDoorClick = (clickedObject: THREE.Object3D) => {
    const hinge = hingeRef.current;

    // The model is not ready for interaction if the hinge was not found.
    if (!hinge) {
      return false;
    }

    let current: THREE.Object3D | null = clickedObject;

    // Walk up from the clicked mesh through its parents. Clicking the glass,
    // plate, or leaf counts as a door click when the hinge is an ancestor.
    while (current) {
      if (current === hinge) {
        const animation = animationRef.current;

        // Start this transition from the door's exact current orientation. This
        // also makes reversing an in-progress animation visually continuous.
        animation.startQuaternion.copy(hinge.quaternion);

        if (!isOpenRef.current) {
          // A closed or closing door should now move toward the open orientation.
          animation.targetQuaternion.copy(openQuaternionRef.current);

          isOpenRef.current = true;
        } else {
          // An open or opening door should now move toward the closed orientation.
          animation.targetQuaternion.copy(closedQuaternionRef.current);
          isOpenRef.current = false;
        }

        // Restart the transition timer and let useFrame animate toward the new target.
        animation.elapsed = 0;
        animation.isRunning = true;

        // Tell CoffeeShopModel that the door handled this click.
        return true;
      }

      current = current.parent;
    }

    // No hinge was found in the parent chain, so another model action may handle it.
    return false;
  };

  // React Three Fiber calls this callback before every rendered frame. `delta`
  // is the number of seconds since the previous frame.
  useFrame((_, delta) => {
    const hinge = hingeRef.current;
    const animation = animationRef.current;

    // Nothing can be animated until the exported hinge node has been found.
    if (!hinge) {
      return;
    }

    // Keep the per-frame cost minimal while the door is idle.
    if (!animation.isRunning) {
      return;
    }

    // Accumulate frame time so the animation duration is independent of frame rate.
    animation.elapsed += delta;

    // Convert elapsed seconds into a normalized progress value from 0 to 1.
    const progress = Math.min(animation.elapsed / animation.duration, 1);

    // Ease-out cubic: move quickly at first, then slow down near the target.
    const eased = 1 - Math.pow(1 - progress, 3);

    // Calculate this frame's orientation between the captured start and target.
    hinge.quaternion.slerpQuaternions(
      animation.startQuaternion,
      animation.targetQuaternion,
      eased,
    );

    if (progress >= 1) {
      // Snap to the exact target to remove any final floating-point difference.
      hinge.quaternion.copy(animation.targetQuaternion);

      // Future frames can now return early until another door click starts a transition.
      animation.isRunning = false;
    }
  });

  // Expose only the operation CoffeeShopModel needs; keep door internals private.
  return { handleDoorClick };
}
