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
        contentVideos: [],
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
    <div className="space-y-3">
      <div className=" bg-gray-200 rounded">
        {sections?.map((section, index) => (
          <div key={section.id}>
            <div className="flex justify-between items-top">
              <label className="font-bold">Section {index + 1}</label>
              <Button
                color="red"
                className="w-fit!"
                onClick={() => deleteSection(index)}
              >
                Delete Section
              </Button>
            </div>
            <SectionItem
              section={section}
              sectionIndex={index}
              addSection={addSection}
              updateSection={updateSection}
            />
          </div>
        ))}
      </div>
      <Button className="w-full!" onClick={addSection}>
        Add an Implementation (or project detail)
      </Button>
    </div>
  );
};

export default SectionEditor;
