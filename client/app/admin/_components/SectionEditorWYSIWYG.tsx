"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

const SectionEditorWYSIWYG = () => {
  const [jsonOutput, setJsonOutput] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content:
      "<p> 🌈 Start editing here, you can edit with the text, carousel images and videos.</p>",
    onUpdate: ({ editor }) => {
      setJsonOutput(JSON.stringify(editor.getJSON(), null, 2));
    },

    editorProps: {
      attributes: {
        class: "outline-none min-h-[200px] px-4 py-3",
        style: "--line-height:1.6",
      },
    },
  });

  //   if (editor!) return null;

  return (
    <div>
      <div>Project Details:</div>

      {/* Tools bar */}
      <div className="border border-gray-300 rounded bg-base-100 p-1 ">
        <button
          key={"bold"}
          title="Bold"
          className="btn btn-sm btn-ghost border hover:border-black-200 hover:bg-black-100"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
      </div>

      {/* Editor */}
      <div className="border border-gray-300 rounded bg-base-100 p-1 ">
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

export default SectionEditorWYSIWYG;
