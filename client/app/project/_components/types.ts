export interface ContentText {
  id: number;
  content: string;
}

export interface ContentImage {
  id: number;
  alt: string;
  url: string;
}

export interface ContentVideo {
  id: number;
  url: string;
}

export interface Section {
  id: number;
  order: number;
  title: string;
  layoutType: string;
  contentText?: ContentText[];
  contentImages?: ContentImage[];
  contentVideos?: ContentVideo[];
}

export interface ImageRatio {
  width: number;
  height: number;
}
export interface SplitRatio {
  left: number;
  right: number;
}