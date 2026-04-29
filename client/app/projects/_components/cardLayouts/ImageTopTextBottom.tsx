import ReactPlayer from "react-player";
import { ContentText, ContentImage, ContentVideo } from "../types";
import { ImageCarousel } from "@/app/components/ImageCarousel";

interface Props {
  contentTexts: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

export default function ImageTopTextBottom({
  contentTexts,
  contentImages,
  contentVideos,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Top Section: images */}
      {contentImages.length > 0 && (
        <div className="relative w-full aspect-video">
          <ImageCarousel images={contentImages} />
        </div>
      )}
      {/* Middle Section: Text */}
      {contentTexts.map((text) => (
        <p key={text.id} className="text-gray-200">
          {text.content}
        </p>
      ))}
      {/* Buttom Section: video */}
      {contentVideos.length > 0 && (
        <div className="relative w-full aspect-video">
          <ReactPlayer
            src={contentVideos[0].url}
            className="absolute inset-0"
            width="100%"
            height="100%"
            controls
            light={true}
          />
        </div>
      )}
    </div>
  );
}
