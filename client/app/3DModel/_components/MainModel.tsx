"use client";

import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface MainModelProps {
  onBoundsReady: (box: THREE.Box3) => void;
}

export function MainModel({ onBoundsReady }: MainModelProps) {
  // Load the GLB file and get its root scene.
  const { scene } = useGLTF("/models/coffee_shop-all.glb");

  // Store a reference to the loaded Three.js scene.
  const modelRef = useRef<THREE.Group>(null);

  // Store the calculated bounding box.
  const [bounds, setBounds] = useState<THREE.Box3 | null>(null);

  useEffect(() => {
    const model = modelRef.current;

    if (!model) return;

    // Update all world transforms before measuring the model.
    model.updateWorldMatrix(true, true);

    // Create a box that contains the complete model.
    const box = new THREE.Box3();

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      // GLTFLoader 会把 Plane.005 清理成 Plane005
      if (object.name === "Plane005") return;

      const objectBox = new THREE.Box3().setFromObject(object);
      box.union(objectBox);
    });

    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    console.log("Box3 min:", box.min.toArray());
    console.log("Box3 max:", box.max.toArray());
    console.log("Model center:", center.toArray());
    console.log("Model size:", size.toArray());

    setBounds(box);
    onBoundsReady(box);
  }, [scene, onBoundsReady]);

  return (
    <>
      {/* Add the loaded Three.js scene to the Canvas. */}
      <primitive ref={modelRef} object={scene} />

      {/* Display the model bounds as a yellow wireframe. */}
      {bounds && <box3Helper args={[bounds, 0xffff00]} />}
    </>
  );
}
