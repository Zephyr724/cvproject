import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

const SectionEditorToolBar = ({ editor }: Props) => {
  const ToolsConfig = [
    { label: "B", action: "toggleBold", title: "Bold Ctrl+B" },
  ];

  return (
    <div className="border border-gray-300 rounded bg-base-100 p-1 ">
      {ToolsConfig.map((tool) => (
        <button
          key={tool.label}
          title={tool.title}
          className="btn btn-sm btn-ghost border hover:border-black-200 hover:bg-black-100"
          onClick={() => {
            const command = editor.chain().focus();
            const action = command[tool.action as keyof typeof command];
          }}
        >
          B
        </button>
      ))}
      <button
        key={"bold"}
        title="Bold"
        className="btn btn-sm btn-ghost border hover:border-black-200 hover:bg-black-100"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </button>
    </div>
  );
};

export default SectionEditorToolBar;
