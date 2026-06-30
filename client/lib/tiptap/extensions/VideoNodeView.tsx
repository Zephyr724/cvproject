import { Video } from "@/app/projects/_components/types";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import ReactPlayer from "react-player";

const VideoNodeView = ({
  node,
  updateAttributes,
  deleteNode,
  editor,
}: NodeViewProps) => {
  const video = node.attrs.video as Video;
  const [isEditing, setIsEditing] = useState(false);
  const isEditable = editor.isEditable;

  return (
    <NodeViewWrapper>
      <div className="relative aspect-video w-full group">
        {!isEditing && isEditable && (
          <div className="flex gap-x-1  absolute top-2 right-3 z-20 opacity-10 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              className="btn btn-sm border-2 btn-ghost bg-base-100/80 hover:border-gray-300"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>
            <button
              type="button"
              className="btn btn-sm border-2 btn-ghost bg-base-100/80 text-red-500 hover:border-gray-300"
              onClick={deleteNode}
            >
              ✕
            </button>
          </div>
        )}
        <ReactPlayer
          src={video.src}
          className="absolute inset-0"
          width="100%"
          height="100%"
          controls
          light={true}
        />
        {/* Editing Panel */}
        {isEditing && isEditable && (
          <div
            className="flex flex-col absolute z-10 gap-y-1 top-0  w-full rounded-b bg-gray-300/90 "
            contentEditable={false}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative ">
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-0.5 right-0.5 btn btn-sm border-2 btn-ghost bg-base-100/80 text-red-500 hover:border-gray-300"
                onClick={() => setIsEditing(false)}
              >
                ✕
              </button>
              <div className=" bg-blue-200 px-2 py-1 mb-1 font-bold">Video</div>

              <div className="flex gap-1 px-2 items-center mb-2">
                <span>URL:</span>
                <input
                  type="text"
                  name="video_src"
                  className="flex-5 input input-xs h-7 border border-gray-300 "
                  placeholder="Video src"
                  value={video.src}
                  onChange={(e) =>
                    updateAttributes({ video: { src: e.target.value } })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default VideoNodeView;
