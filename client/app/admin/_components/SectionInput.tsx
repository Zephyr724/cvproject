"use client";

import { useState } from "react";
import { TextField, Button, Select, Card, IconButton } from "@radix-ui/themes";
import { RxPlus, RxTrash } from "react-icons/rx";
import type { Section } from "@/app/projects/_components/types";

// ─── 常量：layoutType 选项 ───────────────────────────────────────
// 用常量数组代替魔法字符串，方便扩展和复用
const LAYOUT_OPTIONS = [
  { value: "imgTopTextBottom", label: "Image Top, Text Bottom" },
  { value: "imgLeftTextRight", label: "Image Left, Text Right" },
  { value: "imgRightTextLeft", label: "Image Right, Text Left" },
  {
    value: "textTopImgMiddleTextBottom",
    label: "Text Top, Image Middle, Text Bottom",
  },
] as const;

// ─── Props ───────────────────────────────────────────────────────
interface SectionInputProps {
  value: Section[];
  onChange: (sections: Section[]) => void;
}

// ─── 工厂函数：创建一个默认的空 Section ──────────────────────────
// 每次点"添加"按钮时调用，生成一个新的 section 对象
// order 用 value.length，因为当前数组末尾就是 length 这个索引
const createEmptySection = (order: number): Section => ({
  id: Date.now(), // 临时 ID，后端会分配真实 ID
  order,
  title: "",
  layoutType: "imgTopTextBottom",
  contentTexts: [{ id: Date.now(), content: "" }],
  contentImages: [],
  contentVideos: [],
});

