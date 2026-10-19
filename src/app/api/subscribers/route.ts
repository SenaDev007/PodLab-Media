import { NextResponse } from "next/server";
import { listSubscribers } from "@/lib/store";

// GET /api/subscribers?segment=finance — Base audience (back-office)
export async function GET(req: Request) {
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
