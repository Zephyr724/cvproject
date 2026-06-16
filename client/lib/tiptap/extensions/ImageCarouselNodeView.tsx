import { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";

export const ImageCarouselNodeView = ({ node }: NodeViewProps) => {
  const images = node.attrs.images;
  return (
    <NodeViewWrapper>
      <div>{/* Images Carousel */}</div>
    </NodeViewWrapper>
  );
};
