import { NextResponse } from "next/server";
import { listSubscribers } from "@/lib/store";
import { requireAdmin } from "@/lib/admin-guard";

// GET /api/subscribers?segment=finance — Base audience (back-office — session admin requise)
export async function GET(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const segment = searchParams.get("segment");

    const subscribers = await listSubscribers(segment ?? undefined);
    return NextResponse.json({ subscribers });
  } catch (e) {
    console.error("[subscribers GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
