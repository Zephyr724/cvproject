import { prisma } from "@/lib/prisma";
import { Prisma, Resume } from "@/src/generated/prisma/client";

type ResumeUploadData = {
  originalName: string;
  fileSize: number;
  fileData: Uint8Array<ArrayBuffer>;
};

export const resumeRepository = {
  async findByUserId(userId: string) {
    return prisma.resume.findUnique({
      where: { userId },
      select: {
        fileData: true,
        user: {
          select: {
            profile: {
              select: {
                isPublic: true,
              },
            },
          },
        },
      },
    });
  },

  async update(userId: string, data: ResumeUploadData) {
    const values = {
      originalName: data.originalName,
      fileSize: data.fileSize,
      fileData: data.fileData,
      mimeType: "application/pdf",
      fileUrl: `/api/resumes/${userId}`,
      uploadedAt: new Date(),
    };

    return prisma.resume.upsert({
      where: { userId },
      create: {
        ...values,
        user: { connect: { id: userId } },
      },
      update: values,
      select: {
        id: true,
        originalName: true,
        fileUrl: true,
        fileSize: true,
        updatedAt: true,
      },
    });
  },
};
