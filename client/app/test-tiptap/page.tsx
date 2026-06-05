"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useState } from "react";
import { TextStyleKit } from "@tiptap/extension-text-style/text-style-kit";

// Toolbar button definitions
const TOOLS = [
  { label: "B", action: "toggleBold", title: "Bold Ctrl+B" },
  {
    label: "I",
    action: "toggleItalic",
    title: "Italic Ctrl+I",
    className: "italic",
  },
  {
    label: "H1",
    action: "toggleHeading",
    attrs: { level: 1 },
    title: "Heading 1",
  },
  {
    label: "H2",
    action: "toggleHeading",
    attrs: { level: 2 },
    title: "Heading 2",
  },
  { label: "•", action: "toggleBulletList", title: "Bullet List" },
  { label: "1.", action: "toggleOrderedList", title: "Ordered List" },
  { label: "—", action: "setHorizontalRule", title: "Horizontal Rule" },
  { label: "❝", action: "toggleBlockquote", title: "Blockquote" },
  { label: "<>", action: "toggleCodeBlock", title: "Code Block" },
];

export default function TestTiptapPage() {
  const [jsonOutput, setJsonOutput] = useState("");
  const [loadInput, setLoadInput] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, TextStyleKit],
    content: "<p>Hello world! 🌈 Start editing here...</p>",
    onUpdate: ({ editor }) => {
      // Sync JSON in real-time
      setJsonOutput(JSON.stringify(editor.getJSON(), null, 2));
    },
    editorProps: {
      attributes: {
        class: "tiptap max-w-none outline-none min-h-[200px] px-4 py-3",
      },
    },
  });

  const handleLoadJson = useCallback(() => {
    if (!editor || !loadInput.trim()) return;
    try {
      const json = JSON.parse(loadInput);
      editor.commands.setContent(json);
    } catch {
      alert("Invalid JSON!");
    }
  }, [editor, loadInput]);

  if (!editor) return null;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">🧪 Tiptap Test</h1>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-base-200 rounded-lg">
        {TOOLS.map((tool) => (
          <button
            key={tool.label}
            title={tool.title}
            className={`btn btn-sm btn-ghost ${tool.className ?? ""} ${
              editor.isActive(
                tool.action === "toggleHeading"
                  ? "heading"
                  : tool.action.replace("toggle", "").toLowerCase(),
                tool.attrs,
              )
                ? "btn-active"
                : ""
            }`}
            onClick={() => {
              const cmd = editor.chain().focus();
              const fn = cmd[tool.action as keyof typeof cmd];
              if (typeof fn === "function") {
                (fn as Function).call(cmd, tool.attrs);
                cmd.run();
              }
            }}
          >
            {tool.label}
          </button>
        ))}

        {/* Text color */}
        <label
          title="Text Color"
          className="btn btn-sm btn-ghost cursor-pointer relative"
        >
          <span
            style={{
              color: editor.getAttributes("textStyle").color || "currentColor",
            }}
          >
            A
          </span>
          <input
            type="color"
            className="absolute inset-0 opacity-0 cursor-pointer"
            value={editor.getAttributes("textStyle").color || "#000000"}
            onInput={(e) =>
              editor.chain().focus().setColor(e.currentTarget.value).run()
            }
          />
        </label>

        {/* Clear color */}
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Clear Color"
        >
          <span className="line-through">A</span>
        </button>

        {/* Font size */}
        <select
          className="select select-sm select-bordered w-20"
          value={editor.getAttributes("textStyle").fontSize || ""}
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              editor.chain().focus().setFontSize(val).run();
            } else {
              editor.chain().focus().unsetFontSize().run();
            }
          }}
        >
          <option value="">Size</option>
          {["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ),
          )}
        </select>
      </div>

      {/* Editor */}
      <div className="border border-base-300 rounded-lg bg-base-100">
        <EditorContent editor={editor} />
      </div>

      {/* Actions: Clear + Copy JSON */}
      <div className="flex gap-2">
        <button
          className="btn btn-sm"
          onClick={() => editor.commands.clearContent()}
        >
          Clear
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            const json = editor.getJSON();
            setJsonOutput(JSON.stringify(json, null, 2));
            navigator.clipboard.writeText(JSON.stringify(json));
            alert("Copied to clipboard!");
          }}
        >
          Copy JSON
        </button>
      </div>

      {/* Load JSON */}
      <div className="space-y-2">
        <label className="label-text font-semibold">
          Load JSON (paste then click):
        </label>
        <div className="flex gap-2">
          <textarea
            className="textarea textarea-bordered flex-1 text-xs font-mono"
            rows={6}
            value={loadInput}
            onChange={(e) => setLoadInput(e.target.value)}
            placeholder='Paste JSON, e.g.: {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hello!"}]}]}'
          />
        </div>
        <button className="btn btn-sm btn-secondary" onClick={handleLoadJson}>
          Load JSON into Editor
        </button>
      </div>

      {/* JSON Live Preview */}
      <div className="space-y-2">
        <label className="label-text font-semibold">
          Live JSON Output (updates as you type):
        </label>
        <pre className="bg-neutral text-neutral-content p-4 rounded-lg text-xs overflow-auto max-h-100 whitespace-pre-wrap">
          {jsonOutput || "Start editing to see JSON..."}
        </pre>
      </div>
    </div>
  );
}
