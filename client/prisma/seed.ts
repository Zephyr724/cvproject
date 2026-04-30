// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const projectData = {
  id: 1,
  title: "My first Project",
  tags: [
    {
      id: 1,
      name: "React",
      order: 1,
    },
    {
      id: 2,
      name: "Svelte",
      order: 2,
    },
    {
      id: 3,
      name: "Full Stack",
      order: 3,
    },
    {
      id: 4,
      name: "Serverless",
      order: 4,
    },
  ],
  projectUrl: "https://github.com/Zephyr724/cvproject",
  githubUrl: "https://github.com/Zephyr724/cvproject",
  techStack: {
    frontend: [
      { id: 1, order: 3, name: "React", slug: "react" },
      {
        id: 2,
        order: 1,
        name: "Next",
        slug: "next",
      },
      {
        id: 3,
        order: 2,
        name: "Svelte",
        slug: "svelte",
      },
      {
        id: 4,
        order: 4,
        name: "Three.js",
        slug: "threejs",
      },
    ],
    backend: [
      { id: 1, order: 4, name: "Node.js", slug: "nodejs" },
      {
        id: 2,
        order: 1,
        name: "Next",
        slug: "next",
      },
      {
        id: 3,
        order: 3,
        name: "Go",
        slug: "go",
      },
      {
        id: 4,
        order: 2,
        name: "Typescript",
        slug: "typescript",
      },
    ],
  },
  responsibilities: [
    {
      id: 1,
      order: 4,
      name: "Frontend developer",
    },
    {
      id: 2,
      order: 2,
      name: "Backend developer",
    },
    {
      id: 3,
      order: 1,
      name: "UI designer",
    },
    {
      id: 4,
      order: 99,
      name: "QA",
    },
  ],
  sections: [
    {
      id: 1,
      order: 1,
      title: "Project Introduction",
      layoutType: "imgTopTextBottom",
      contentText: [
        {
          id: 1,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 3,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      contentImages: [
        {
          id: 1,
          alt: "image",
          url: "https://picsum.photos/400/300",
        },
        {
          id: 2,
          alt: "image",
          url: "https://picsum.photos/1280/720",
        },
        {
          id: 3,
          alt: "image",
          url: "https://picsum.photos/1920/1080",
        },
        {
          id: 4,
          alt: "image",
          url: "https://picsum.photos/2560/1420",
        },
        {
          id: 5,
          alt: "image",
          url: "https://picsum.photos/1440/2560",
        },
      ],
      contentVideos: [
        {
          id: 1,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          id: 2,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
      ],
    },
    {
      id: 2,
      order: 2,
      title: "Problem",
      layoutType: "imgLeftTextRight",
      contentText: [
        {
          id: 1,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
          id: 2,
          content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
          id: 3,
          content: "When an unknown printer took a galley of type.",
        },
        {
          id: 4,
          content:
            "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
          id: 5,
          content:
            "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
        },
      ],
      contentImages: [
        {
          id: 1,
          alt: "image",
          url: "https://picsum.photos/400/300",
        },
        {
          id: 2,
          alt: "image",
          url: "https://picsum.photos/1920/1080",
        },
        {
          id: 3,
          alt: "image",
          url: "https://picsum.photos/1600/1200",
        },
        {
          id: 4,
          alt: "image",
          url: "https://picsum.photos/2560/1420",
        },
        {
          id: 5,
          alt: "image",
          url: "https://picsum.photos/1440/2560",
        },
      ],
      contentVideos: [
        {
          id: 1,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          id: 2,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
      ],
    },
    {
      id: 3,
      order: 3,
      title: "Tasks",
      layoutType: "imgRightTextLeft",
      contentText: [
        {
          id: 1,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
          id: 2,
          content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
          id: 3,
          content: "When an unknown printer took a galley of type.",
        },
      ],
      contentImages: [
        {
          id: 4,
          alt: "image",
          url: "https://picsum.photos/2560/1440",
        },
        {
          id: 2,
          alt: "image",
          url: "https://picsum.photos/1280/720",
        },
        {
          id: 3,
          alt: "image",
          url: "https://picsum.photos/1920/1080",
        },
        {
          id: 1,
          alt: "image",
          url: "https://picsum.photos/2560/1420",
        },
        {
          id: 5,
          alt: "image",
          url: "https://picsum.photos/1440/2560",
        },
      ],
      contentVideos: [
        {
          id: 1,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          id: 2,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
      ],
    },
    {
      id: 4,
      order: 4,
      title: "Actions",
      layoutType: "imgLeftTextRight",
      contentText: [
        {
          id: 1,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
          id: 2,
          content:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
          id: 3,
          content: "When an unknown printer took a galley of type.",
        },
        {
          id: 4,
          content:
            "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
          id: 5,
          content:
            "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
        },
      ],
      contentImages: [
        {
          id: 5,
          alt: "image",
          url: "https://picsum.photos/2560/1440",
        },
        {
          id: 2,
          alt: "image",
          url: "https://picsum.photos/1280/720",
        },
        {
          id: 3,
          alt: "image",
          url: "https://picsum.photos/1920/1080",
        },
        {
          id: 4,
          alt: "image",
          url: "https://picsum.photos/2560/1420",
        },
        {
          id: 1,
          alt: "image",
          url: "https://picsum.photos/1440/2560",
        },
      ],
      contentVideos: [
        {
          id: 1,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          id: 2,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
      ],
    },
    {
      id: 5,
      order: 5,
      title: "Results",
      layoutType: "textTopImgMiddleTextBottom",
      contentText: [
        {
          id: 1,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
        },
        {
          id: 2,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 3,
          content: "When an unknown printer took a galley of type.",
        },
      ],
      contentImages: [
        {
          id: 3,
          alt: "image",
          url: "https://picsum.photos/2560/1440",
        },
        {
          id: 2,
          alt: "image",
          url: "https://picsum.photos/1280/720",
        },
        {
          id: 1,
          alt: "image",
          url: "https://picsum.photos/1920/1080",
        },
        {
          id: 4,
          alt: "image",
          url: "https://picsum.photos/2560/1420",
        },
        {
          id: 5,
          alt: "image",
          url: "https://picsum.photos/1440/2560",
        },
      ],
      contentVideos: [
        {
          id: 1,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
        {
          id: 2,
          url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
        },
      ],
    },
  ],
};

// 辅助函数：生成随机的扩充文本
function randomText(prefix: string, index: number) {
  return `${prefix} ${index}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
}

// 生成一个新项目（基于 baseProject 的结构，但修改相应字段）
function generateProject(id: number, title: string) {
  // 深拷贝基础结构
  const newProject = JSON.parse(JSON.stringify(projectData));
  newProject.id = id;
  newProject.title = title;

  // 修改 tags（保持原有标签，也可适当变化）
  newProject.tags = [
    { id: 1, name: "React", order: 1 },
    { id: 2, name: "Vue", order: 2 }, // 示例变化
    { id: 3, name: "Full Stack", order: 3 },
    { id: 4, name: "GraphQL", order: 4 },
  ];

  // 修改 techStack（稍微更改名称和顺序）
  newProject.techStack = {
    frontend: [
      { id: 1, order: 2, name: "React", slug: "react" },
      { id: 2, order: 1, name: "Vue", slug: "vue" },
      { id: 3, order: 3, name: "Tailwind", slug: "tailwind" },
    ],
    backend: [
      { id: 1, order: 1, name: "Node.js", slug: "nodejs" },
      { id: 2, order: 2, name: "GraphQL", slug: "graphql" },
      { id: 3, order: 3, name: "Prisma", slug: "prisma" },
    ],
  };

  // 修改 responsibilities
  newProject.responsibilities = [
    { id: 1, order: 1, name: "Full stack developer" },
    { id: 2, order: 2, name: "DevOps" },
  ];

  // 修改 sections（可只保留2个章节简化）
  newProject.sections = newProject.sections
    .slice(0, 2)
    .map((section: any, idx: number) => ({
      ...section,
      id: idx + 1,
      title: idx === 0 ? `${title} - Introduction` : `${title} - Key Features`,
      contentText: section.contentText.map((t: any, i: number) => ({
        id: i + 1,
        content: randomText(`Content for ${title}`, i),
      })),
      contentImages: section.contentImages
        .slice(0, 2)
        .map((img: any, i: number) => ({
          id: i + 1,
          url: `https://picsum.photos/id/${100 + i}/800/600`,
          alt: `demo image ${i}`,
        })),
      contentVideos: section.contentVideos
        .slice(0, 1)
        .map((vid: any, i: number) => ({
          id: i + 1,
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // 示例视频
        })),
    }));

  return newProject;
}

