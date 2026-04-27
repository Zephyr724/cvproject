export interface ContentText {
  id: number;
  content: string;
}

export interface ContentImage {
  id: number;
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
  contentText: ContentText[];
  contentImages: ContentImage[];
  contentVideos: ContentVideo[];
}
