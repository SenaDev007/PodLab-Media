import { NextResponse } from "next/server";
import { isMemoryMode } from "@/lib/store";
import { CONTACT } from "@/lib/brand";

// GET /api — Health check du site PodLab Media
export async function GET() {
  return NextResponse.json({
    name: "PodLab Media",
    status: "ok",
    mode: isMemoryMode() ? "demo (mémoire — voir README pour PostgreSQL)" : "prisma+sqlite",
    contact: CONTACT.email,
  });
}
