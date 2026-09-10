"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, type ComponentRef, type RefObject } from "react";
import { BlenderCamera } from "./BlenderCamera";
import { MainModel } from "./MainModel";
import { ModelLights } from "./ModelLights";
import { useThree } from "@react-three/fiber";

export type ModelControlsRef = ComponentRef<typeof OrbitControls>;

interface ModelSceneProps {
  controlsRef: RefObject<ModelControlsRef | null>;
}

export function ModelScene({ controlsRef }: ModelSceneProps) {
  // `state.get` reads the latest canvas state when an interaction ends, avoiding
  // the need to re-render this component every time the camera moves.
  const getThreeState = useThree((state) => state.get);

  return (
    <>
      <color attach="background" args={["#070201"]} />

      <BlenderCamera />
      <ModelLights />

      {/* Suspense waits for the HDR environment and GLB assets to finish loading. */}
      <Suspense fallback={null}>
        {/*
          The HDR image supplies realistic light and reflections. background=false
          keeps the solid dark color above visible instead of showing the HDR image.
        */}
        <Environment
          files="/hdr/artist_workshop_1k.hdr"
          background={false}
          environmentIntensity={2}
        />
        <MainModel />
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
        onEnd={() => {
          // Reading the camera only after interaction ends avoids logging every frame.
          const camera = getThreeState().camera;

          console.log("Camera position:", camera.position.toArray());
        }}
      />
    </>
  );
}
