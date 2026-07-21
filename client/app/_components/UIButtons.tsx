"use client";

import { useCamera } from "../context/CameraContext";

export function UIButtons() {
  const { resetCamera } = useCamera();

  return (
    <div className="fixed bottom-4 right-4 z-10 flex gap-2">
      <button
        onClick={resetCamera}
        className="bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-black/90 transition"
      >
        Reset Camera
      </button>
      {/* 其他按钮... */}
    </div>
  );
}
