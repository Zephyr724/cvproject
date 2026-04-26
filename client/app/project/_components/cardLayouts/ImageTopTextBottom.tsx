import Image from "next/image";
import ReactPlayer from "react-player";
import { ContentText, ContentImage, ContentVideo } from "../types";
import { ImageCarousel } from "@/app/components/ImageCarousel";

interface Props {
  contentText: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

export default function ImageTopTextBottom({
  contentText,
  contentImages,
  contentVideos,
}: Props) {
  return (
    <div className="space-y-4">
      {contentImages.length > 0 && (
        <div className="relative w-full aspect-video">
          <ImageCarousel images={contentImages} />
        </div>
      )}
      {contentText.map((text) => (
        <p key={text.id} className="text-gray-200">
          {text.content}
        </p>
      ))}
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
