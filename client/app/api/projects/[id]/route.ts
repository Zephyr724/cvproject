import { NextRequest, NextResponse } from "next/server";
import { projectService } from "@/lib/server/services/project.service";
import { BusinessError } from "@/lib/server/errors";
import { requireAuth, requireProjectOwner } from "@/lib/server/auth-guard";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Ensure user is authenticated; throws 401 if no valid session
    const session = await requireAuth();
    const { id } = await params;
    // Ensure project exists (404) and caller is ADMIN or owner (403)
    const project = await requireProjectOwner(session, parseInt(id));

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Ensure user is authenticated; throws 401 if no valid session
    const session = await requireAuth();
    const { id } = await params;
    const idNumber = parseInt(id);
    const body = await request.json();
    // Ensure project exists (404) and caller is ADMIN or owner (403)
    await requireProjectOwner(session, parseInt(id));

    const project = await projectService.update(idNumber, body);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Ensure user is authenticated; throws 401 if no valid session
    const session = await requireAuth();
    const { id } = await params;
    const idNumber = parseInt(id);
    // Ensure project exists (404) and caller is ADMIN or owner (403)
    await requireProjectOwner(session, parseInt(id));

    const project = await projectService.deleteById(idNumber);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
