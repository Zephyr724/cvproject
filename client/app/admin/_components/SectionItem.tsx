import {
  contentTextSchema,
  Section,
} from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";
import { Select } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import {
  layoutTypeEnum,
  LayoutType,
  ContentText,
} from "@/app/api/projects/validationSchema";
import content from "*.avif";

interface Props {
  section: Section;
  index: number;
  updateSection: (sectionIndex: number, updateData: Partial<Section>) => void;
  addSection: () => void;
}

const SectionItem = ({ section, updateSection, addSection, index }: Props) => {
  const layoutLabel: Record<LayoutType, string> = {
    imgTopTextBottom: "Image on Top, Text on Bottom",
    imgLeftTextRight: "Image on Left, Text on Right",
    imgRightTextLeft: "Image on Right, Text on Left",
    textTopImgMiddleTextBottom: "Text on Top and Bottom, Image in the Middle",
  } as const satisfies Record<LayoutType, string>;

  const addContentText = (index: number) => {
    const newContentText = {
      id: Date.now(),
      content: "",
    };
    updateSection(index, {
      contentTexts: [...(section.contentTexts ?? []), newContentText],
    });
  };

  const updateContentText = (
    index: number,
    contentTextIndex: number,
    section: Section,
    updateData: ContentText,
  ) => {
    const updateContentTexts = (section.contentTexts ?? []).map(
      (contentText, i) =>
        i === contentTextIndex
          ? { ...contentText, ...updateData }
          : contentText,
    );

    updateSection(index, {
      ...section,
      contentTexts: updateContentTexts,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <label>Title</label>
      <TextField.Root
        placeholder="Title"
        value={section.title}
        onChange={(e) => {
          updateSection(index, { title: e.target.value });
        }}
      />

      <label>Order</label>
      <TextField.Root
        placeholder="Order"
        value={section.order}
        onChange={(e) => {
          updateSection(index, { order: parseInt(e.target.value) });
        }}
      />

      <label>Content layout</label>
      <Select.Root
        value={section.layoutType}
        onValueChange={(value) =>
          updateSection(index, { layoutType: value as LayoutType })
        }
      >
        <Select.Trigger className="inline-flex items-center justify-between gap-2  border rounded px-3 py-1 bg-white  text-left">
          <Select.Value placeholder="Select a layout" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="bg-white border rounded px-3 py-1 shadow-md z-50  cursor-pointer text-left"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport>
              {layoutTypeEnum.options.map((opt) => (
                <Select.Item key={opt} value={opt}>
                  <Select.ItemText>{layoutLabel[opt]}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {section.contentTexts?.map((contentText, contentTextIndex) => (
        <div key={contentText.id}>
          <label>Paragraph</label>
          <TextField.Root
            value={contentText.content}
            onChange={(e) =>
              updateContentText(index, contentTextIndex, section, {
                id: contentText.id,
                content: e.target.value,
              })
            }
          />
        </div>
      ))}

      <Button
        className="btn btn-primary w-fit!"
        onClick={() => addContentText(index)}
      >
        Add paragraph
      </Button>

      <Button className="w-fit!">Submit Section</Button>
    </div>
  );
};

export default SectionItem;
