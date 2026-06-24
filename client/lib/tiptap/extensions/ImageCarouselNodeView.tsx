"use client";
import { ImageCarousel } from "@/app/components/ImageCarousel";
import { Image, Layout } from "@/app/projects/_components/types";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";

export const ImageCarouselNodeView = ({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) => {
  const images = node.attrs.images as Image[];
  const layout = node.attrs.layout as Layout;
  const width = node.attrs.width;

  const widthClassMap: Record<string, string> = {
    full: "w-full",
    "75%": "w-3/4",
    "66%": "w-2/3",
    "50%": "w-1/2",
    "33%": "w-1/3",
  };

  const layoutClassMap: Record<string, string> = {
    full: "",
    left: "float-left mr-4",
    right: "float-right ml-4",
  };

  const [isEditing, setIsEditing] = useState(false);

  const addImage = () => {
    const newImages = [
      ...images,
      {
        url: `https://loremflickr.com/800/600?random=${Math.ceil(Math.random() * 20)}`,
        alt: "",
      },
    ];
    updateAttributes({ images: newImages });
  };

  const updateImages = (field: "url" | "alt", value: string, index: number) => {
    const updatedImages = images.map((img, i) =>
      i === index ? { ...img, [field]: value } : img,
    );
    updateAttributes({ images: updatedImages });
  };

  const deleteImages = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    updateAttributes({ images: updatedImages });
  };

  return (
    <NodeViewWrapper
      className={`flex flex-col group ${layoutClassMap[layout]} ${widthClassMap[width]}`}
    >
      <div className="relative w-full min-h-64 rounded">
        <ImageCarousel
          images={images}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onDelete={deleteNode}
        />
        {/* Editing Panel */}
        {isEditing && (
          <div
            className="flex flex-col absolute gap-y-1 top-0  w-full rounded-b bg-gray-300/90 "
            contentEditable={false}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative ">
              {/* Close Button */}
              <button
                className="absolute top-0 right-0 btn btn-xs border-2 btn-ghost bg-base-100/80 text-red-500 hover:border-gray-300"
                onClick={() => setIsEditing(false)}
              >
                ✕
              </button>

              {/* Layout Panel */}
              <div className=" bg-blue-200 px-2 py-1 font-bold">Display</div>
              <div className="flex gap-2 bg-blue-200 px-2 pb-2 mb-2">
                <span>Layout:</span>
                {["full", "left", "right"].map((l) => (
                  <button
                    key={l}
                    className={`btn btn-xs border-2 btn-ghost bg-base-100/90 hover:border-gray-400 hover:bg-gray-200 ${
                      layout === l
                        ? "btn-active bg-blue-300 border-blue-400"
                        : ""
                    }`}
                    onClick={() => {
                      updateAttributes({
                        layout: l,
                        ...(l === "full"
                          ? { width: "full" }
                          : width == "full"
                            ? { width: "75%" }
                            : {}),
                      });
                    }}
                  >
                    {l === "full"
                      ? "🖼️ Full"
                      : l === "left"
                        ? "⬅️ Left"
                        : "➡️ Right"}
                  </button>
                ))}
                <span>Width:</span>
                <select
                  className={`rounded border-2 w-40 bg-base-100/90 text-center hover:border-gray-400 hover:bg-gray-200
                    ${
                      layout === "full"
                        ? "opacity-50 pointer-events-none  bg-gray-100 text-gray-400 border-gray-300"
                        : "bg-base-100/90 hover:border-gray-400 hover:bg-gray-200"
                    }
                    
                    `}
                  name="width"
                  value={width}
                  disabled={layout === "full"}
                  id="width-select"
                  onChange={(e) => updateAttributes({ width: e.target.value })}
                >
                  <option value="" disabled>
                    Select width
                  </option>
                  {["full", "75%", "66%", "50%", "33%"].map((w) => (
                    <option
                      value={w}
                      key={w}
                      disabled={layout !== "full" && w === "full"}
                    >
                      {w === "full" ? "Full" : w}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {images.map((image, index) => (
              <div key={index} className="flex gap-1 px-1 items-center">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-12 h-12 rounded object-cover shrink-0 "
                />
                <input
                  type="text"
                  key={`url-${index}`}
                  name="url"
                  className="flex-5 input input-xs  border border-gray-300"
                  placeholder="Image URL"
                  value={image.url}
                  onChange={(e) => updateImages("url", e.target.value, index)}
                />
                <input
                  type="text"
                  key={`alt-${index}`}
                  name="alt"
                  className="flex-2 input input-xs border border-gray-300"
                  placeholder="Alt text (e.g., 'Homepage screenshot')"
                  value={image.alt}
                  onChange={(e) => updateImages("alt", e.target.value, index)}
                />
                <button
                  key={`imageCarouselImage-${index}`}
                  className="btn btn-xs border btn-ghost bg-base-100/80 text-red-500 hover:border-gray-300"
                  onClick={() => deleteImages(index)}
                >
                  🗑️
                </button>
              </div>
            ))}
            <div className="flex justify-center py-1">
              {" "}
              <button
                className="btn btn-primary btn-xs w-100"
                onClick={addImage}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
