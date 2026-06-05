"use client";

import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { useState } from "react";
import type { CarouselImage, ImageLayout } from "./ImageCarouselNode";

// ── Container class: float for left/right, block for full ──
const containerClass = (layout: ImageLayout) => {
  switch (layout) {
    case "left":
      return "mr-left mr-5 mb-4";
    case "right":
      return "float-right ml-5 mb-4";
    default:
      return "block w-full clear-both";
  }
};

export function ImageCarouselNodeView({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) {
  const images = node.attrs.images as CarouselImage[];
  const layout = (node.attrs.layout as ImageLayout) ?? "full";
  const width = (node.attrs.width as string) ?? "100%";
  const [isEditing, setIsEditing] = useState(images.length === 0);

  const setLayout = (l: ImageLayout) => {
    updateAttributes({
      layout: l,
      width: l === "full" ? "100%" : "66%",
    });
  };
  const setWidth = (w: string) => updateAttributes({ width: w });

  const updateImage = (idx: number, field: "url" | "alt", value: string) => {
    const next = images.map((img, i) =>
      i === idx ? { ...img, [field]: value } : img,
    );
    updateAttributes({ images: next });
  };

  const addImage = () => {
    updateAttributes({ images: [...images, { url: "", alt: "" }] });
  };

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    if (next.length === 0) deleteNode();
    else updateAttributes({ images: next });
  };

  const currentImage = images[0];

  // ── Empty state ──
  if (!currentImage) {
    return (
      <NodeViewWrapper>
        <div className="clear-both border border-dashed border-base-300 rounded-lg p-6 text-center text-base-content/50">
          🖼 Empty Carousel
          <br />
          <button
            className="btn btn-sm btn-ghost mt-2"
            onClick={() => setIsEditing(true)}
          >
            Add Images
          </button>
        </div>
      </NodeViewWrapper>
    );
  }

  // ── Edit mode ──
  if (isEditing) {
    return (
      <NodeViewWrapper>
        <div className="clear-both border border-info rounded-lg p-3 space-y-3 bg-base-200">
          <div className="text-xs font-semibold text-info mb-1">
            🖼 Editing Carousel ({images.length} image
            {images.length !== 1 ? "s" : ""})
          </div>

          {/* Layout controls */}
          <div
            className="flex items-center gap-2 flex-wrap"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="text-xs font-medium">Layout:</span>
            {(["full", "left", "right"] as ImageLayout[]).map((l) => (
              <button
                key={l}
                className={`btn btn-xs ${layout === l ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setLayout(l)}
              >
                {l === "full" ? "⬜ Full" : l === "left" ? "⬅ Left" : "➡ Right"}
              </button>
            ))}
            <span className="text-xs font-medium ml-2">Width:</span>
            <select
              className="select select-xs select-bordered"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              disabled={layout === "full"}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="100%">100%</option>
              <option value="75%">75%</option>
              <option value="66%">66%</option>
              <option value="50%">50%</option>
              <option value="33%">33%</option>
              <option value="25%">25%</option>
              <option value="300px">300px</option>
              <option value="200px">200px</option>
            </select>
          </div>

          {/* Image list */}
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 flex-wrap sm:flex-nowrap"
            >
              {img.url && (
                <img
                  src={img.url}
                  alt={img.alt ?? ""}
                  className="w-12 h-8 object-cover rounded shrink-0"
                />
              )}
              <input
                className="input input-xs input-bordered flex-1 min-w-0"
                placeholder="Image URL"
                value={img.url}
                onChange={(e) => updateImage(idx, "url", e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
              />
              <input
                className="input input-xs input-bordered w-24 shrink-0"
                placeholder="alt"
                value={img.alt ?? ""}
                onChange={(e) => updateImage(idx, "alt", e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
              />
              <button
                className="btn btn-xs btn-ghost text-error shrink-0"
                onClick={() => removeImage(idx)}
              >
                ✕
              </button>
            </div>
          ))}
          <button className="btn btn-xs btn-outline" onClick={addImage}>
            + Add Image
          </button>

          <div className="flex gap-2 pt-1">
            <button
              className="btn btn-xs btn-success"
              onClick={() => setIsEditing(false)}
            >
              Done
            </button>
            <button
              className="btn btn-xs btn-error"
              onClick={() => deleteNode()}
            >
              Delete Carousel
            </button>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  // ── Preview mode ──
  const isFloating = layout === "left" || layout === "right";

  return (
    <NodeViewWrapper
      className={`relative group border border-base-300 rounded-lg overflow-hidden ${
        layout === "full"
          ? "w-full"
          : isFloating
            ? `${layout === "left" ? "float-left mr-5 mb-4" : "float-right ml-5 mb-4"}`
            : ""
      }`}
      style={isFloating ? { width } : undefined}
    >
      <div className="aspect-video bg-base-200 relative">
        <img
          src={currentImage.url}
          alt={currentImage.alt ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {images.length > 1 && (
          <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
            1/{images.length}
          </span>
        )}
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          className="btn btn-xs btn-ghost bg-base-100/80"
          onClick={() => setIsEditing(true)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-xs btn-ghost bg-base-100/80 text-error"
          onClick={() => deleteNode()}
        >
          ✕
        </button>
      </div>
    </NodeViewWrapper>
  );
}
