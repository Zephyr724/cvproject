import ReactPlayer from "react-player";
import { ContentText, ContentImage, ContentVideo } from "../types";
import { ImageCarousel } from "@/app/components/ImageCarousel";
import ReactMarkdown from "react-markdown";
import "@/app/styles/markdown.css";
import remarkGfm from "remark-gfm";

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
        <div
          key={contentTexts[0].id}
          className=" text-gray-200 markdown-content"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {contentTexts[0].content}
          </ReactMarkdown>
        </div>
      )}

      {/* Middle Section: Images */}
      {contentImages.length > 0 && (
        <div className="relative w-full aspect-video">
          <ImageCarousel images={contentImages} />
        </div>
      )}
      {/* Buttom Section:  Text[1] */}
      {contentTexts.slice(1).map((contentText, i) => (
        <div key={contentText.id} className=" text-gray-200 markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {contentText.content}
          </ReactMarkdown>
        </div>
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
