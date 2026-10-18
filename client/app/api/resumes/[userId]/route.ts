import { NextResponse } from "next/server";
import { resumeService } from "@/lib/server/services/resume.service";
import { BusinessError } from "@/lib/server/errors";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;
    const resume = await resumeService.getResumeByUserId(userId);
    const fileData = resume?.fileData;

    if (!fileData || fileData.length === 0) {
      throw new BusinessError("Resume not found", 404);
    }
    return new Response(new Uint8Array(fileData), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="resume.pdf"',
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        {
          status: error.status,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    console.error("Failed to load resume:", error);

    return NextResponse.json(
      { error: "Failed to load resume" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