// ─── 组件主体 ────────────────────────────────────────────────────
const SectionInput = ({ value, onChange }: SectionInputProps) => {
  // ========== Sections 级别的操作 ==========

  const addSection = () => {
    onChange([...value, createEmptySection(value.length)]);
  };

  const removeSection = (index: number) => {
    // 删除后重新分配 order，保证 order 始终连续
    onChange(
      value
        .filter((_, i) => i !== index)
        .map((section, i) => ({ ...section, order: i })),
    );
  };

  const updateSection = (index: number, updated: Partial<Section>) => {
    onChange(
      value.map((section, i) =>
        i === index ? { ...section, ...updated } : section,
      ),
    );
  };

  // ========== ContentTexts 级别的操作 ==========
  // 为什么这些函数放在组件内部？
  //   因为需要通过闭包访问 value 和 onChange，避免把数组引用传来传去

  const addContentText = (sectionIndex: number) => {
    const section = value[sectionIndex];
    const newTexts = [
      ...(section.contentTexts ?? []),
      { id: Date.now(), content: "" },
    ];
    updateSection(sectionIndex, { contentTexts: newTexts });
  };

  const removeContentText = (sectionIndex: number, textIndex: number) => {
    const section = value[sectionIndex];
    const newTexts = section.contentTexts?.filter((_, i) => i !== textIndex);
    updateSection(sectionIndex, { contentTexts: newTexts });
  };

  const updateContentText = (
    sectionIndex: number,
    textIndex: number,
    content: string,
  ) => {
    const section = value[sectionIndex];
    const newTexts = section.contentTexts?.map((t, i) =>
      i === textIndex ? { ...t, content } : t,
    );
    updateSection(sectionIndex, { contentTexts: newTexts });
  };

  // ========== ContentImages 级别的操作 ==========

  const addContentImage = (sectionIndex: number) => {
    const section = value[sectionIndex];
    const newImages = [
      ...(section.contentImages ?? []),
      { id: Date.now(), url: "", alt: "" },
    ];
    updateSection(sectionIndex, { contentImages: newImages });
  };

  const removeContentImage = (sectionIndex: number, imgIndex: number) => {
    const section = value[sectionIndex];
    const newImages = section.contentImages?.filter((_, i) => i !== imgIndex);
    updateSection(sectionIndex, { contentImages: newImages });
  };

  const updateContentImage = (
    sectionIndex: number,
    imgIndex: number,
    field: "url" | "alt",
    fieldValue: string,
  ) => {
    const section = value[sectionIndex]; // 注意这里 value 是参数名，不是外层 props
    const newImages = section.contentImages?.map((img, i) =>
      i === imgIndex ? { ...img, [field]: fieldValue } : img,
    );
    updateSection(sectionIndex, { contentImages: newImages });
  };

  // ========== ContentVideos 级别的操作 ==========

  const addContentVideo = (sectionIndex: number) => {
    const section = value[sectionIndex];
    const newVideos = [
      ...(section.contentVideos ?? []),
      { id: Date.now(), url: "" },
    ];
    updateSection(sectionIndex, { contentVideos: newVideos });
  };

  const removeContentVideo = (sectionIndex: number, videoIndex: number) => {
    const section = value[sectionIndex];
    const newVideos = section.contentVideos?.filter((_, i) => i !== videoIndex);
    updateSection(sectionIndex, { contentVideos: newVideos });
  };

  const updateContentVideo = (
    sectionIndex: number,
    videoIndex: number,
    url: string,
  ) => {
    const section = value[sectionIndex];
    const newVideos = section.contentVideos?.map((v, i) =>
      i === videoIndex ? { ...v, url } : v,
    );
    updateSection(sectionIndex, { contentVideos: newVideos });
  };

  // ========== 渲染 ==========

  return (
    <div className="space-y-4">
      {value.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="p-4">
          {/* ─── Section 头部：标题 + 删除按钮 ─── */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">
              Section {sectionIndex + 1}
            </span>
            <IconButton
              color="red"
              variant="ghost"
              size="2"
              onClick={() => removeSection(sectionIndex)}
              aria-label="Remove section"
            >
              <RxTrash />
            </IconButton>
          </div>

          <div className="space-y-3">
            {/* ─── Title ─── */}
            <div>
              <label className="text-xs text-gray-500">Title</label>
              <TextField.Root
                placeholder="Section title"
                value={section.title}
                onChange={(e) =>
                  updateSection(sectionIndex, { title: e.target.value })
                }
              />
            </div>

            {/* ─── Layout Type ─── */}
            <div>
              <label className="text-xs text-gray-500">Layout Type</label>
              <Select.Root
                value={section.layoutType}
                onValueChange={(val) =>
                  updateSection(sectionIndex, {
                    layoutType: val as Section["layoutType"],
                  })
                }
              >
                <Select.Trigger placeholder="Select layout" />
                <Select.Content>
                  {LAYOUT_OPTIONS.map((opt) => (
                    <Select.Item key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>

            {/* ─── Content Texts ─── */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-500">Content Texts</label>
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => addContentText(sectionIndex)}
                >
                  <RxPlus className="mr-1" /> Add Text
                </Button>
              </div>
              <div className="space-y-2 mt-1">
                {section.contentTexts?.map((text, textIndex) => (
                  <div key={textIndex} className="flex gap-1">
                    <textarea
                      className="flex-1 min-h-[80px] rounded-md border border-gray-300 p-2 text-sm resize-y font-mono"
                      placeholder="Content text..."
                      value={text.content}
                      onChange={(e) =>
                        updateContentText(
                          sectionIndex,
                          textIndex,
                          e.target.value,
                        )
                      }
                    />
                    <IconButton
                      color="red"
                      variant="ghost"
                      size="1"
                      className="self-start mt-1"
                      onClick={() => removeContentText(sectionIndex, textIndex)}
                      aria-label="Remove text"
                    >
                      <RxTrash />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Content Images ─── */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-500">Content Images</label>
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => addContentImage(sectionIndex)}
                >
                  <RxPlus className="mr-1" /> Add Image
                </Button>
              </div>
              <div className="space-y-2 mt-1">
                {section.contentImages?.map((img, imgIndex) => (
                  <div key={imgIndex} className="flex gap-1 items-start">
                    <div className="flex-1 space-y-1">
                      <TextField.Root
                        placeholder="Image URL"
                        value={img.url}
                        onChange={(e) =>
                          updateContentImage(
                            sectionIndex,
                            imgIndex,
                            "url",
                            e.target.value,
                          )
                        }
                      />
                      <TextField.Root
                        placeholder="Alt text"
                        value={img.alt}
                        onChange={(e) =>
                          updateContentImage(
                            sectionIndex,
                            imgIndex,
                            "alt",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <IconButton
                      color="red"
                      variant="ghost"
                      size="1"
                      className="mt-1"
                      onClick={() => removeContentImage(sectionIndex, imgIndex)}
                      aria-label="Remove image"
                    >
                      <RxTrash />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Content Videos ─── */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-500">Content Videos</label>
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => addContentVideo(sectionIndex)}
                >
                  <RxPlus className="mr-1" /> Add Video
                </Button>
              </div>
              <div className="space-y-2 mt-1">
                {section.contentVideos?.map((video, videoIndex) => (
                  <div key={videoIndex} className="flex gap-1">
                    <TextField.Root
                      className="flex-1"
                      placeholder="Video URL (e.g. YouTube)"
                      value={video.url}
                      onChange={(e) =>
                        updateContentVideo(
                          sectionIndex,
                          videoIndex,
                          e.target.value,
                        )
                      }
                    />
                    <IconButton
                      color="red"
                      variant="ghost"
                      size="1"
                      onClick={() =>
                        removeContentVideo(sectionIndex, videoIndex)
                      }
                      aria-label="Remove video"
                    >
                      <RxTrash />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* ─── 添加 Section 按钮 ─── */}
      <Button variant="outline" className="w-full" onClick={addSection}>
        <RxPlus className="mr-2" /> Add Section
      </Button>
    </div>
  );
};

export default SectionInput;
