// prisma/seed.ts
import "dotenv/config";
import { PrismaClient, UserRole } from "@generated/prisma";
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
      content: [{ type: "text", text: "Implementation" }],
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
          marks: [{ type: "textStyle", attrs: { color: "#2563eb" } }],
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
      content: [{ type: "text", text: "Architecture Overview" }],
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
          marks: [{ type: "textStyle", attrs: { color: "#d97706" } }],
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
      content: [{ type: "text", text: "Key Design Decisions" }],
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
                {
                  type: "text",
                  text: " as the rich-text editor — extensible, headless, and React-native",
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
                  text: "Replaced deprecated Section model with ",
                },
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
                {
                  type: "text",
                  text: " for media blocks (ImageCarousel, Video) to keep editing WYSIWYG",
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
                  text: "Separated admin and public routes via ",
                },
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
      content: [{ type: "text", text: "Screenshots & Media" }],
    },
    // Paragraph before carousel
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Here's a collection of screenshots from the admin dashboard:",
        },
      ],
    },
    // ImageCarousel node
    {
      type: "imageCarousel",
      attrs: {
        images: [
          {
            url: "https://picsum.photos/seed/carousel-dashboard/800/600",
            alt: "Admin dashboard overview",
          },
          {
            url: "https://picsum.photos/seed/carousel-code/800/600",
            alt: "Code editor interface",
          },
          {
            url: "https://picsum.photos/seed/carousel-settings/800/600",
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
    // ImageCarousel — left layout with text wrapping
    {
      type: "imageCarousel",
      attrs: {
        images: [
          {
            url: "https://picsum.photos/seed/carousel-left/600/400",
            alt: "Mobile responsive view",
          },
          {
            url: "https://picsum.photos/seed/carousel-left2/600/400",
            alt: "Tablet layout",
          },
        ],
        layout: "left",
        width: "50%",
      },
    },
    // Wrapping paragraph — text flows around the left-floating carousel
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The admin interface is fully responsive. It adapts seamlessly across desktop, tablet, and mobile viewports. The sidebar collapses into a hamburger menu on smaller screens, and the content editor toolbar stacks vertically to preserve touch targets. All DaisyUI components respect the active theme, providing a consistent look and feel whether the user prefers light, dark, or one of the playful variants like cupcake or cyberpunk.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Performance is a first-class concern. Images are lazy-loaded via the carousel component, and the rich-text editor only hydrates client-side when the admin page is mounted. Code-splitting by route ensures that the public-facing project pages never ship the Tiptap editor bundle.",
        },
      ],
    },
    // ImageCarousel — right layout with text wrapping
    {
      type: "imageCarousel",
      attrs: {
        images: [
          {
            url: "https://picsum.photos/seed/carousel-right/500/400",
            alt: "Dark mode theme preview",
          },
        ],
        layout: "right",
        width: "33%",
      },
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Theme support is powered by DaisyUI's built-in theming system, which uses CSS custom properties under the hood. The project ships with four pre-configured themes: light (default), dark, cupcake, and cyberpunk. Users can switch themes at runtime via the theme controller in the navbar, and the selection persists in localStorage so returning visitors keep their preference.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "All rich-text content — including these image carousels with custom layouts — is stored as portable Tiptap JSON in the database. This means the content is renderer-agnostic: it can be displayed on the public project page with a lightweight read-only renderer, exported to other formats, or even migrated to a different editor in the future without data loss.",
        },
      ],
    },
    // ImageCarousel — left layout + ordered list combo
    {
      type: "imageCarousel",
      attrs: {
        images: [
          {
            url: "https://picsum.photos/seed/carousel-left3/600/400",
            alt: "Database schema diagram",
          },
        ],
        layout: "left",
        width: "66%",
      },
    },
    // Ordered list wrapping around the left-floating carousel
    {
      type: "orderedList",
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
                  text: "Planning & Design",
                },
                {
                  type: "text",
                  text: " — Wireframed the admin UI and defined the Tiptap extension API.",
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
                  text: "Core Implementation",
                },
                {
                  type: "text",
                  text: " — Prisma schema, CRUD API with Zod, custom NodeViews for media blocks.",
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
                  text: "Editor Toolbar",
                },
                {
                  type: "text",
                  text: " — DaisyUI toolbar with headings, lists, code blocks, and media insertion.",
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
                  text: "Public Renderer",
                },
                {
                  type: "text",
                  text: " — Read-only TiptapRenderer mapping node types to React components.",
                },
              ],
            },
          ],
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
      content: [{ type: "text", text: "Code Example" }],
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
      content: [{ type: "text", text: "Deployment" }],
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
        {
          type: "text",
          text: " (backend). CI/CD pipelines run automated tests, linting, and database migrations before each deployment.",
        },
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

