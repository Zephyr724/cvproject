"use client";
import { TextStyleKit } from "@tiptap/extension-text-style/text-style-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageCarouselNode } from "./ImageCarouselNode";
import { useEffect } from "react";
import { VideoNode } from "./VideoNode";

interface Props {
  content: object;
  isProject?: boolean;
}

const TiptapRenderer = ({ content, isProject = true }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyleKit, ImageCarouselNode, VideoNode],
    content,
    editable: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  if (!isProject) {
    return (
      <div className="">
        <div className="overflow-hidden">
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-600 rounded text-white p-3">
      <div className="bg-gray-400  p-4 overflow-hidden">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapRenderer;
