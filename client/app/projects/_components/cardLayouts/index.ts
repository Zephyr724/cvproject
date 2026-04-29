import ImageTopTextBottom from "./ImageTopTextBottom";
import ImageLeftTextRight from "./ImageLeftTextRight";
import ImageRightTextLeft from "./ImageRightTextLeft";
import TextTopBottomImgMiddle from "./TextTopBottomImgMiddle";
import { ContentText, ContentImage, ContentVideo } from "../types";

interface LayoutProps {
  contentTexts: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}

type LayoutComponent = React.ComponentType<LayoutProps>;

// map layoutType strings  to components
export const layoutMap: Record<string, LayoutComponent> = {
  imgTopTextBottom: ImageTopTextBottom,
  imgLeftTextRight: ImageLeftTextRight,
  imgRightTextLeft: ImageRightTextLeft,
  textTopImgMiddleTextBottom: TextTopBottomImgMiddle,
};

// default layout
export const DefaultLayout = ImageTopTextBottom;
