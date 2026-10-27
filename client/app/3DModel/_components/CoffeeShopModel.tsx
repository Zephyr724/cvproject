"use client";

import { useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import useModelPerfOverrides from "../_hooks/useModelPerfOverrides";
import useMenuPosterTexture from "../_hooks/useMenuPosterTexture";
import {
  createModelActions,
  type EmbeddedModelAction,
  findModelAction,
  ModelAction,
  type ModelProfileContext,
} from "../_lib/modelActions";
import EmbeddedPageDialog from "./EmbeddedPageDialog";
import useEntranceDoor from "../_hooks/useEntranceDoor";
import useVendingScreen from "../_hooks/useVendingScreen";
import VendingMachineExperienceScreen from "./VendingMachineExperienceScreen";
import type { Experience } from "@/app/admin/experience/types";

interface CoffeeShopModelProps {
  profile: ModelProfileContext;
  experiences: Experience[];
}

export function CoffeeShopModel({
  profile,
  experiences,
}: CoffeeShopModelProps) {
  // `scene` is the root Object3D containing all meshes, lights, and groups from Blender.
  const { scene } = useGLTF("/models/coffee_shop-all.glb");

  const [activeEmbeddedAction, setActiveEmbeddedAction] =
    useState<EmbeddedModelAction | null>(null);

  const modelActions = useMemo(() => createModelActions(profile), [profile]);

  const { handleDoorClick } = useEntranceDoor(scene);
  useModelPerfOverrides(scene);
  useMenuPosterTexture(scene);

  // Prepare the GLB screen material and calculate the transform used to place
  // the UIKit experience interface directly over the vending-machine display.
  const screenLayout = useVendingScreen(scene);

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

    executeModelAction(action);
  };

  const executeModelAction = (action: ModelAction) => {
    if (action.type === "embedded") {
      setActiveEmbeddedAction(action);
      return;
    }

    window.open(action.url, "_blank", "noopener,noreferrer");
  };

  const openExperiencePage = (experienceId: number) => {
    setActiveEmbeddedAction({
      type: "embedded",
      title: "My Experience",
      url:
        `/${encodeURIComponent(profile.slug)}/experience` +
        `?embed=1#experience-${experienceId}`,
    });
  };

  return (
    <>
      <primitive
        // `primitive` inserts the already-built Three.js scene into React Three Fiber.
        object={scene}
        onClick={handleModelClick}
      />

      {screenLayout && (
        <VendingMachineExperienceScreen
          screenLayout={screenLayout}
          experiences={experiences}
          openExperiencePage={openExperiencePage}
        />
      )}

      {activeEmbeddedAction && (
        <EmbeddedPageDialog
          action={activeEmbeddedAction}
          onClose={() => setActiveEmbeddedAction(null)}
        />
      )}
    </>
  );
}
