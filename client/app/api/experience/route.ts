import { NextRequest, NextResponse } from "next/server";
import { experienceService } from "@/lib/server/services/experience.service";

export async function GET() {
  const experiences = await experienceService.getAllExperiences();
  return NextResponse.json(experiences);
}
