import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

const SectionEditorToolBar = ({ editor }: Props) => {
  const ToolsConfig = [
    { label: "B", action: "toggleBold", title: "Bold Ctrl+B" },
    { label: "I", action: "toggleItalic", title: "Italic Ctrl+I" },
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
          key={tool.label}
          title={tool.title}
          className="btn btn-sm btn-ghost border hover:border-black-200 hover:bg-black-100"
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
    </div>
  );
};

export default SectionEditorToolBar;
