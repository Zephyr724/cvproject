"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function MainModel() {
  const { scene } = useGLTF("/models/coffee_shop-all.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.PointLight) {
        object.visible = true;
        object.intensity = 1;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}