async function main() {
  // 清空旧数据（可选，谨慎使用）
  // await prisma.projectTag.deleteMany();
  // await prisma.projectTechItem.deleteMany();
  // await prisma.projectRole.deleteMany();
  // await prisma.contentText.deleteMany();
  // await prisma.contentImage.deleteMany();
  // await prisma.contentVideo.deleteMany();
  // await prisma.section.deleteMany();
  // await prisma.project.deleteMany();
  // await prisma.tag.deleteMany();
  // await prisma.techItem.deleteMany();
  // await prisma.role.deleteMany();

  // 1. 预先创建标签(Tag)、技术项(TechItem)、角色(Role)实体（避免重复）
  // 此处为简化，采用 upsert 方式

  // 示例：创建基础标签
  const tagNames = [
    "React",
    "Vue",
    "Full Stack",
    "GraphQL",
    "Tailwind",
    "Prisma",
  ];
  for (const name of tagNames) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 创建技术项
  const techItems = [
    { name: "React", slug: "react", isFrontend: true, isBackend: false },
    { name: "Vue", slug: "vue", isFrontend: true, isBackend: false },
    { name: "Node.js", slug: "nodejs", isFrontend: false, isBackend: true },
    { name: "GraphQL", slug: "graphql", isFrontend: true, isBackend: true },
    { name: "Prisma", slug: "prisma", isFrontend: false, isBackend: true },
    { name: "Tailwind", slug: "tailwind", isFrontend: true, isBackend: false },
  ];
  for (const item of techItems) {
    await prisma.techItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }

  // 创建角色
  const roleNames = [
    "Full stack developer",
    "Frontend developer",
    "Backend developer",
    "DevOps",
    "UI designer",
    "QA",
  ];
  for (const name of roleNames) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 2. 插入项目及其关联
  const projectsData = [
    projectData,
    generateProject(2, "E-Commerce Platform"),
    generateProject(3, "Portfolio Website"),
    generateProject(4, "Task Management App"),
    generateProject(5, "Blog CMS"),
  ];

  for (const proj of projectsData) {
    // 创建 Project
    const project = await prisma.project.create({
      data: {
        id: proj.id,
        title: proj.title,
        projectUrl: proj.projectUrl,
        githubUrl: proj.githubUrl,
      },
    });

    // 关联 tags (ProjectTag)
    for (const tagInput of proj.tags) {
      const tag = await prisma.tag.findUnique({
        where: { name: tagInput.name },
      });
      if (tag) {
        await prisma.projectTag.create({
          data: {
            projectId: project.id,
            tagId: tag.id,
            order: tagInput.order,
          },
        });
      }
    }

    // 关联 techItems (ProjectTechItem) — 需要区分 category
    for (const [category, items] of Object.entries(proj.techStack)) {
      for (const item of items as any[]) {
        const tech = await prisma.techItem.findUnique({
          where: { slug: item.slug },
        });
        if (tech) {
          await prisma.projectTechItem.upsert({
            where: {
              projectId_techItemId_category: {
                projectId: project.id,
                techItemId: tech.id,
                category: category as any,
              },
            },
            update: { order: item.order },
            create: {
              projectId: project.id,
              techItemId: tech.id,
              category: category as any,
              order: item.order,
            },
          });
        }
      }
    }

    // 关联 roles (ProjectRole)
    for (const roleInput of proj.responsibilities) {
      const role = await prisma.role.findUnique({
        where: { name: roleInput.name },
      });
      if (role) {
        await prisma.projectRole.create({
          data: {
            projectId: project.id,
            roleId: role.id,
            order: roleInput.order,
          },
        });
      }
    }

    // 插入 sections 及其内容
    for (const section of proj.sections) {
      const createdSection = await prisma.section.create({
        data: {
          order: section.order,
          title: section.title,
          layoutType: section.layoutType,
          projectId: project.id,
        },
      });

      // contentText
      for (const text of section.contentText) {
        await prisma.contentText.create({
          data: {
            content: text.content,
            sectionId: createdSection.id,
          },
        });
      }

      // contentImages
      for (const img of section.contentImages) {
        await prisma.contentImage.create({
          data: {
            url: img.url,
            alt: img.alt || "",
            sectionId: createdSection.id,
          },
        });
      }

      // contentVideos
      for (const vid of section.contentVideos) {
        await prisma.contentVideo.create({
          data: {
            url: vid.url,
            sectionId: createdSection.id,
          },
        });
      }
    }
  }

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
