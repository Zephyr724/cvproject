"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { OrbitControls } from "@react-three/drei";

type OrbitControlsRef = React.ElementRef<typeof OrbitControls>;

interface CameraContextValue {
  controlsRef: React.RefObject<OrbitControlsRef | null>;
  resetCamera: () => void;
}

const CameraContext = createContext<CameraContextValue | undefined>(undefined);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const controlsRef = useRef<OrbitControlsRef>(null);

  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      // reset target point
      controlsRef.current.target.set(0, 0, 0);
      // reset camera postion
      controlsRef.current.object.position.set(2, 2, 3);
      // update controller
      controlsRef.current.update();
    }
  }, []);

  return (
    <CameraContext.Provider value={{ controlsRef, resetCamera }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within CameraProvider");
  }
  return context;
};
