import { NextResponse } from "next/server";
import { getSiteStats } from "@/lib/site-stats";

export const dynamic = "force-dynamic";

/**
 * GET /api/site-stats — lecture publique des chiffres clés du site
 * (hero de la page d'accueil). Alimenté par le back-office (WinAgro-like).
 */
export async function GET() {
  const stats = await getSiteStats();
  return NextResponse.json({ stats });
}
