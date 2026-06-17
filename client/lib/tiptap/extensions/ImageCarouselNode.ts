import { Image } from "@/app/projects/_components/types";
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
        // default: {
        //   id: 111,
        //   alt: "An image",
        //   url: "https://picsum.photos/1280/720",
        // },
        default: [] as { url: string; alt?: string }[],
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
      0, // 0 = 空元素（有洞 hole），子内容由编辑器管理
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
                images: [{ url: "https://picsum.photos/800/600", alt: "图1" }],
              },
            },

            { type: "paragraph" },
          ]),
    };
  },
});
