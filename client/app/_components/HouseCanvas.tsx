"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useCamera } from "../context/CameraContext";

// House GLB 模型（修复材质 + 双面渲染）
function HouseModel() {
  const { scene } = useGLTF("/models/house.glb");

  // useMemo 确保只在 scene 变化时遍历
  const processedScene = useMemo(() => {
    const clonedScene = scene.clone(true);

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.material) {
          // mesh.material 可能是单个材质或材质数组（multi-material）
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          for (const rawMat of materials) {
            const mat = rawMat as THREE.MeshStandardMaterial;

            // 双面渲染：修复 Blender 导出法线不一致导致的面消失
            mat.side = THREE.DoubleSide;

            // 修复颜色暗淡：确保颜色空间正确
            if (mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
            }
            if (mat.emissiveMap) {
              mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            }

            // 透明材质处理
            const transparent = mat.transparent;
            const opacity = mat.opacity;

            // glTF KHR_materials_transmission 导出 → Three.js 自动创建 MeshPhysicalMaterial
            // 检查是否为玻璃/透射材质
            const hasTransmission =
              mat instanceof THREE.MeshPhysicalMaterial &&
              mat.transmission > 0;

            if (hasTransmission) {
              // 玻璃材质：禁用深度写入，确保玻璃后面的物体可见
              mat.depthWrite = false;
              mesh.renderOrder = 1;
            } else if (opacity < 1 || transparent) {
              // 普通半透明材质（非玻璃）
              mat.depthWrite = false;
              mesh.renderOrder = 1;
              // 只在有 alphaMap（如树叶）时启用 alphaTest 做裁剪
              mat.alphaTest = mat.alphaMap ? 0.1 : 0;
            }
          }
        }
      }
    });

    return clonedScene;
  }, [scene]);

  return <primitive object={processedScene} scale={1} />;
}

// 场景内容
function SceneContent({
  onOpenModal,
}: {
  onOpenModal: (title: string, url: string) => void;
}) {
  const { controlsRef } = useCamera();

  return (
    <>
      {/* 商店氛围光：柔和暖色 */}
      <ambientLight intensity={0.5} color="#fff5e8" />

      {/* 模拟商店轨道灯：从上方投射 */}
      <pointLight
        position={[2, 3, 2]}
        intensity={80}
        color="#ffe8cc"
        distance={8}
        decay={2}
        castShadow
      />
      <pointLight
        position={[-2, 3, 2]}
        intensity={60}
        color="#ffe8cc"
        distance={8}
        decay={2}
      />
      <pointLight
        position={[0, 3, -2]}
        intensity={50}
        color="#ffe8cc"
        distance={8}
        decay={2}
      />

      {/* 补光：防止底部过暗 */}
      <hemisphereLight
        args={["#fff5e8", "#3a3040", 0.4]}
      />

      {/* 房屋模型 */}
      <Suspense
        fallback={
          <Html center>
            <div className="bg-white/80 px-4 py-2 rounded shadow text-sm">
              Loading...
            </div>
          </Html>
        }
      >
        <HouseModel />
      </Suspense>

      {/* 相机控制 */}
      <OrbitControls ref={controlsRef} enableZoom enablePan />
    </>
  );
}

// 主组件
export function HouseCanvas({
  onOpenModal,
}: {
  onOpenModal: (title: string, url: string) => void;
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [2, 2, 3], fov: 50 }}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <SceneContent onOpenModal={onOpenModal} />
      </Canvas>
    </div>
  );
}