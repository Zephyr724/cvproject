import { Section } from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";
import { Select } from "radix-ui";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  layoutTypeEnum,
  LayoutType,
  ContentText,
  ContentImages,
  ContentVideos,
} from "@/app/api/projects/validationSchema";
import { ContentVideo } from "@/src/generated/prisma/client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface Props {
  section: Section;
  sectionIndex: number;
  updateSection: (sectionIndex: number, updateData: Partial<Section>) => void;
  addSection: () => void;
}

const SectionItem = ({
  section,
  updateSection,
  addSection,
  sectionIndex,
}: Props) => {
  const layoutLabel: Record<LayoutType, string> = {
    imgTopTextBottom: "Image on Top, Text on Bottom",
    imgLeftTextRight: "Image on Left, Text on Right",
    imgRightTextLeft: "Image on Right, Text on Left",
    textTopImgMiddleTextBottom: "Text on Top and Bottom, Image in the Middle",
  } as const satisfies Record<LayoutType, string>;

  const addContentText = (sectionIndex: number) => {
    const newContentText = {
      id: Date.now(),
      content: "",
    };
    updateSection(sectionIndex, {
      contentTexts: [...(section.contentTexts ?? []), newContentText],
    });
  };

  const updateContentText = (
    contentTextIndex: number,
    updatedData: Partial<ContentText>,
  ) => {
    const updateContentTexts = (section.contentTexts ?? []).map(
      (contentText, i) =>
        i === contentTextIndex
          ? { ...contentText, ...updatedData }
          : contentText,
    );
    updateSection(sectionIndex, {
      contentTexts: updateContentTexts,
    });
  };

  const deleteContentText = (contentTextIndex: number) => {
    const filteredContentTexts = (section.contentTexts ?? []).filter(
      (_, i) => i !== contentTextIndex,
    );
    updateSection(sectionIndex, { contentTexts: filteredContentTexts });
  };

  const addContentImage = (sectionIndex: number) => {
    const newContentImage = {
      id: Date.now(),
      alt: "",
      url: "",
    };
    updateSection(sectionIndex, {
      contentImages: [...(section.contentImages ?? []), newContentImage],
    });
  };

  const updateContentImage = (
    contenImagesIndex: number,
    updatedData: Partial<ContentImages>,
  ) => {
    const updatedContentImage = (section.contentImages ?? []).map(
      (contentImage, i) =>
        i === contenImagesIndex
          ? { ...contentImage, ...updatedData }
          : contentImage,
    );
    updateSection(sectionIndex, { contentImages: updatedContentImage });
  };

  const deleteContentImage = (contentImageIndex: number) => {
    const filterContentImage = (section.contentImages ?? []).filter(
      (_, i) => i !== contentImageIndex,
    );
    updateSection(sectionIndex, { contentImages: filterContentImage });
  };

  const addContentVideo = (sectionIndex: number) => {
    const newContentVideo = {
      id: Date.now(),
      url: "",
    };
    updateSection(sectionIndex, {
      contentVideos: [...(section.contentVideos ?? []), newContentVideo],
    });
  };

  const updateContentVideo = (
    contentVideoIndex: number,
    updatedData: Partial<ContentVideo>,
  ) => {
    const updatedContentVideo = (section.contentVideos ?? []).map(
      (contentVideo, i) =>
        i === contentVideoIndex
          ? { ...contentVideo, ...updatedData }
          : contentVideo,
    );
    updateSection(sectionIndex, { contentVideos: updatedContentVideo });
  };

  const deleteContentVideo = (contentVideoIndex: number) => {
    const filterContentVideo = (section.contentVideos ?? []).filter(
      (_, i) => i !== contentVideoIndex,
    );
    updateSection(sectionIndex, { contentVideos: filterContentVideo });
  };

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

      <div className="rounded bg-gray-300 p-1">
        {section.contentTexts?.map((contentText, contentTextIndex) => (
          <div key={contentText.id} className="flex flex-col gap-y-1 ">
            <div className="flex justify-between items-top">
              <label>Paragraph</label>
              <Button
                color="red"
                className="p-2! w-8 h-8"
                onClick={() => deleteContentText(contentTextIndex)}
              >
                <Cross2Icon />
              </Button>
            </div>

            <SimpleMDE
              key={contentText.id}
              placeholder="Write your paragraph here…"
              value={contentText.content}
              onChange={(value) =>
                updateContentText(contentTextIndex, {
                  content: value,
                })
              }
            />
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            className="px-8!"
            onClick={() => addContentText(sectionIndex)}
          >
            Add paragraph
          </Button>
        </div>
      </div>

      <div className="bg-gray-300 rounded p-1">
        {section.contentImages?.map((contenImage, contentImageIndex) => (
          <div key={contentImageIndex}>
            <label>Image</label>
            <div className="flex flex-row gap-x-1  space-y-1 ">
              <TextField.Root
                value={contenImage.url}
                className="flex-1"
                onChange={(e) =>
                  updateContentImage(contentImageIndex, { url: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
              <Button
                color="red"
                className="p-2! w-8 h-8"
                onClick={() => deleteContentImage(contentImageIndex)}
              >
                <Cross2Icon />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            className="px-8!"
            onClick={() => addContentImage(sectionIndex)}
          >
            Add Image
          </Button>
        </div>
      </div>

      <div className="bg-gray-300 rounded p-1">
        {section.contentVideos?.map((contentVideo, contentVideoIndex) => (
          <div key={contentVideoIndex}>
            <label>Video</label>
            <div className="flex flex-row gap-x-1  space-y-1">
              <TextField.Root
                value={contentVideo.url}
                className="flex-1"
                onChange={(e) =>
                  updateContentVideo(contentVideoIndex, { url: e.target.value })
                }
                placeholder="https://youtube.com/watch?v=…"
              />
              <Button
                color="red"
                className="p-2! w-8 h-8"
                onClick={() => deleteContentVideo(contentVideoIndex)}
              >
                <Cross2Icon />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            className="px-8!"
            onClick={() => addContentVideo(sectionIndex)}
          >
            Add Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
