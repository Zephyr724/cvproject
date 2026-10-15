"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Html, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { MODEL_PERF } from "./ModelPerfToggles";

type ModelAction =
  | { type: "embedded"; title: string; url: string }
  | { type: "external"; url: string };

type ModalContent = { url: string; title: string };

const MODEL_ACTIONS: Record<string, ModelAction> = {
  MenuStand: {
    type: "embedded",
    title: "My Projects",
    url: "/projects?embed=1",
  },
  GitHubBag: { type: "external", url: "https://github.com/Zephyr724" },
  LinkedInBag: {
    type: "external",
    url: "https://www.linkedin.com/in/zephyr-chan-7269a06a/",
  },
  VendingMachine: {
    type: "embedded",
    title: "My Experience",
    url: "/about?embed=1#experience",
  },
  FreeBookLibrary: {
    type: "embedded",
    title: "My Education",
    url: "/about?embed=1#education",
  },
  Postbox: {
    type: "embedded",
    title: "Send Me Email",
    url: "mailto:",
  },
};

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

  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  useEffect(() => {
    if (!modalContent) return;

    const closeModalOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalContent(null);
      }
    };

    window.addEventListener("keydown", closeModalOnEscape);

    return () => {
      window.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [modalContent]);

  // Blender's "Plane.005" is sanitized to "Plane005" by GLTFLoader.
  // Toggle hidePlane005 in ModelPerfToggles.tsx to compare the backdrop cost.
  useLayoutEffect(() => {
    const plane005 = scene.getObjectByName("Plane005");
    if (plane005 && MODEL_PERF.hidePlane005) plane005.visible = false;

    return () => {
      if (plane005 && MODEL_PERF.hidePlane005) plane005.visible = true;
    };
  }, [scene]);

  useEffect(() => {
    // Walk through the complete Blender scene and normalize its point lights.
    // This reuses the exported light positions instead of rebuilding them in JSX.
    scene.traverse((object) => {
      if (object instanceof THREE.PointLight) {
        object.visible = !MODEL_PERF.disableImportedPointLights;
        object.intensity = 1;
      }

      if (object instanceof THREE.Mesh) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        for (const material of materials) {
          if (MODEL_PERF.forceFrontSide) material.side = THREE.FrontSide;
          if (
            MODEL_PERF.disableTransmission &&
            material instanceof THREE.MeshPhysicalMaterial &&
            material.transmission > 0
          ) {
            material.transmission = 0;
            material.transparent = true;
            material.opacity = 0.28;
            material.depthWrite = false;
            material.roughness = 0.15;
          }
          material.needsUpdate = true;
        }
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
          const action = findModelAction(event.object);

          if (!action) return;

          // Only a genuine left-button click should trigger a model action.
          // Ignore other buttons and pointer drags that end over an interactive object.
          if (
            event.nativeEvent.button !== 0 ||
            event.nativeEvent.detail === 0 ||
            event.delta > 2
          ) {
            return;
          }

          // Stop the click from reaching parent objects or meshes behind this one.
          event.stopPropagation();
          if (action.type === "embedded") {
            setModalContent({ title: action.title, url: action.url });
            return;
          }

          if (action.type === "external") {
            // Open the external URL in a new tab without giving it access to this page
            // or sending this page's URL as referrer information.
            window.open(action.url, "_blank", "noopener,noreferrer");
          }
        }}
      />

      {modalContent && (
        // Html renders regular DOM above the WebGL canvas. fullscreen makes the
        // overlay cover the canvas rather than follow a point in the 3D scene.
        <Html fullscreen zIndexRange={[100, 0]}>
          {/* The outer backdrop closes the modal; the inner panel stops that click. */}
          <div
            className="flex h-full w-full items-center justify-center bg-black/60 p-4"
            onClick={() => {
              setModalContent(null);
            }}
          >
            <div
              className="flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex h-12 items-center justify-between border-b px-4">
                <h2 className="font-semibold text-slate-900">
                  {modalContent.title}
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    setModalContent(null);
                  }}
                  className="rounded px-3 py-1 text-xl text-slate-900 hover:bg-slate-100"
                  aria-label="Close dialog"
                >
                  ×
                </button>
              </div>

              <iframe
                // embed=1 tells internal pages to hide the site's main navigation.
                src={modalContent.url}
                title={modalContent.title}
                className="min-h-0 flex-1 border-0"
              />
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

function findModelAction(object: THREE.Object3D): ModelAction | undefined {
  let current: THREE.Object3D | null = object;

  while (current) {
    const action = MODEL_ACTIONS[current.name];

    if (action) return action;

    current = current.parent;
  }

  return undefined;
}
