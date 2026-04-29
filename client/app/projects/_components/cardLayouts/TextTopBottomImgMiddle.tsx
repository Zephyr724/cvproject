import ReactPlayer from "react-player";
import { ContentText, ContentImage, ContentVideo } from "../types";
import { ImageCarousel } from "@/app/components/ImageCarousel";

interface Props {
  contentTexts: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

export default function TextTopBottomImgMiddle({
  contentTexts,
  contentImages,
  contentVideos,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Top Section: Text[0] */}

      {contentTexts[0] && (
        <p key={contentTexts[0].id} className="text-gray-200">
          {contentTexts[0].content}
        </p>
      )}

      {/* Middle Section: Images */}
      {contentImages.length > 0 && (
        <div className="relative w-full aspect-video">
          <ImageCarousel images={contentImages} />
        </div>
      )}
      {/* Buttom Section:  Text[1] */}
      {contentTexts[1] && (
        <p key={contentTexts[1].id} className="text-gray-200">
          {contentTexts[1].content}
        </p>
      )}
    </div>
  );
}
