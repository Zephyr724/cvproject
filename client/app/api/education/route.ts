import { NextRequest, NextResponse } from "next/server";
import { educationService } from "@/lib/server/services/education.service";

export async function GET() {
  const educations = await educationService.getAllEducations();
  return NextResponse.json(educations);
}
