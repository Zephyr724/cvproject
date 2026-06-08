import { Section } from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";
import { Select } from "radix-ui";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  layoutTypeEnum,
  LayoutType,

} from "@/app/api/projects/validationSchema";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useArrayItem } from "@/hooks/useArrayItem";

interface Props {
  section: Section;
  sectionIndex: number;
  updateSection: (sectionIndex: number, updateData: Partial<Section>) => void;
}

const SectionItem = ({ section, updateSection, sectionIndex }: Props) => {
  const layoutLabel: Record<LayoutType, string> = {
    imgTopTextBottom: "Image on Top, Text on Bottom",
    imgLeftTextRight: "Image on Left, Text on Right",
    imgRightTextLeft: "Image on Right, Text on Left",
    textTopImgMiddleTextBottom: "Text on Top and Bottom, Image in the Middle",
  } as const satisfies Record<LayoutType, string>;

  const contentTextsHelper = useArrayItem(
    section.contentTexts,
    () => ({
      id: Date.now(),
      content: "",
    }),
    (newContentTexts) =>
      updateSection(sectionIndex, {
        contentTexts: newContentTexts,
      }),
  );

  const contentImagesHelper = useArrayItem(
    section.contentImages,
    () => ({
      id: Date.now(),
      url: "",
      alt: "",
    }),
    (newContentImages) =>
      updateSection(sectionIndex, {
        contentImages: newContentImages,
      }),
  );

  const contentVideosHelper = useArrayItem(
    section.contentVideos,
    () => ({
      id: Date.now(),
      url: "",
    }),
    (newcontentVideos) =>
      updateSection(sectionIndex, { contentVideos: newcontentVideos }),
  );

  return (
    <div className="flex flex-col gap-1 p-1">
      <label>Title</label>
      <TextField.Root
        placeholder="E.g., Project Introduction"
        value={section.title}
        onChange={(e) => {
          updateSection(sectionIndex, { title: e.target.value });
        }}
      />

      <label>Section Order</label>
      <TextField.Root
        placeholder="Display order (number)"
        value={section.order}
        onChange={(e) => {
          const num = parseInt(e.target.value);
          updateSection(sectionIndex, { order: isNaN(num) ? 0 : num });
        }}
      />

      <label>Content layout</label>
      <Select.Root
        value={section.layoutType}
        onValueChange={(value) =>
          updateSection(sectionIndex, { layoutType: value as LayoutType })
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

      <div className="bg-gray-300 rounded p-1 flex flex-col space-y-1 ">
        {contentImagesHelper.items?.map((contenImage, contentImageIndex) => (
          <div
            key={contentImageIndex}
            className=" bg-gray-200 rounded p-1 flex flex-col space-y-1"
          >
            <div className="flex justify-between items-top">
              <label>Image {contentImageIndex + 1}</label>
              <Button
                color="red"
                className="p-2! w-8 h-8"
                onClick={() =>
                  contentImagesHelper.deleteItem(contentImageIndex)
                }
              >
                <Cross2Icon />
              </Button>
            </div>
            <div className="flex gap-x-1  space-y-1">
              <TextField.Root
                value={contenImage.url}
                className="flex-8"
                onChange={(e) =>
                  contentImagesHelper.updateItem(contentImageIndex, {
                    url: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
              <TextField.Root
                value={contenImage.alt}
                className="flex-2"
                onChange={(e) =>
                  contentImagesHelper.updateItem(contentImageIndex, {
                    alt: e.target.value,
                  })
                }
                placeholder="Alternate text"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Button className="px-8!" onClick={contentImagesHelper.addItem}>
            Add Image
          </Button>
        </div>
      </div>

      <div className="rounded bg-gray-300 p-1 flex flex-col space-y-2 ">
        {contentTextsHelper.items?.map((contentText, contentTextIndex) => (
          <div
            key={contentText.id}
            className="flex flex-col gap-y-1  bg-gray-200 rounded p-1 "
          >
            <div className="flex justify-between items-top">
              <label>Paragraph {contentTextIndex + 1}</label>
              <Button
                color="red"
                className="p-2! w-8 h-8"
                onClick={() => contentTextsHelper.deleteItem(contentTextIndex)}
              >
                <Cross2Icon />
              </Button>
            </div>

            <SimpleMDE
              key={contentText.id}
              placeholder="Write your paragraph here…"
              value={contentText.content}
              onChange={(value) =>
                contentTextsHelper.updateItem(contentTextIndex, {
                  content: value,
                })
              }
            />
          </div>
        ))}
        <div className="flex justify-center">
          <Button className="px-8!" onClick={contentTextsHelper.addItem}>
            Add paragraph
          </Button>
        </div>
      </div>

      {["imgTopTextBottom", "textTopImgMiddleTextBottom"].includes(
        section.layoutType,
      ) && (
        <div className="bg-gray-300 rounded p-1">
          {contentVideosHelper.items?.map((contentVideo, contentVideoIndex) => (
            <div key={contentVideoIndex}>
              <label>Video</label>
              <div className="flex  gap-x-1  space-y-1">
                <TextField.Root
                  value={contentVideo.url}
                  className="flex-1"
                  onChange={(e) =>
                    contentVideosHelper.updateItem(contentVideoIndex, {
                      url: e.target.value,
                    })
                  }
                  placeholder="https://youtube.com/watch?v=…"
                />
                <Button
                  color="red"
                  className="p-2! w-8 h-8"
                  onClick={() =>
                    contentVideosHelper.deleteItem(contentVideoIndex)
                  }
                >
                  <Cross2Icon />
                </Button>
              </div>
            </div>
          ))}
          {contentVideosHelper.items?.length === 0 && (
            <div className="flex justify-center">
              <Button className="px-8!" onClick={contentVideosHelper.addItem}>
                Add Video
              </Button>
            </div>
          )}
        </div>
      )}


      


    </div>
  );
};

export default SectionItem;
