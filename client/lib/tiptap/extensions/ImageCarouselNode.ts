import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageCarouselNodeView } from "./ImageCarouselNodeView";

export interface CarouselImage {
  url: string;
  alt?: string;
}

export type ImageLayout = "full" | "left" | "right";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageCarousel: {
      insertImageCarousel: (images: CarouselImage[]) => ReturnType;
    };
  }
}
export const ImageCarouselNode = Node.create({
  name: "imageCarousel",
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      images: {
        default: [] as CarouselImage[],
        parseHTML: (el) => {
          const data = el.getAttribute("data-images");
          return data ? JSON.parse(data) : [];
        },
        renderHTML: ({ images }: { images: CarouselImage[] }) => ({
          "data-images": JSON.stringify(images),
        }),
      },
      layout: {
        default: "full" as ImageLayout,
        parseHTML: (el) =>
          (el.getAttribute("data-layout") as ImageLayout) ?? "full",
        renderHTML: ({ layout }: { layout: ImageLayout }) => ({
          "data-layout": layout,
        }),
      },
      width: {
        default: "100%",
        parseHTML: (el) => el.getAttribute("data-width") ?? "100%",
        renderHTML: ({ width }: { width: string }) => ({
          "data-width": width,
        }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "image-carousel", ...HTMLAttributes }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageCarouselNodeView);
  },

  addCommands() {
    return {
      insertImageCarousel:
        (images: CarouselImage[]) =>
        ({ commands }) =>
          commands.insertContent([
            { type: this.name, attrs: { images } },
            { type: "paragraph" },
          ]),
    };
  },
});
