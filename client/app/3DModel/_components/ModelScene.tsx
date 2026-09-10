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
  const getThreeState = useThree((state) => state.get);

  return (
    <>
      <color attach="background" args={["#070201"]} />

      <BlenderCamera />
      <ModelLights />

      <Suspense fallback={null}>
        <Environment
          files="/hdr/artist_workshop_1k.hdr"
          background={false}
          environmentIntensity={2}
        />
        <MainModel />
      </Suspense>

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
        ref={controlsRef}
        onEnd={() => {
          const camera = getThreeState().camera;

          console.log("Camera position:", camera.position.toArray());
        }}
      />
    </>
  );
}
