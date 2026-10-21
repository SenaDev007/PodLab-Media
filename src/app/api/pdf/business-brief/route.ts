import { NextResponse } from "next/server";
import { buildBusinessBriefPdf } from "@/lib/pdf-server";

// ─── GET /api/pdf/business-brief?email=… ─────────────────────────────────────
// Fiche de synthèse reçue par les abonnés du « PodLab Business Brief ».
// Le contenu est entièrement composé depuis le back-office
// « Fiches & Documents » : POD'LAB décide de ce que contient le document
// avant que l'abonné ne le télécharge.

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") ?? undefined;

    const bytes = await buildBusinessBriefPdf({
      email: email && email.includes("@") ? email : undefined,
    });
    const ab = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength
    ) as ArrayBuffer;

    return new NextResponse(ab, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="podlab-business-brief.pdf"',
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (e) {
    console.error("[pdf business-brief]", e);
    return NextResponse.json(
      { error: "Génération du Business Brief impossible pour le moment." },
      { status: 500 }
    );
  }
}
