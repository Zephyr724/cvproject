"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, type ComponentRef, type RefObject } from "react";
import { BlenderCamera } from "./BlenderCamera";
import { CoffeeShopModel } from "./CoffeeShopModel";
import { ModelLights } from "./ModelLights";
import { DayBackground } from "./DayBackground";
import { DayGround } from "./DayGround";
import { useThree } from "@react-three/fiber";
import type { ModelProfileContext } from "../_lib/modelActions";
import type { Experience } from "@/app/admin/experience/types";
import type { Project } from "@/app/projects/_components/types";

export type ModelControlsRef = ComponentRef<typeof OrbitControls>;

interface ModelSceneProps {
  controlsRef: RefObject<ModelControlsRef | null>;
  profile: ModelProfileContext;
  experiences: Experience[];
  projects: Project[];
}

export function ModelScene({
  controlsRef,
  profile,
  experiences,
  projects,
}: ModelSceneProps) {
  // `state.get` reads the latest canvas state when an interaction ends, avoiding
  // the need to re-render this component every time the camera moves.
  const getThreeState = useThree((state) => state.get);

  return (
    <>
      {/* Fallback color while the panorama loads. */}
      <color attach="background" args={["#f5f1ed"]} />

      <BlenderCamera />
      <ModelLights />

      {/* Suspense waits for the HDR environment and GLB assets to finish loading. */}
      {/* TODO: Replace the null fallback with a visible 3D scene loading state. */}
      <Suspense fallback={null}>
        {/* DayBackground fills the distance; DayGround is the physical surface.
            A future day/night state can switch their images together. */}
        <DayBackground />
        <DayGround />
        {/*
          The HDR supplies light and reflections without replacing the visible
          daylight panorama.
        */}
        <Environment
          files="/hdr/artist_workshop_1k.hdr"
          background={false}
          environmentIntensity={2}
        />
        <CoffeeShopModel
          profile={profile}
          experiences={experiences}
          projects={projects}
        />
      </Suspense>

      {/*
        ContactShadows adds a soft grounding shadow without requiring a visible floor.
        The tiny Y offset helps prevent flickering where the shadow meets the model.
      */}
      <ContactShadows
        position={[0, 0.005, 0]}
        scale={6}
        opacity={0.65}
        blur={3}
        far={4}
        resolution={512}
        color="#160604"
      />

      <OrbitControls
        // Keep the controls instance available to ModelCanvas's Reset Camera button.
        ref={controlsRef}
        // This is the point the camera looks at and orbits around, not the
        // camera's own position. Its Y value raises or lowers the center of the
        // initial view. Compare it with nextCamera.position in BlenderCamera:
        // moving both upward keeps a similar viewing angle, while changing
        // only one changes how steeply the camera looks up or down.
        target={[0, 0.9, 0]}
        // Polar angle measures vertical orbit from the +Y direction in radians.
        // PI / 2 is level with the target, so this prevents orbiting below the
        // target and looking up at the underside of the coffee shop. This
        // limits rotation only; panning and zooming are separate controls.
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={5.5}
        onEnd={() => {
          // Reading the camera only after interaction ends avoids logging every frame.
          const camera = getThreeState().camera;

          console.log("Camera position:", camera.position.toArray());
        }}
      />
    </>
  );
}
