export interface Project {
  id: number;
  title: string;
  introduction: string;
  coverImageUrl: string;
  tags: Tag[];
  projectUrl: string | null;
  githubUrl: string | null;
  responsibilities: Role[];
  techStack: {
    frontend: TechItem[];
    backend: TechItem[];
  };
  content?: any;
  createdAt: string;
  updatedAt: string;
  ownerId: string | null;
  ownerEmail: string | null;
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

export interface Image {
  alt?: string;
  url: string;
}

export interface Video {
  src: string;
}

export type Layout = "full" | "left" | "right";
