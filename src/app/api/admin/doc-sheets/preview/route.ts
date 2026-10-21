import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { sanitizeSheet } from "@/lib/doc-sheet-service";
import { bandFor } from "@/lib/doc-sheets";
import { buildSheetPdf } from "@/lib/pdf-server";
import { VIDEOS } from "@/lib/videos";

export const dynamic = "force-dynamic";

// ─── POST /api/admin/doc-sheets/preview ──────────────────────────────────────
// Aperçu PDF AVANT publication : le back-office envoie l'état courant de
// l'éditeur (fiche non enregistrée comprise) et reçoit le rendu exact que
// recevra le visiteur — POD'LAB contrôle le document de fond en comble avant
// que la génération publique ne se fasse.

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const sheet = sanitizeSheet(body?.sheet ?? body);
    if (!sheet) {
      return NextResponse.json({ error: "Fiche invalide." }, { status: 400 });
    }
    const email =
      typeof body?.email === "string" && body.email.includes("@")
        ? body.email
        : undefined;

    const video = sheet.scopeKey
      ? VIDEOS.find((v) => v.videoId === sheet.scopeKey) ?? null
      : null;
    const band = bandFor(sheet.docType, video);

    const bytes = await buildSheetPdf(band, sheet, { email });
    const ab = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength
    ) as ArrayBuffer;

    return new NextResponse(ab, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="apercu-${sheet.docType}${sheet.scopeKey ? `-${sheet.scopeKey}` : ""}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[doc-sheets preview]", e);
    return NextResponse.json(
      { error: "Aperçu impossible pour le moment." },
      { status: 500 }
    );
  }
}
