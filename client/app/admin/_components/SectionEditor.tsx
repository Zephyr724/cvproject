import { Section } from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";

import React, { SyntheticEvent, useEffect, useState } from "react";
import { date } from "zod";

interface Props {
  sections?: Section[];
  onChange: (sections: Section[]) => void;
}

const SectionEditor = ({ sections, onChange }: Props) => {
  const updateTitle = (
    section: Section,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(
      (sections ?? []).map((value) =>
        value.id === section.id ? { ...value, title: e.target.value } : value,
      ),
    );
  };

  const updateSection = (
    sectionIndex: number,
    updateData: Partial<Section>,
  ) => {
    onChange(
      (sections ?? []).map((section, index) =>
        index === sectionIndex ? { ...section, ...updateData } : section,
      ),
    );
  };

  useEffect(() => {
    console.log("Monitoring FieldValue:", sections);
  }, [sections]);

  const addSection = () => {
    onChange([
      ...(sections ?? []),
      {
        id: Date.now(),
        order: sections?.length,
        title: "",
        layoutType: "imgTopTextBottom",
        contentTexts: [
          {
            id: Date.now(),
            content: "",
          },
        ],
        contentImages: [
          {
            id: Date.now(),
            alt: "",
            url: "",
          },
        ],
        contentVideos: [
          {
            id: Date.now(),
            url: "",
          },
        ],
      },
    ]);
  };

  return (
    <>
      {sections?.map((section, index) => (
        <div key={section.id}>
          {/* <TextField.Root
            placeholder="Title"
            value={section.title}
            onChange={(e) => updateTitle(section, e)}
          /> */}

          <TextField.Root
            placeholder="New Title"
            value={section.title}
            onChange={(e) => {
              updateSection(index, { title: e.target.value });
            }}
          />

          <Button>Submit Section</Button>
        </div>
      ))}
      <div>SectionEditor</div>
      <Button onClick={addSection}>Add Section</Button>
    </>
  );
};

export default SectionEditor;