const bulletListDoc = (items: string[]) => ({
  type: "doc",
  content: [
    {
      type: "bulletList",
      content: items.map((text) => ({
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text,
              },
            ],
          },
        ],
      })),
    },
  ],
});

// ──────────────────────────────────────
// Project title pool (1-10)
// ──────────────────────────────────────
const PROJECT_TITLES = [
  "My first Project",
  "E-Commerce Platform",
  "Portfolio Website",
  "Task Management App",
  "Blog CMS",
  "Real-time Chat App",
  "Analytics Dashboard",
  "CI/CD Pipeline",
  "API Gateway",
  "SaaS Admin Panel",
];

// ──────────────────────────────────────
// Generate a project payload (all share tiptapContent)
// ──────────────────────────────────────
function generateProject(id: number, title: string) {
  const tags = [
    { name: id % 2 === 0 ? "Tailwind" : "React", order: 1 },
    { name: id % 3 === 0 ? "GraphQL" : "Full Stack", order: 2 },
    { name: "Prisma", order: 3 },
  ];

  const frontend = [
    { slug: "react", category: "frontend" as const, order: 1 },
    { slug: "tailwind", category: "frontend" as const, order: 2 },
    ...(id % 2 === 0
      ? [{ slug: "vue" as const, category: "frontend" as const, order: 3 }]
      : []),
  ];

  const backend = [
    { slug: "nodejs", category: "backend" as const, order: 1 },
    { slug: "prisma", category: "backend" as const, order: 2 },
    ...(id % 3 === 0
      ? [{ slug: "graphql" as const, category: "backend" as const, order: 3 }]
      : []),
  ];

  const techStack = { frontend, backend };

  const responsibilities = [
    { name: "Full stack developer", order: 1 },
    ...(id > 5
      ? [{ name: "DevOps" as const, order: 2 }]
      : [{ name: "UI designer" as const, order: 2 }]),
  ];

  return {
    id,
    title,
    tags,
    techStack,
    responsibilities,
    projectUrl: `https://github.com/Zephyr724/project-${id}`,
    githubUrl: `https://github.com/Zephyr724/project-${id}`,
  };
}

