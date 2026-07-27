"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import ContentEditorToolBar from "./ContentEditorToolBar";
import { TextStyleKit } from "@tiptap/extension-text-style/text-style-kit";
import { ImageCarouselNode } from "@/lib/tiptap/extensions/ImageCarouselNode";
import { VideoNode } from "@/lib/tiptap/extensions/VideoNode";

interface Props {
  title: string;
  onChange: (json: object) => void;
  initialContent?: object;
  haveMedia: boolean;
}

const ContentEditorWYSIWYG = ({
  title,
  onChange,
  initialContent,
  haveMedia,
}: Props) => {
  const [jsonOutput, setJsonOutput] = useState("");
  const editor = useEditor({
    extensions: [StarterKit, TextStyleKit, ImageCarouselNode, VideoNode],
    content:
      initialContent ??
      "<p> 🌈 Start editing here, you can edit with the text, carousel images and videos.</p>",
    onUpdate: ({ editor }) => {
      setJsonOutput(JSON.stringify(editor.getJSON(), null, 2));
      onChange(editor.getJSON());
    },

    editorProps: {
      attributes: {
        class: "tiptap outline-none min-h-[200px] px-4 py-3",
        style: "--line-height:1.6",
      },
    },
  });

  if (!editor) return null;

  return (
    <div>
      <div className="mb-2">{title}</div>

      {/* Tools bar */}
      <ContentEditorToolBar editor={editor} haveMedia={haveMedia} />

      {/* Editor */}
      <div className="border border-gray-300 rounded bg-base-100 p-1 overflow-hidden ">
        <EditorContent editor={editor} />
      </div>

      {/* Display actual JSON, just for test, Delete it when project publishes */}
      {/* JSON Live Preview */}
      <div className="space-y-2">
        <label className="label-text font-semibold">
          Live JSON Output (updates as you type):
        </label>
        <pre className="bg-neutral text-neutral-content p-4 rounded-lg text-xs overflow-auto max-h-96 whitespace-pre-wrap">
          {jsonOutput || "Start editing to see JSON..."}
        </pre>
      </div>
    </div>
  );
};

export default ContentEditorWYSIWYG;
