"use client";

import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

RectAreaLightUniformsLib.init();

export function ModelLights() {
  const fillLightRef = useRef<THREE.RectAreaLight>(null!);

  // 调试完成后建议删除或通过 debug 属性控制
  useHelper(fillLightRef, RectAreaLightHelper, "cyan");

  return (
    <rectAreaLight
      ref={fillLightRef}
      position={[0.003429, 2.2628, 0.62193]}
      rotation={[
        THREE.MathUtils.degToRad(-65),
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(180),
      ]}
      color="#ffd0c7"
      intensity={5}
      width={2}
      height={1.117}
    />
  );
}
