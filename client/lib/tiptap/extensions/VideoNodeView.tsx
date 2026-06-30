import { Video } from "@/app/projects/_components/types";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import ReactPlayer from "react-player";

const VideoNodeView = ({
  node,
  updateAttributes,
  deleteNode,
  editor,
}: NodeViewProps) => {
  const video = node.attrs.video as Video;

  return (
    <NodeViewWrapper>
       <div className="relative aspect-video w-full">  
        <ReactPlayer
          src={video.src}
          className="absolute inset-0"
          width="100%"
          height="100%"
          controls
          light={true}
        />
      </div>
    </NodeViewWrapper>
  );
};

export default VideoNodeView;
