"use client";

import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { MODEL_PERF } from "./ModelPerfToggles";

// Register the shader support required by Three.js rectangular area lights.
RectAreaLightUniformsLib.init();

export function ModelLights() {
  // Each ref points to one light after it mounts. useHelper can use these refs
  // to draw colored rectangles that make invisible light positions easy to debug.
  const fillLightRef005 = useRef<THREE.RectAreaLight>(null!);
  const fillLightRef001 = useRef<THREE.RectAreaLight>(null!);
  const fillLightRef002 = useRef<THREE.RectAreaLight>(null!);
  const fillLightRef006 = useRef<THREE.RectAreaLight>(null!);
  // const fillLightRef007 = useRef<THREE.RectAreaLight>(null!);

  // Uncomment these helpers while adjusting the lights, then comment them again
  // for the normal view. The colors only identify helpers; they do not change lighting.
  //   useHelper(fillLightRef005, RectAreaLightHelper, "cyan");
  //   useHelper(fillLightRef001, RectAreaLightHelper, "red");
  //   useHelper(fillLightRef002, RectAreaLightHelper, "blue");
  //   useHelper(fillLightRef006, RectAreaLightHelper, "green");
  //   useHelper(fillLightRef007, RectAreaLightHelper, "orange");

  return (
    <>
      {/*
        Area.005 is a warm overhead fill. Its rotation is written in radians
        because Three.js does not accept Blender's degree values directly.
      */}
      <rectAreaLight
        ref={fillLightRef005}
        position={[0.003429, 2.2628, 0.62193]}
        rotation={[
          THREE.MathUtils.degToRad(-65),
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(180),
        ]}
        color="#ffd0c7"
        intensity={11}
        width={2}
        height={1.117}
      />

      {/* Area.001 adds white fill from the left to soften dark-facing surfaces. */}
      <rectAreaLight
        ref={fillLightRef001}
        position={[-1.65232, 1.09966, 1.76845]}
        quaternion={[0.2411954, -0.2411954, -0.664699, 0.6646991]}
        color="#ffffff"
        intensity={15}
        width={1}
        height={1}
      />

      {/* Area.002 balances the scene from the right at a lower intensity. */}
      <rectAreaLight
        ref={fillLightRef002}
        position={[1.53388, 1.09966, -2.03715]}
        quaternion={[-0.6658614, 0.6658612, -0.2379679, 0.237968]}
        color="#ffffff"
        intensity={3.36}
        width={2.023}
        height={2.023}
      />

      {/* Area.006 is a second warm fill placed close to the model. */}
      <rectAreaLight
        ref={fillLightRef006}
        position={[0.003429, 1.98808, -0.764253]}
        quaternion={[0, -0.9592062, -0.2827075, 0]}
        color="#ffd0c7"
        intensity={11.2}
        width={2}
        height={1.117}
      />

      {/*
        Area.007 behaves like a large, distant softbox. Its large width and height
        spread gentle light across the whole scene instead of one small area.
      */}
      <rectAreaLight
        position={[0.01486, 14.7381, -24.80346]}
        quaternion={[0.8547624, 0, 0, 0.5190195]}
        color="#ffffff"
        intensity={0.516}
        width={30.704}
        height={18.232}
        // Toggle disableArea007 in ModelPerfToggles.tsx to compare this light.
        visible={!MODEL_PERF.disableArea007}
      />
    </>
  );
}
