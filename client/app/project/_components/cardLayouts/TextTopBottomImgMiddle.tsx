import ReactPlayer from "react-player";
import { ContentText, ContentImage, ContentVideo } from "../types";
import { ImageCarousel } from "@/app/components/ImageCarousel";

interface Props {
  contentText: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

export default function TextTopBottomImgMiddle({
  contentText,
  contentImages,
  contentVideos,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Top Section: Text[0] */}

      <p key={contentText[0].id} className="text-gray-200">
        {contentText[0].content}
      </p>

      {/* Middle Section: Images */}
      {contentImages.length > 0 && (
        <div className="relative w-full aspect-video">
          <ImageCarousel images={contentImages} />
        </div>
      )}
      {/* Buttom Section:  Text[1] */}
      <p key={contentText[1].id} className="text-gray-200">
        {contentText[1].content}
      </p>
    </div>
  );
}
