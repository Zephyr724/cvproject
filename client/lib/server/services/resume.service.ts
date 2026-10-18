import { Prisma } from "@/src/generated/prisma/client";
import { resumeRepository } from "../repositories/resume.repository";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BusinessError } from "../errors";

export const resumeService = {
  async getResumeByUserId(userId: string) {
    const resume = await resumeRepository.findByUserId(userId);
    if (!resume) return null;
    if (!resume.user.profile?.isPublic) {
      const session = await getServerSession(authOptions);

      if (session?.user?.id !== userId) {
        throw new BusinessError("Resume not found", 404);
      }
    }

    return {
      fileData: resume.fileData,
    };
  },

  async updateResume(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) throw new BusinessError("Unauthorized", 401);

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      throw new BusinessError("Please select a PDF file", 400);
    }
    try {
      const fileData = new Uint8Array(await file.arrayBuffer());
      const signature = new TextDecoder().decode(fileData.subarray(0, 5));

      if (signature !== "%PDF-") {
        throw new BusinessError("Invalid PDF file", 400);
      }

      return resumeRepository.update(session.user.id, {
        originalName: file.name,
        fileSize: file.size,
        fileData,
      });
    } catch (error) {
      throw new Error("Failed to update resume");
    }
  },
};
