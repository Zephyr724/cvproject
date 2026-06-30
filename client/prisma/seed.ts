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

// ──────────────────────────────────────
// Tiptap JSON — covers all toolbar styles
// ──────────────────────────────────────
const tiptapContent = {
  type: "doc",
  content: [
    // H1 标题: "Implementation"
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        { type: "text", text: "Implementation" },
      ],
    },
    // Intro paragraph with mixed styles
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This project was built with a " },
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "modern React stack",
        },
        { type: "text", text: " leveraging " },
        {
          type: "text",
          marks: [
            { type: "textStyle", attrs: { color: "#2563eb" } },
          ],
          text: "Next.js 14 App Router",
        },
        { type: "text", text: " and " },
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "server-side rendering",
        },
        { type: "text", text: " for optimal performance." },
      ],
    },
    // H2: "Architecture Overview"
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "Architecture Overview" },
      ],
    },
    // Paragraph with different font sizes
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            { type: "textStyle", attrs: { fontSize: "18px" } },
            { type: "bold" },
          ],
          text: "Backend",
        },
        {
          type: "text",
          text: " services run on a microservice architecture with ",
        },
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "NestJS",
        },
        { type: "text", text: " as the core framework. " },
        {
          type: "text",
          marks: [
            { type: "textStyle", attrs: { fontSize: "14px" } },
            { type: "italic" },
          ],
          text: "(deployed on AWS ECS with auto-scaling)",
        },
      ],
    },
    // Paragraph with colored text
    {
      type: "paragraph",
      content: [
        { type: "text", text: "The database layer uses " },
        {
          type: "text",
          marks: [
            { type: "textStyle", attrs: { color: "#059669" } },
            { type: "bold" },
          ],
          text: "Prisma ORM",
        },
        { type: "text", text: " with MySQL, providing type-safe queries and " },
        {
          type: "text",
          marks: [
            { type: "textStyle", attrs: { color: "#d97706" } },
          ],
          text: "automatic migration management",
        },
        { type: "text", text: "." },
      ],
    },
    // Bullet list
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Client",
                },
                {
                  type: "text",
                  text: " — Next.js + Tailwind CSS + DaisyUI + Three.js",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Server",
                },
                {
                  type: "text",
                  text: " — NestJS monorepo with modular service design",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Database",
                },
                {
                  type: "text",
                  text: " — MySQL 8 with Prisma ORM",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Auth",
                },
                {
                  type: "text",
                  text: " — NextAuth.js v5 with GitHub OAuth",
                },
              ],
            },
          ],
        },
      ],
    },
    // Horizontal rule
    { type: "horizontalRule" },
    // H2: "Key Design Decisions"
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "Key Design Decisions" },
      ],
    },
    // Ordered list
    {
      type: "orderedList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Chose " },
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Tiptap",
                },
                { type: "text", text: " as the rich-text editor — extensible, headless, and React-native" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Replaced deprecated Section model with " },
                {
                  type: "text",
                  marks: [{ type: "italic" }],
                  text: "JSON content column",
                },
                { type: "text", text: " for flexible project editing" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Used " },
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "custom NodeViews",
                },
                { type: "text", text: " for media blocks (ImageCarousel, Video) to keep editing WYSIWYG" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Separated admin and public routes via " },
                {
                  type: "text",
                  marks: [{ type: "bold" }],
                  text: "Next.js middleware",
                },
                { type: "text", text: " with role-based access control" },
              ],
            },
          ],
        },
      ],
    },
    // Blockquote
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "💡 The entire content editing pipeline — from toolbar to JSON serialization — is fully custom-built on top of Tiptap's extension system, allowing us to ship rich project pages without a traditional CMS.",
            },
          ],
        },
      ],
    },
    // H2: "Screenshots & Media"
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "Screenshots & Media" },
      ],
    },
    // Paragraph before carousel
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Here's a collection of screenshots from the admin dashboard:" },
      ],
    },
    // ImageCarousel node
    {
      type: "imageCarousel",
      attrs: {
        images: [
          {
            url: "https://loremflickr.com/800/600/dashboard?random=1",
            alt: "Admin dashboard overview",
          },
          {
            url: "https://loremflickr.com/800/600/code?random=2",
            alt: "Code editor interface",
          },
          {
            url: "https://loremflickr.com/800/600/computer?random=3",
            alt: "Project settings page",
          },
        ],
        layout: "full",
        width: "full",
      },
    },
    // Paragraph
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The admin panel supports real-time content preview with live JSON output for debugging.",
        },
      ],
    },
    // Video node
    {
      type: "video",
      attrs: {
        video: {
          src: "https://youtu.be/nK9d09fFSyc",
        },
      },
    },
    // H2: "Code Example"
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "Code Example" },
      ],
    },
    // Paragraph
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Here's how the " },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#7c3aed" } }],
          text: "ImageCarouselNode",
        },
        { type: "text", text: " extension is registered in Tiptap:" },
      ],
    },
    // Code block
    {
      type: "codeBlock",
      attrs: {
        language: "typescript",
      },
      content: [
        {
          type: "text",
          text: `// Registering a custom NodeView in Tiptap
export const ImageCarouselNode = Node.create({
  name: "imageCarousel",
  group: "block",
  draggable: true,

  addCommands() {
    return {
      insertImageCarousel: () => ({ commands }) =>
        commands.insertContent([
          { type: this.name, attrs: { images: [] } },
          { type: "paragraph" },
        ]),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageCarouselNodeView);
  },
});`,
        },
      ],
    },
    // Horizontal rule
    { type: "horizontalRule" },
    // Final H2 & paragraph with font-size 12px footnote
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "Deployment" },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "The project is deployed on " },
        {
          type: "text",
          marks: [
            { type: "bold" },
            { type: "textStyle", attrs: { color: "#dc2626" } },
          ],
          text: "Vercel",
        },
        { type: "text", text: " (frontend) and " },
        {
          type: "text",
          marks: [
            { type: "bold" },
            { type: "textStyle", attrs: { color: "#2563eb" } },
          ],
          text: "AWS ECS",
        },
        { type: "text", text: " (backend). CI/CD pipelines run automated tests, linting, and database migrations before each deployment." },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            { type: "textStyle", attrs: { fontSize: "12px" } },
            { type: "italic" },
          ],
          text: "Last updated: June 2026 — Migration from Section model to Tiptap JSON content system completed.",
        },
      ],
    },
  ],
};

