import Image from "next/image";
import { ContentText, ContentImage, ContentVideo } from "../types";

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
        <div className="relative w-full aspect-16/9">
          <Image
            src={contentImages[0].url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded"
          />
        </div>
      )}
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
  );
}
