"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function ModelScene() {
  return (
    <>
      <axesHelper args={[5]} />

      <gridHelper args={[10, 10]} />

      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>

      <OrbitControls />
    </>
  );
}

export function ModelCanvas() {
  return (
    <div className="h-screen w-full">
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