// ──────────────────────────────────────
// Base project data (without id override)
// ──────────────────────────────────────
const projectData = {
  id: 1,
  title: "My first Project",
  tags: [
    { id: 1, name: "React", order: 1 },
    { id: 2, name: "Svelte", order: 2 },
    { id: 3, name: "Full Stack", order: 3 },
    { id: 4, name: "Serverless", order: 4 },
  ],
  projectUrl: "https://github.com/Zephyr724/cvproject",
  githubUrl: "https://github.com/Zephyr724/cvproject",
  techStack: {
    frontend: [
      { id: 1, order: 3, name: "React", slug: "react" },
      { id: 2, order: 1, name: "Next", slug: "next" },
      { id: 3, order: 2, name: "Svelte", slug: "svelte" },
      { id: 4, order: 4, name: "Three.js", slug: "threejs" },
    ],
    backend: [
      { id: 1, order: 4, name: "Node.js", slug: "nodejs" },
      { id: 2, order: 1, name: "Next", slug: "next" },
      { id: 3, order: 3, name: "Go", slug: "go" },
      { id: 4, order: 2, name: "Typescript", slug: "typescript" },
    ],
  },
  responsibilities: [
    { id: 1, order: 4, name: "Frontend developer" },
    { id: 2, order: 2, name: "Backend developer" },
    { id: 3, order: 1, name: "UI designer" },
    { id: 4, order: 99, name: "QA" },
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
  // 清空旧数据（按外键依赖顺序删除）
  await prisma.projectTag.deleteMany();
  await prisma.projectTechItem.deleteMany();
  await prisma.projectRole.deleteMany();
  await prisma.project.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.techItem.deleteMany();
  await prisma.role.deleteMany();

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
    // 创建 Project（第一个项目带 rich content，其余用空占位 content）
    const project = await prisma.project.create({
      data: {
        title: proj.title,
        introduction: `An introduction about ${proj.title}.`,
        coverImageUrl: `https://picsum.photos/seed/${proj.id}/800/400`,
        projectUrl: proj.projectUrl,
        githubUrl: proj.githubUrl,
        ownerId: seedUser.id,
        // 所有项目都附带同一个 Tiptap JSON content（展示所有样式）
        content: tiptapContent,
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