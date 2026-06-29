"use client";
import { TextStyleKit } from "@tiptap/extension-text-style/text-style-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageCarouselNode } from "./ImageCarouselNode";
import { useEffect } from "react";

interface Props {
  content: object;
}

const TiptapRenderer = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyleKit, ImageCarouselNode],
    content,
    editable: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="bg-gray-600 rounded text-white p-3">
      <div className="bg-gray-400  p-4 overflow-hidden">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapRenderer;
