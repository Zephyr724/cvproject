import { Image, Layout } from "@/app/projects/_components/types";
import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageCarouselNodeView } from "./ImageCarouselNodeView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageCarousel: {
      insertImageCarousel: (images: Image[]) => ReturnType;
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
        default: [] as { url: string; alt?: string }[],
      },
      layout: {
        default: "full" as Layout,
      },
      width: {
        default: "full",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        "data-type": "image-carousel", // 标记这个 div 是 simpleBox 节点
        ...HTMLAttributes,
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageCarouselNodeView);
  },

  addCommands() {
    return {
      insertImageCarousel:
        () =>
        ({ commands }) =>
          commands.insertContent([
            {
              type: this.name,
              attrs: {
                images: [
                  {
                    url: "https://loremflickr.com/800/600?random=1",
                    alt: "",
                  },
                ],
              },
            },

            { type: "paragraph" },
          ]),
    };
  },
});
