import "dotenv/config";
import { Prisma, PrismaClient } from "@generated/prisma";
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

const SOURCE_USER_EMAIL = "testuser@cvproject.dev";
const TITLE_SUFFIX = " (Zephyr Test)";

async function main() {
  const targetEmail = process.env.COPY_TARGET_EMAIL;

  if (!targetEmail) {
    throw new Error("COPY_TARGET_EMAIL is not configured");
  }

  // Find Test User and retrieve the first five projects.
  const sourceUser = await prisma.user.findUnique({
    where: {
      email: SOURCE_USER_EMAIL,
    },
    include: {
      projects: {
        orderBy: {
          id: "asc",
        },
        take: 5,
        include: {
          tags: true,
          techItems: true,
          roles: true,
        },
      },
    },
  });

  if (!sourceUser) {
    throw new Error(`Source user not found: ${SOURCE_USER_EMAIL}`);
  }

  if (sourceUser.projects.length !== 5) {
    throw new Error(
      `Expected 5 source projects, but found ${sourceUser.projects.length}`,
    );
  }

  // Find the target account by email.
  const targetUser = await prisma.user.findUnique({
    where: {
      email: targetEmail,
    },
  });

  if (!targetUser) {
    throw new Error(`Target user not found: ${targetEmail}`);
  }

  await prisma.$transaction(async (tx) => {
    for (const sourceProject of sourceUser.projects) {
      const copiedTitle = `${sourceProject.title}${TITLE_SUFFIX}`;

      // Prevent duplicate copies when the script runs more than once.
      const existingCopy = await tx.project.findFirst({
        where: {
          ownerId: targetUser.id,
          title: copiedTitle,
        },
      });

      if (existingCopy) {
        console.log(`Skipped existing project: ${copiedTitle}`);
        continue;
      }

      // First step: copy the project itself.
      const copiedProject = await tx.project.create({
        data: {
          title: copiedTitle,
          introduction: sourceProject.introduction,
          coverImageUrl: sourceProject.coverImageUrl,
          projectUrl: sourceProject.projectUrl,
          githubUrl: sourceProject.githubUrl,
          ownerId: targetUser.id,

          // Omit the content field when the source content is null.
          ...(sourceProject.content !== null
            ? {
                content: sourceProject.content as Prisma.InputJsonValue,
              }
            : {}),
        },
      });

      // Second step: copy the associations between the project and Tags.
      if (sourceProject.tags.length > 0) {
        await tx.projectTag.createMany({
          data: sourceProject.tags.map((item) => ({
            projectId: copiedProject.id,
            tagId: item.tagId,
            order: item.order,
          })),
        });
      }

      // Third step: copy the associations between the project and TechItems.
      if (sourceProject.techItems.length > 0) {
        await tx.projectTechItem.createMany({
          data: sourceProject.techItems.map((item) => ({
            projectId: copiedProject.id,
            techItemId: item.techItemId,
            category: item.category,
            order: item.order,
          })),
        });
      }

      // Fourth step: copy the associations between the project and Roles.
      if (sourceProject.roles.length > 0) {
        await tx.projectRole.createMany({
          data: sourceProject.roles.map((item) => ({
            projectId: copiedProject.id,
            roleId: item.roleId,
            order: item.order,
          })),
        });
      }

      console.log(
        `Copied "${sourceProject.title}" as "${copiedProject.title}"`,
      );
    }
  });

  console.log("Finished copying projects.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
