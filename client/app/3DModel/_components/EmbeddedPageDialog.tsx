import { Html } from "@react-three/drei";
import type { EmbeddedModelAction } from "../_lib/modelActions";
import { useEffect } from "react";

interface Props {
  action: EmbeddedModelAction;
  onClose: () => void;
}

export default function EmbeddedPageDialog({ action, onClose }: Props) {
  useEffect(() => {
    const closeModalOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeModalOnEscape);

    return () => {
      window.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [onClose]);

  return (
    // Html renders regular DOM above the WebGL canvas. fullscreen makes the
    // overlay cover the canvas rather than follow a point in the 3D scene.
    <Html fullscreen zIndexRange={[100, 0]}>
      {/* The outer backdrop closes the modal; the inner panel stops that click. */}
      <div
        className="flex h-full w-full items-center justify-center bg-black/60 p-4"
        onClick={() => {
          onClose();
        }}
      >
        {/* Dialog panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="embedded-page-dialog-title"
          className="flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex h-12 items-center justify-between border-b px-4">
            <h2
              id="embedded-page-dialog-title"
              className="font-semibold text-slate-900"
            >
              {action.title}
            </h2>

            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="rounded px-3 py-1 text-xl text-slate-900 hover:bg-slate-100"
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>

          <iframe
            // embed=1 tells internal pages to hide the site's main navigation.
            src={action.url}
            title={action.title}
            className="min-h-0 flex-1 border-0"
          />
        </div>
      </div>
    </Html>
  );
}
