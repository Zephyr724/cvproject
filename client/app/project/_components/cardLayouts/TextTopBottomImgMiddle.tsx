import Image from "next/image";
import { ContentText, ContentImage, ContentVideo } from "../types";

interface Props {
  contentText: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

export default function ComplexLayout({
  contentText,
  contentImages,
  contentVideos,
}: Props) {
  return (
    <div className="space-y-6">
      {contentImages[0] && (
        <div className="relative w-full h-48">
          <Image
            src={contentImages[0].url}
            alt=""
            fill
            className="object-cover rounded"
          />

        </div>
      )}
      <div className="space-y-4">
        {contentText.map((text) => (
          <p key={text.id} className="text-gray-200">
            {text.content}
          </p>
        ))}
      </div>
      {contentImages[1] && (
        <div className="relative w-full h-48">
          <Image
            src={contentImages[1].url}
            alt=""
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      {contentVideos.length > 0 && (
        <div className="text-sm text-gray-300">
          Videos: {contentVideos.length} item(s)
        </div>
      )}
    </div>
  );
}
