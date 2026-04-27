import ImageTopTextBottom from "./ImageTopTextBottom";
import ImageLeftTextRight from "./ImageLeftTextRight";
import ImageRightTextLeft from "./ImageRightTextLeft";
import ComplexLayout from "./ComplexLayout";
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
  "img-top-img-middle-text-bottom": ComplexLayout,
};

// default layout
export const DefaultLayout = ImageTopTextBottom;
