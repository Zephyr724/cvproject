import { Section } from "@/app/api/projects/validationSchema";
import { Button, TextField } from "@radix-ui/themes";
import { Select } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  layoutTypeEnum,
  LayoutType,
  ContentText,
  ContentImages,
  ContentVideos,
} from "@/app/api/projects/validationSchema";
import { ContentVideo } from "@/src/generated/prisma/client";

interface Props {
  section: Section;
  sectionIndex: number;
  updateSection: (sectionIndex: number, updateData: Partial<Section>) => void;
  addSection: () => void;
  deleteSection: (sectionIndex: number) => void;
}

const SectionItem = ({
  section,
  updateSection,
  addSection,
  deleteSection,
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

  return (
    <div className="flex flex-col gap-1">
      <label>Title</label>
      <TextField.Root
        placeholder="Title"
        value={section.title}
        onChange={(e) => {
          updateSection(sectionIndex, { title: e.target.value });
        }}
      />

      <label>Order</label>
      <TextField.Root
        placeholder="Order"
        value={section.order}
        onChange={(e) => {
          updateSection(sectionIndex, { order: parseInt(e.target.value) });
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

      <div>
        {section.contentTexts?.map((contentText, contentTextIndex) => (
          <div key={contentText.id}>
            <label>Paragraph</label>
            <TextField.Root
              value={contentText.content}
              onChange={(e) =>
                updateContentText(contentTextIndex, {
                  content: e.target.value,
                })
              }
            />
          </div>
        ))}

        <Button
          className="btn btn-primary w-fit!"
          onClick={() => addContentText(sectionIndex)}
        >
          Add paragraph
        </Button>
      </div>

      <div>
        {section.contentImages?.map((contenImage, contentImageIndex) => (
          <div key={contentImageIndex}>
            <label>Image</label>
            <TextField.Root
              value={contenImage.url}
              onChange={(e) =>
                updateContentImage(contentImageIndex, { url: e.target.value })
              }
            />
          </div>
        ))}

        <Button
          className="btn btn-primary w-fit!"
          onClick={() => addContentImage(sectionIndex)}
        >
          Add Image
        </Button>
      </div>

      <div>
        {section.contentVideos?.map((contentVideo, contentVideoIndex) => (
          <div key={contentVideoIndex}>
            <label>Video</label>
            <TextField.Root
              value={contentVideo.url}
              onChange={(e) =>
                updateContentVideo(contentVideoIndex, { url: e.target.value })
              }
            />
          </div>
        ))}

        <Button
          className="btn btn-primary w-fit!"
          onClick={() => addContentVideo(sectionIndex)}
        >
          Add Video
        </Button>
      </div>

      <Button className="w-fit!">Submit Section</Button>
      <Button
        color="red"
        className="w-fit!"
        onClick={() => deleteSection(sectionIndex)}
      >
        Delete this Section
      </Button>
    </div>
  );
};

export default SectionItem;
