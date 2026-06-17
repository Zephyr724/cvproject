import { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useEffect } from "react";

export const ImageCarouselNodeView = ({
  node,
  updateAttributes,
}: NodeViewProps) => {
  const images = node.attrs.images;

  const updateImages = (url: string) => {
    const next = images.map((img, i) => (i === 0 ? { ...img, url } : img));
    updateAttributes({ images: next });
  };

  const currentUrl = images[0]?.url ?? "";

  useEffect(() => {
    console.log(currentUrl);
  });

  return (
    <NodeViewWrapper className=" flex flex-col group">
      {images?.map((image) => (
        <div className="flex flex-col relative">
          <img src={image.url} alt={image.alt} />
          <div className="flex gap-x-1 absolute top-2 right-3 opacity-10 group-hover:opacity-100 transition-opacity">
            <button className="btn btn-xs border-2 btn-ghost bg-base-100/80 hover:border-gray-400">
              ✏️ Edit
            </button>
            <button className="btn btn-xs border-2 btn-ghost bg-base-100/80 text-red-500 hover:border-gray-400">
              ✕
            </button>
          </div>
        </div>
      ))}

      <input
        type="text"
        id="url"
        name="url"
        className="input input-sm w-full border border-gray-300"
        placeholder="Image URL"
        value={currentUrl}
        onChange={(e) => updateImages(e.target.value)}
      />
    </NodeViewWrapper>
  );
};
