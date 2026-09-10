"use client";

import { useEffect, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

export function MainModel() {
  const { scene } = useGLTF("/models/coffee_shop-all.glb");

  const [projectsOpen, setProjectsOpen] = useState(false);

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.PointLight) {
        object.visible = true;
        object.intensity = 1;
      }
    });
  }, [scene]);

  return (
    <>
      <primitive
        object={scene}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          if (!isMenuBoard(event.object)) return;
          event.stopPropagation();
          setProjectsOpen(true);
        }}
      />

      {projectsOpen && (
        <Html fullscreen zIndexRange={[100, 0]}>
          <div
            className="flex h-full w-full items-center justify-center bg-black/60 p-4"
            onClick={() => setProjectsOpen(false)}
          >
            <div
              className="flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex h-12 items-center justify-between border-b px-4">
                <h2 className="font-semibold text-slate-900">Projects</h2>

                <button
                  type="button"
                  onClick={() => setProjectsOpen(false)}
                  className="rounded px-3 py-1 text-xl text-slate-900 hover:bg-slate-100"
                >
                  ×
                </button>
              </div>

              <iframe
                src="/projects?embed=1"
                title="Projects"
                className="min-h-0 flex-1 border-0"
              />
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

function isMenuBoard(object: THREE.Object3D) {
  let current: THREE.Object3D | null = object;

  while (current) {
    if (current.name === "MenuStand") {
      return true;
    }

    current = current.parent;
  }

  return false;
}
