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

  return newProject;
}

async function main() {
  // 清空旧数据（可选，谨慎使用）
  // await prisma.projectTag.deleteMany();
  // await prisma.projectTechItem.deleteMany();
  // await prisma.projectRole.deleteMany();
  // await prisma.project.deleteMany();
  // await prisma.tag.deleteMany();
  // await prisma.techItem.deleteMany();
  // await prisma.role.deleteMany();

  // 0. 创建种子用户（用于 owner 关联）
  const seedUser = await prisma.user.upsert({
    where: { email: "admin@cvproject.dev" },
    update: {},
    create: {
      name: "Seed Admin",
      email: "admin@cvproject.dev",
      role: "ADMIN",
    },
  });

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
        title: proj.title,
        introduction: `An introduction about ${proj.title}.`,
        coverImageUrl: `https://picsum.photos/seed/${proj.id}/800/400`,
        projectUrl: proj.projectUrl,
        githubUrl: proj.githubUrl,
        ownerId: seedUser.id,
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
