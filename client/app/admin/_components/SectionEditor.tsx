import { Section } from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";
import { useEffect } from "react";
import SectionItem from "./SectionItem";

interface Props {
  sections?: Section[];
  onChange: (sections: Section[]) => void;
}

const SectionEditor = ({ sections, onChange }: Props) => {
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
        <SectionItem
          key={section.id}
          section={section}
          index={index}
          addSection={addSection}
          updateSection={updateSection}
        />
      ))}
      <Button className="w-fit!" onClick={addSection}>
        Add Section
      </Button>
    </>
  );
};

export default SectionEditor;
