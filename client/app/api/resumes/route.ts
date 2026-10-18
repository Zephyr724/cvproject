import { requireAuth } from "@/lib/server/auth-guard";
import { BusinessError } from "@/lib/server/errors";
import { resumeService } from "@/lib/server/services/resume.service";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET() {
  try {
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const formdata = await req.formData();

    const resume = await resumeService.updateResume(formdata);
    return NextResponse.json(resume, { status: 200 });
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.log("Unexpected error: ", error);
  }
}
