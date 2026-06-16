import { Editor } from "@tiptap/react";
import { Afacad } from "next/font/google";

interface Props {
  editor: Editor;
}

const SectionEditorToolBar = ({ editor }: Props) => {
  const ToolsConfig = [
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
      attributes: { level: 1 },
      title: "Heading 1",
    },
    {
      label: "H2",
      action: "toggleHeading",
      attributes: { level: 2 },
      title: "Heading 2",
    },
    { label: "•", action: "toggleBulletList", title: "Bullet List" },
    { label: "1.", action: "toggleOrderedList", title: "Ordered List" },
    { label: "—", action: "setHorizontalRule", title: "Horizontal Rule" },
    { label: "❝", action: "toggleBlockquote", title: "Blockquote" },
    { label: "<>", action: "toggleCodeBlock", title: "Code Block" },
  ];

  return (
    <div className="border border-gray-300 rounded bg-base-100 p-1 ">
      {ToolsConfig.map((tool) => (
        <button
          type="button"
          key={tool.label}
          title={tool.title}
          className={`min-w-9 btn btn-sm btn-ghost border hover:border-black-200 hover:bg-black-100 ${tool.className ?? ""} ${
            editor.isActive(
              tool.action === "toggleHeading"
                ? "heading"
                : tool.action.replace("toggle", "").toLowerCase(),
              tool.attributes,
            )
              ? "btn-active"
              : ""
          }`}
          onClick={() => {
            const editorCMDChain = editor.chain().focus();
            const commandFn =
              editorCMDChain[tool.action as keyof typeof editorCMDChain];
            if (typeof commandFn === "function") {
              (commandFn as Function).call(editorCMDChain, tool?.attributes); // add tool command to the command chain
              editorCMDChain.run(); //execute all the command chain
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
        type="button"
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
          const value = e.target.value;
          if (value) {
            editor.chain().focus().setFontSize(value).run();
          } else {
            editor.chain().focus().unsetFontSize().run();
          }
        }}
      >
        <option value="">Size</option>
        {["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px"].map(
          (frontSize) => (
            <option key={frontSize} value={frontSize}>
              {frontSize}
            </option>
          ),
        )}
      </select>

      {/* Line Height */}
      <select
        className="select select-sm select-bordered w-20"
        onChange={(e) => {
          editor.view.dom.style.setProperty("--line-height", e.target.value);
        }}
        defaultValue="1.0"
      >
        {[
          "0.2",
          "0.4",
          "0.6",
          "0.8",
          "1.0",
          "1.2",
          "1.4",
          "1.6",
          "1.8",
          "2.0",
          "2.5",
          "3.0",
          "4.0",
        ].map((lineHeight) => (
          <option key={lineHeight} value={lineHeight}>
            {lineHeight}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SectionEditorToolBar;
