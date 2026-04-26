import Image from "next/image";
import { ContentText, ContentImage, ContentVideo } from "../types";
import { ImageCarousel } from "@/app/components/ImageCarousel";

interface Props {
  contentText: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

export default function ImageRightTextLeft({
  contentText,
  contentImages,
  contentVideos,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 space-y-4 order-2 md:order-1">
        {contentText.map((text) => (
          <p key={text.id} className="text-gray-200">
            {text.content}
          </p>
        ))}
        {contentVideos.length > 0 && (
          <div className="text-sm text-gray-300">
            Videos: {contentVideos.length} item(s)
          </div>
        )}
      </div>
      <div className="md:w-1/2 order-1 md:order-2">
        {contentImages.length > 0 && (
          <div className="relative w-full h-64">
            <ImageCarousel images={contentImages} />
          </div>
        )}
      </div>
    </div>
  );
}
