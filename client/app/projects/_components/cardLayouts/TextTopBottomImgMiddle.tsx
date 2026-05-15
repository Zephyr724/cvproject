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
      {contentTexts[1] && (
        <div
          key={contentTexts[1].id}
          className=" text-gray-200 markdown-content"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {contentTexts[1].content}
          </ReactMarkdown>
        </div>
      )}
      {contentTexts?.map((contentText, i) =>
        i === 0 ? (
          <></>
        ) : (
          <div key={contentText.id} className=" text-gray-200 markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {contentText.content}
            </ReactMarkdown>
          </div>
        ),
      )}
    </div>
  );
}
