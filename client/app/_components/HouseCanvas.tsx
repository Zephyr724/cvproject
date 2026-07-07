"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { ThreeDropdown } from "./ThreeDropdown";
import {useCamera } from "../context/CameraContext";

// 立方体六个面的位置和旋转（平面几何体）
const FACES = [
  { name: "front", pos: [0, 0, 0.5], rot: [0, 0, 0], color: "#ff5722" },
  { name: "back", pos: [0, 0, -0.5], rot: [0, Math.PI, 0], color: "#4caf50" },
  {
    name: "left",
    pos: [-0.5, 0, 0],
    rot: [0, -Math.PI / 2, 0],
    color: "#2196f3",
  },
  {
    name: "right",
    pos: [0.5, 0, 0],
    rot: [0, Math.PI / 2, 0],
    color: "#ffeb3b",
  },
  {
    name: "top",
    pos: [0, 0.5, 0],
    rot: [-Math.PI / 2, 0, 0],
    color: "#9c27b0",
  },
  {
    name: "bottom",
    pos: [0, -0.5, 0],
    rot: [Math.PI / 2, 0, 0],
    color: "#00bcd4",
  },
];

// 指定哪些面触发什么交互
const FACE_A = "front"; // 面A：弹出项目页面
const FACE_B = "right"; // 面B：弹出3D下拉框

// 下拉框选项（每个选项对应一个项目）
const DROPDOWN_ITEMS = [
  { label: "React Project 1", url: "https://react-project1.example.com" },
  { label: "React Project 2", url: "https://react-project2.example.com" },
  { label: "Svelte Project", url: "https://svelte-project.example.com" },
];

// 单个平面组件（支持点击）
interface FacePlaneProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  name: string;
  onClick: (name: string, event: any) => void;
}

function FacePlane({
  position,
  rotation,
  color,
  name,
  onClick,
}: FacePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick(name, e);
      }}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

// 场景内容组件（需要访问相机等）
function SceneContent({
  onOpenModal,
}: {
  onOpenModal: (title: string, url: string) => void;
}) {
  const { controlsRef } = useCamera(); // 获取 controlsRef

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);

  // 处理平面点击
  const handleFaceClick = useCallback(
    (faceName: string, event: any) => {
      if (faceName === FACE_A) {
        // 面A：打开一个固定的项目页面
        onOpenModal("React Demo", "https://example.com/react-demo");
      } else if (faceName === FACE_B) {
        // 面B：显示下拉框，并获取点击位置的世界坐标
        // 获取平面的世界坐标
        const worldPos = event.point; // 点击点的世界坐标
        setDropdownPosition([worldPos.x, worldPos.y + 0.6, worldPos.z]); // 偏移一点
        setDropdownVisible(true);
      } else {
        // 其他面：可以控制台输出，暂不处理
        console.log(`Clicked on ${faceName}`);
      }
    },
    [onOpenModal],
  );

  // 处理下拉框选择
  const handleDropdownSelect = useCallback(
    (item: (typeof DROPDOWN_ITEMS)[0]) => {
      setDropdownVisible(false);
      onOpenModal(item.label, item.url);
    },
    [onOpenModal],
  );

  // 处理下拉框关闭（点击外部或按关闭按钮）
  const handleDropdownClose = useCallback(() => {
    setDropdownVisible(false);
  }, []);

  return (
    <>
      {/* 环境光 + 点光源，让平面有立体感 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* 六个面 */}
      {FACES.map((face) => (
        <FacePlane
          key={face.name}
          name={face.name}
          position={face.pos as [number, number, number]}
          rotation={face.rot as [number, number, number]}
          color={face.color}
          onClick={handleFaceClick}
        />
      ))}

      {/* 3D 下拉框：使用 Html 组件，位置跟随模型面B */}
      {dropdownVisible && (
        <Html position={dropdownPosition} center>
          <ThreeDropdown
            items={DROPDOWN_ITEMS}
            onSelect={handleDropdownSelect}
            onClose={handleDropdownClose}
          />
        </Html>
      )}
      {/* 将 ref 绑定到 OrbitControls */}
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
      <Canvas camera={{ position: [2, 2, 3], fov: 50 }}>
        <SceneContent onOpenModal={onOpenModal} />
      </Canvas>
    </div>
  );
}
