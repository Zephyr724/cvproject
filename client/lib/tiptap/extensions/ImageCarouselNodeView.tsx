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
    "100%": "w-full",
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
        alt: "图2",
      },
    ];
    updateAttributes({ images: newImages });
  };

  const updateImages = (url: string, index: number) => {
    const updatedImages = images.map((img, i) =>
      i === index ? { ...img, url } : img,
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
            className="flex flex-col absolute gap-y-0.5 top-0 p-1 w-full rounded-b bg-gray-200/80 "
            contentEditable={false}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                className="absolute top-0 right-0 btn btn-xs border-2 btn-ghost bg-base-100/80 text-red-500 hover:border-gray-300"
                onClick={() => setIsEditing(false)}
              >
                ✕
              </button>

              {/* Layout Panel */}
              <div className="flex gap-1">
                {["full", "left", "right"].map((layout) => (
                  <button
                    className="btn btn-xs border btn-ghost bg-base-100/90 hover:border-gray-400"
                    onClick={() => updateAttributes({ layout })}
                  >
                    {layout}
                  </button>
                ))}

                <select
                  className="rounded-2xl border bg-base-100/90 hover:border-gray-400 text-center"
                  name="width"
                  id="width-select"
                  onChange={(e) => updateAttributes({ width: e.target.value })}
                >
                  <option  value="">
                    Select width
                  </option>
                  {["full", "75%", "66%", "50%", "33%"].map((width) => (
                    <option  value={width}>
                      {width}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {images.map((image, index) => (
              <div key={index} className="flex gap-1">
                <input
                  type="text"
                  key={index}
                  name="url"
                  className="input input-xs w-[90%] border border-gray-300"
                  placeholder="Image URL"
                  value={image.url}
                  onChange={(e) => updateImages(e.target.value, index)}
                />
                <button
                  className="btn btn-xs border btn-ghost bg-base-100/80 text-red-500 hover:border-gray-300"
                  onClick={(e) => deleteImages(index)}
                >
                  🗑️
                </button>
              </div>
            ))}

            <button onClick={addImage}> + </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
