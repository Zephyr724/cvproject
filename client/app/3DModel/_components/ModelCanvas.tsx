"use client";

import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MainModel } from "./MainModel";

// Everything returned here becomes part of the 3D scene.
function ModelScene() {
  const { camera } = useThree();
  return (
    <>
      {/* X is red, Y is green, and Z is blue. */}
      <axesHelper args={[5]} />

      {/* A reference grid on the XZ ground plane. */}
      <gridHelper args={[10, 10]} />

      {/* Soft base light prevents completely dark areas. */}
      <ambientLight intensity={0.6} />

      {/* Main white light shines from the upper-right front. */}
      <directionalLight position={[-2, 1, -5]} intensity={5} color="#ffffff" />

      {/* Wait for the GLB file to finish loading. */}
      <Suspense fallback={null}>
        <MainModel />
      </Suspense>

      {/* Enables mouse rotation, zooming, and panning. */}
      <OrbitControls
        target={[0, 1.5, 0]}
        onEnd={() => {
          console.log("Camera position:", camera.position.toArray());
        }}
      />
    </>
  );
}

export function ModelCanvas() {
  return (
    <div className="h-screen w-full">
      {/* Canvas creates the scene, camera, renderer, and render loop. */}
      <Canvas
        camera={{
          position: [3, 2, 5],
          fov: 50,
        }}
      >
        <ModelScene />
      </Canvas>
    </div>
  );
}
