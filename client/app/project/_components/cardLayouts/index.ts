import ImageTopTextBottom from "./ImageTopTextBottom";
import ImageLeftTextRight from "./ImageLeftTextRight";
import ImageRightTextLeft from "./ImageRightTextLeft";
import TextTopBottomImgMiddle from "./TextTopBottomImgMiddle";
import { ContentText, ContentImage, ContentVideo } from "../types";

interface LayoutProps {
  contentText: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

type LayoutComponent = React.ComponentType<LayoutProps>;

// map layoutType strings  to components
export const layoutMap: Record<string, LayoutComponent> = {
  "img-top-text-bottom": ImageTopTextBottom,
  "img-left-text-right": ImageLeftTextRight,
  "img-right-text-left": ImageRightTextLeft,
  "text-top-img-middle-text-bottom": TextTopBottomImgMiddle,
};

// default layout
export const DefaultLayout = ImageTopTextBottom;
