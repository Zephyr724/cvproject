import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

const SectionEditorToolBar = ({editor}:Props) => {
  return (
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
  );
};

export default SectionEditorToolBar;
