import { TextStyleKit } from "@tiptap/extension-text-style/text-style-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageCarouselNode } from "./ImageCarouselNode";

interface Props {
  content: object;
}

const TiptapRenderer = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyleKit, ImageCarouselNode],
    content,
    editable: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
};

export default TiptapRenderer;
