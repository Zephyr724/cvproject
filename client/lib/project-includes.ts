export const projectInclude = {
  tags: { include: { tag: true } },
  techItems: { include: { techItem: true } },
  roles: { include: { role: true } },
  sections: {
    include: {
      contentTexts: true,
      contentImages: true,
      contentVideos: true,
    },
  },
} as const;


export type ProjectInclude = typeof projectInclude;