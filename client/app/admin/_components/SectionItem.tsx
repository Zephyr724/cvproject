import { Section } from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";

interface Props {
  section: Section;
  index: number;
  updateSection: (sectionIndex: number, updateData: Partial<Section>) => void;
  addSection: () => void;
}

const SectionItem = ({ section, updateSection, addSection, index }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <TextField.Root
        placeholder="New Title"
        value={section.title}
        onChange={(e) => {
          updateSection(index, { title: e.target.value });
        }}
      />

      <Button className="w-fit!" >Submit Section</Button>
    </div>
  );
};

export default SectionItem;
