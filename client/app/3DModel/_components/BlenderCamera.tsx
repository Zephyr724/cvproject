"use client";

import { useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function BlenderCamera() {
  const { cameras } = useGLTF("/models/coffee_shop-all.glb");
  const set = useThree((state) => state.set);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  const camera = useMemo(() => {
    const source = cameras.find(
      (item) => item.name === "WebCamera",
    );

    if (!(source instanceof THREE.PerspectiveCamera)) {
      console.warn("WebCamera 不是 PerspectiveCamera", source);
      return null;
    }

    const nextCamera = source.clone();

    // GLB 记录的画面比例是 1:1，
    // 网页 Canvas 宽高比不同，需要在这里更新。
    nextCamera.aspect = width / height;
    nextCamera.updateProjectionMatrix();

    return nextCamera;
  }, [cameras, width, height]);

  useLayoutEffect(() => {
    if (!camera) return;

    set({ camera });
  }, [camera, set]);

  return null;
}