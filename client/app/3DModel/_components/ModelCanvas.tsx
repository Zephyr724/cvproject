"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  ModelScene,
  type ModelControlsRef,
} from "./ModelScene";
import { ModelPostProcessing } from "./ModelPostProcessing";

export function ModelCanvas() {
  // OrbitControls lives inside the canvas, while the reset button is regular HTML.
  // Sharing this ref lets the outside button call the controls' reset() method.
  const controlsRef = useRef<ModelControlsRef>(null);

  return (
    <div className="relative h-[calc(100dvh-4rem)] w-full overflow-hidden">
      <Canvas
        // Configure the WebGL renderer once when the canvas is created. Antialiasing
        // smooths model edges; AgX and exposure control how HDR light becomes screen color.
        gl={{
          antialias: true,
          toneMapping: THREE.AgXToneMapping,
          toneMappingExposure: 0.8,
        }}
        // This is a safe startup camera. BlenderCamera replaces it after the GLB loads.
        camera={{ position: [0, 1, 5], fov: 50 }}
      >
        {/* ModelScene contains the 3D objects; post-processing affects its final image. */}
        <ModelScene controlsRef={controlsRef} />
        <ModelPostProcessing />
      </Canvas>

      <button
        type="button"
        onClick={() => controlsRef.current?.reset()}
        className="absolute bottom-4 right-4 z-10 rounded-lg bg-black/70 px-4 py-2 text-white"
      >
        Reset Camera
      </button>
    </div>
  );
}