async function main() {
  // ──────────────────────────────────────
  // DELETE all data in correct FK order + reset AUTO_INCREMENT
  // ──────────────────────────────────────
  await prisma.$transaction(async (tx) => {
    // Child tables first
    await tx.projectRole.deleteMany();
    await tx.projectTechItem.deleteMany();
    await tx.projectTag.deleteMany();
    await tx.project.deleteMany(); // FK to users, safe to delete
    // Independent tables
    await tx.role.deleteMany();
    await tx.techItem.deleteMany();
    await tx.tag.deleteMany();

    // Reset AUTO_INCREMENT on each table
    await tx.$executeRawUnsafe("ALTER TABLE project_role AUTO_INCREMENT = 1");
    await tx.$executeRawUnsafe(
      "ALTER TABLE project_tech_item AUTO_INCREMENT = 1",
    );
    await tx.$executeRawUnsafe("ALTER TABLE project_tag AUTO_INCREMENT = 1");
    await tx.$executeRawUnsafe("ALTER TABLE project AUTO_INCREMENT = 1");
    await tx.$executeRawUnsafe("ALTER TABLE role AUTO_INCREMENT = 1");
    await tx.$executeRawUnsafe("ALTER TABLE tech_item AUTO_INCREMENT = 1");
    await tx.$executeRawUnsafe("ALTER TABLE tag AUTO_INCREMENT = 1");
  });
  console.log("✅ All data deleted, AUTO_INCREMENT reset to 1");

  // ──────────────────────────────────────
  // 0. Create / locate seed users
  // ──────────────────────────────────────

  const seedEmail = process.env.SEED_OWNER_EMAIL;
  const seedRoleRaw = process.env.SEED_OWNER_ROLE?.toUpperCase();
  const seedRole: UserRole =
    seedRoleRaw === "ADMIN" || seedRoleRaw === "USER" ? seedRoleRaw : "ADMIN";

  // Admin user (from your Google login, or fallback)
  let adminUser;
  if (seedEmail) {
    adminUser = await prisma.user.findUnique({
      where: { email: seedEmail },
    });
    if (!adminUser) {
      console.error(
        `❌ Admin user with email "${seedEmail}" not found. Please log in with Google first, then run seed.`,
      );
      process.exit(1);
    }
    if (adminUser.role !== seedRole) {
      await prisma.user.update({
        where: { id: adminUser.id },
        data: { role: seedRole },
      });
    }
    console.log(`✅ Admin user: ${adminUser.email} (id=${adminUser.id})`);
  } else {
    adminUser = await prisma.user.upsert({
      where: { email: "admin@cvproject.dev" },
      update: {},
      create: {
        name: "Seed Admin",
        email: "admin@cvproject.dev",
        role: "ADMIN",
      },
    });
    console.log(
      `⚠️  No SEED_OWNER_EMAIL set — using fallback admin: ${adminUser.email}`,
    );
  }

  // Test user (non-admin, for permission testing)
  const testUser = await prisma.user.upsert({
    where: { email: "testuser@cvproject.dev" },
    update: { role: "USER" },
    create: {
      name: "Test User",
      email: "testuser@cvproject.dev",
      role: "USER",
    },
  });
  console.log(`✅ Test user: ${testUser.email} (id=${testUser.id})`);

  // Upsert admin profile
  await prisma.profile.upsert({
    where: {
      userId: adminUser.id,
    },
    update: {
      displayName: adminUser.name ?? "Portfolio Owner",
      headline: "Software Developer",
      bio: "Welcome to my portfolio.",
      email: adminUser.email,
      linkedin: "https://www.linkedin.com/in/your-linkedin",
      github: "https://github.com/your-github",
      website: null,
      isPublic: true,
    },
    create: {
      displayName: adminUser.name ?? "Portfolio Owner",
      headline: "Software Developer",
      bio: "Welcome to my portfolio.",
      slug: "tiffani-ho",
      email: adminUser.email,
      linkedin: "https://www.linkedin.com/in/your-linkedin",
      github: "https://github.com/your-github",
      website: null,
      isPublic: true,
      user: {
        connect: {
          id: adminUser.id,
        },
      },
    },
  });

  // Upsert test-user profile
  await prisma.profile.upsert({
    where: {
      userId: testUser.id,
    },
    update: {
      displayName: testUser.name ?? "Test User",
      headline: "Test Profile",
      bio: "This profile is used for permission testing.",
      email: testUser.email,
      linkedin: null,
      github: null,
      website: null,
      isPublic: false,
    },
    create: {
      displayName: testUser.name ?? "Test User",
      headline: "Test Profile",
      bio: "This profile is used for permission testing.",
      slug: "test-user",
      email: testUser.email,
      linkedin: null,
      github: null,
      website: null,
      isPublic: false,
      user: {
        connect: {
          id: testUser.id,
        },
      },
    },
  });

  console.log("✅ Profiles seeded");

  // ──────────────────────────────────────
  // 1. Upsert tags, techItems, roles
  // ──────────────────────────────────────

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

  // ──────────────────────────────────────
  // 2. Insert 10 projects (1-5 → admin, 6-10 → testuser)
  // ──────────────────────────────────────

  for (let i = 1; i <= 10; i++) {
    const ownerId = i <= 5 ? adminUser.id : testUser.id;
    const proj = generateProject(i, PROJECT_TITLES[i - 1]);

    const project = await prisma.project.create({
      data: {
        title: proj.title,
        introduction: `An introduction about ${proj.title}.`,
        coverImageUrl: `https://picsum.photos/seed/${i}/800/400`,
        projectUrl: proj.projectUrl,
        githubUrl: proj.githubUrl,
        ownerId,
        content: tiptapContent,
      },
    });

    // Tags
    for (const t of proj.tags) {
      const tag = await prisma.tag.findUnique({ where: { name: t.name } });
      if (tag) {
        await prisma.projectTag.create({
          data: { projectId: project.id, tagId: tag.id, order: t.order },
        });
      }
    }

    // TechItems
    for (const [category, items] of Object.entries(proj.techStack)) {
      for (const item of items as typeof proj.techStack.frontend) {
        const tech = await prisma.techItem.findUnique({
          where: { slug: item.slug },
        });
        if (tech) {
          await prisma.projectTechItem.upsert({
            where: {
              projectId_techItemId_category: {
                projectId: project.id,
                techItemId: tech.id,
                category: category as "frontend" | "backend",
              },
            },
            update: { order: item.order },
            create: {
              projectId: project.id,
              techItemId: tech.id,
              category: category as "frontend" | "backend",
              order: item.order,
            },
          });
        }
      }
    }

    // Roles
    for (const r of proj.responsibilities) {
      const role = await prisma.role.findUnique({ where: { name: r.name } });
      if (role) {
        await prisma.projectRole.create({
          data: { projectId: project.id, roleId: role.id, order: r.order },
        });
      }
    }
    console.log(
      `  [${i}/10] "${proj.title}" → owner=${ownerId === adminUser.id ? "admin" : "testuser"}`,
    );
  }

  const experiences = [
    {
      title: "Software Developer Intern",
      company: "ABC Technology Ltd",
      startDate: new Date("2025-11-01"),
      endDate: new Date("2026-02-28"),
      description: bulletListDoc([
        "Developed and maintained web application features using React and Node.js.",
        "Collaborated with team members through Git and participated in code reviews.",
      ]),
      techItems: ["react", "nodejs"],
    },
    {
      title: "IT Support Assistant",
      company: "XYZ Solutions",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-11-30"),
      description: bulletListDoc([
        "Provided technical support to staff.",
        "Troubleshot hardware and software issues.",
        "Assisted with system maintenance.",
      ]),
      techItems: [],
    },
    {
      title: "Full Stack Developer",
      company: "Innovation Studio",
      startDate: new Date("2026-03-01"),
      endDate: null,
      description: bulletListDoc([
        "Building full-stack web applications using Next.js, Prisma, and MySQL.",
        "Responsible for API development, database design, and deployment.",
      ]),
      techItems: ["react", "nodejs", "prisma"],
    },
  ];

  for (const exp of experiences) {
    const { techItems, ...experienceData } = exp;
    await prisma.experience.upsert({
      where: {
        userId_title_company: {
          userId: adminUser.id,
          title: exp.title,
          company: exp.company,
        },
      },
      update: {
        ...experienceData,
        userId: adminUser.id,

        techItems: {
          deleteMany: {},
          create: techItems.map((slug) => ({
            techItem: {
              connect: {
                slug: slug,
              },
            },
          })),
        },
      },

      create: {
        ...experienceData,
        userId: adminUser.id,

        techItems: {
          create: techItems.map((slug) => ({
            techItem: {
              connect: {
                slug: slug,
              },
            },
          })),
        },
      },
    });
  }

  const educations = [
    {
      degree: "Bachelor of Computer Science",
      institution: "Tech University",
      startDate: new Date("2020-02-01"),
      endDate: new Date("2024-11-30"),
      description: bulletListDoc([
        "Focused on software engineering, algorithms, databases, and web development.",
      ]),
    },
    {
      degree: "Master of Data Science",
      institution: "Global Institute of Technology",
      startDate: new Date("2025-02-01"),
      endDate: null,

      description: bulletListDoc([
        "Studied machine learning, big data analytics, artificial intelligence, and cloud computing.",
      ]),
    },
    {
      degree: "Diploma in Information Technology",
      institution: "City Polytechnic",
      startDate: new Date("2018-01-15"),
      endDate: new Date("2019-12-15"),
      description: bulletListDoc([
        "Covered programming fundamentals, networking, database systems, and IT support.",
      ]),
    },
  ];

  for (const edu of educations) {
    await prisma.education.upsert({
      where: {
        userId_degree_institution: {
          userId: adminUser.id,
          degree: edu.degree,
          institution: edu.institution,
        },
      },
      update: {
        userId: adminUser.id,
      },
      create: {
        ...edu,
        userId: adminUser.id,
      },
    });
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
