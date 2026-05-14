import { Section } from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";
import { useEffect } from "react";
import SectionItem from "./SectionItem";

interface Props {
  sections?: Section[];
  onChange: (sections: Section[]) => void;
}

const SectionEditor = ({ sections, onChange }: Props) => {
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

  const updateSection = (
    sectionIndex: number,
    updatedData: Partial<Section>,
  ) => {
    onChange(
      (sections ?? []).map((section, index) =>
        index === sectionIndex ? { ...section, ...updatedData } : section,
      ),
    );
  };

  const deleteSection = (sectionIndex: number) => {
    onChange((sections ?? []).filter((_, index) => index !== sectionIndex));
  };

  useEffect(() => {
    console.log("Monitoring FieldValue:", sections);
  }, [sections]);

  return (
    <>
      {sections?.map((section, index) => (
        <SectionItem
          key={section.id}
          section={section}
          sectionIndex={index}
          addSection={addSection}
          updateSection={updateSection}
          deleteSection={deleteSection}
        />
      ))}
      <Button className="w-fit!" onClick={addSection}>
        Add Section
      </Button>
    </>
  );
};

export default SectionEditor;
