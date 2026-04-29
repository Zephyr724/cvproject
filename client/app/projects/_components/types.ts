export interface Project {
  id: number;
  title: string;
  tags: Tag[];
  projectUrl: string;
  githubUrl: string;
  responsibilities: Role[];
  techStack: {
    frontend: TechItem[];
    backend: TechItem[];
  };
  sections: Section[];
}

export interface Tag {
  id: number;
  name: string;
  order: number;
}

export interface TechItem {
  id: number;
  name: string;
  order: number;

  slug: string;
}

export interface Role {
  id: number;
  order: number;
  name: string;
}

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
  contentTexts?: ContentText[];
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
