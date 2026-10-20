import { NextResponse } from "next/server";
import { buildKitMediaPdf } from "@/lib/pdf-server";

// ─── GET /api/pdf/kit-media ──────────────────────────────────────────────────
// Génère côté serveur le Kit Média & Grille Tarifaire 2026 (logo officiel
// embarqué, mise en page éditoriale A4) et le renvoie en téléchargement.

export async function GET() {
  try {
    const bytes = await buildKitMediaPdf();
    const ab = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength
    ) as ArrayBuffer;

    return new NextResponse(ab, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="podlab-kit-media-2026.pdf"',
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    console.error("[pdf kit-media]", e);
    return NextResponse.json(
      { error: "Génération du Kit Média impossible pour le moment." },
      { status: 500 }
    );
  }
}
