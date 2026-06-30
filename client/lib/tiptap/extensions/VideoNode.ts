import { Video } from "@/app/projects/_components/types";
import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VideoNodeView from "./VideoNodeView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Video: {
      insertVideo: (video: Video) => ReturnType;
    };
  }
}

export const VideoNode = Node.create({
  name: "video",
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      video: {
        default: {
          src: "https://youtu.be/nK9d09fFSyc",
        } as Video,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "video", ...HTMLAttributes }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeView);
  },

  addCommands() {
    return {
      insertVideo:
        () =>
        ({ commands }) =>
          commands.insertContent([
            {
              type: this.name,
              attrs: {
                video: {
                  src: "https://youtu.be/nK9d09fFSyc",
                },
              },
            },
            { type: "paragraph" },
          ]),
    };
  },
});
