"use client";

import { useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import useModelPerfOverrides from "../_hooks/useModelPerfOverrides";
import useMenuPosterTexture from "../_hooks/useMenuPosterTexture";
import {
  createModelActions,
  type EmbeddedModelAction,
  findModelAction,
  ModelProfileContext,
} from "../_lib/modelActions";
import EmbeddedPageDialog from "./EmbeddedPageDialog";
import useEntranceDoor from "../_hooks/useEntranceDoor";

interface CoffeeShopModelProps {
  profile: ModelProfileContext;
}

export function CoffeeShopModel({ profile }: CoffeeShopModelProps) {
  // `scene` is the root Object3D containing all meshes, lights, and groups from Blender.
  const { scene } = useGLTF("/models/coffee_shop-all.glb");

  const [activeEmbeddedAction, setActiveEmbeddedAction] =
    useState<EmbeddedModelAction | null>(null);

  const modelActions = useMemo(() => createModelActions(profile), [profile]);

  const { handleDoorClick } = useEntranceDoor(scene);
  useModelPerfOverrides(scene);
  useMenuPosterTexture(scene);

  const handleModelClick = (event: ThreeEvent<MouseEvent>) => {
    // Only a genuine left-button click should trigger a model action.
    // Ignore other buttons and pointer drags that end over an interactive object.
    if (
      event.nativeEvent.button !== 0 ||
      event.nativeEvent.detail === 0 ||
      event.delta > 2
    ) {
      return;
    }

    const wasDoorClick = handleDoorClick(event.object);

    if (wasDoorClick) {
      event.stopPropagation();
      return;
    }

    const action = findModelAction(event.object, modelActions);

    if (!action) return;

    // Stop the click from reaching parent objects or meshes behind this one.
    event.stopPropagation();
    if (action.type === "embedded") {
      setActiveEmbeddedAction(action);
      return;
    }

    if (action.type === "external") {
      // Open the external URL in a new tab without giving it access to this page
      // or sending this page's URL as referrer information.
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <primitive
        // `primitive` inserts the already-built Three.js scene into React Three Fiber.
        object={scene}
        onClick={handleModelClick}
      />

      {activeEmbeddedAction && (
        <EmbeddedPageDialog
          action={activeEmbeddedAction}
          onClose={() => setActiveEmbeddedAction(null)}
        />
      )}
    </>
  );
}
