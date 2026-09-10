"use client";

import { useEffect, useState } from "react";
import { Html, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

export function MainModel() {
  // `scene` is the root Object3D containing all meshes, lights, and groups from Blender.
  const { scene } = useGLTF("/models/coffee_shop-all.glb");

  // Load the Projects poster separately so it can replace the material texture
  // on the matching mesh inside the GLB scene.
  const posterTexture = useTexture(
    "/images/projects-poster.jpeg",
    (texture) => {
      // JPEG colors are authored in sRGB. GLTF texture coordinates also expect
      // this replacement image to be flipped vertically for the correct orientation.
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
    },
  );

  const [projectsOpen, setProjectsOpen] = useState(false);

  useEffect(() => {
    // Walk through the complete Blender scene and normalize its point lights.
    // This reuses the exported light positions instead of rebuilding them in JSX.
    scene.traverse((object) => {
      if (object instanceof THREE.PointLight) {
        object.visible = true;
        object.intensity = 1;
      }
    });
  }, [scene]);

  useEffect(() => {
    // Blender object names are preserved in a GLB, so the poster mesh can be
    // located without depending on its position in the scene hierarchy.
    const poster = scene.getObjectByName("MenuPoster");

    if (!(poster instanceof THREE.Mesh)) {
      console.warn("MenuPoster was not found in the GLB scene");
      return;
    }

    const material = poster.material as THREE.MeshStandardMaterial;

    // Replace only this mesh's color map. Resetting the base color to white
    // prevents it from tinting the poster, and needsUpdate refreshes the shader.
    material.map = posterTexture;
    material.color.set("#ffffff");
    material.needsUpdate = true;
  }, [scene, posterTexture]);

  return (
    <>
      <primitive
        // `primitive` inserts the already-built Three.js scene into React Three Fiber.
        object={scene}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          // Ignore clicks outside the menu stand. A valid click opens the HTML overlay.
          if (!isMenuBoard(event.object)) return;
          event.stopPropagation();
          setProjectsOpen(true);
        }}
      />

      {projectsOpen && (
        // Html renders regular DOM above the WebGL canvas. fullscreen makes the
        // overlay cover the canvas rather than follow a point in the 3D scene.
        <Html fullscreen zIndexRange={[100, 0]}>
          {/* The outer backdrop closes the modal; the inner panel stops that click. */}
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
                // embed=1 tells the Projects page to hide its own navigation bar.
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

  // A pointer ray usually hits a child mesh rather than the top-level MenuStand
  // group. Follow each parent until that group is found or the scene root is passed.
  while (current) {
    if (current.name === "MenuStand") {
      return true;
    }

    current = current.parent;
  }

  return false;
}
