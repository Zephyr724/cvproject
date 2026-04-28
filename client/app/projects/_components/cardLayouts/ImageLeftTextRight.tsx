import {
  ContentText,
  ContentImage,
  ContentVideo,
  ImageRatio,
  SplitRatio,
} from "../types";
import { ImageCarousel } from "@/app/components/ImageCarousel";

interface Props {
  contentText: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
  imageRatio?: ImageRatio;
  splitRatio?: SplitRatio;
}

export default function ImageLeftTextRight({
  contentText,
  contentImages,
  contentVideos,
  imageRatio = { width: 4, height: 3 },
  splitRatio = { left: 3, right: 2 },
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center">
      {/* left section */}
      <div style={{ flexGrow: splitRatio.left, flexBasis: 0 }}>
        {contentImages.length > 0 && (
          <div
            className="relative w-full"
            style={{
              aspectRatio: `${imageRatio.width} / ${imageRatio.height}`,
            }}
          >
            <ImageCarousel images={contentImages} />
          </div>
        )}
      </div>
      {/* right section */}
      <div
        style={{ flexGrow: splitRatio.right, flexBasis: 0 }}
        className="space-y-4"
      >
        {contentText.map((text) => (
          <p key={text.id} className="text-gray-200 text-left">
            {text.content}
          </p>
        ))}
      </div>
    </div>
  );
}
