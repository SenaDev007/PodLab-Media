import { NextResponse } from "next/server";
import { buildEpisodePdf } from "@/lib/pdf-server";
import { VIDEOS } from "@/lib/videos";

// ─── GET /api/pdf/episode?videoId=…&email=… ─────────────────────────────────
// Fiche de synthèse d'épisode générée côté serveur (logo officiel embarqué).
// `email` optionnel : personnalise le pied de page du document.

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId") ?? "";
    const email = searchParams.get("email") ?? undefined;

    const video = VIDEOS.find((v) => v.videoId === videoId);
    if (!video) {
      return NextResponse.json(
        { error: "Épisode introuvable dans le catalogue PodLab." },
        { status: 404 }
      );
    }

    const bytes = await buildEpisodePdf(video, {
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
        "Content-Disposition": `attachment; filename="podlab-fiche-${videoId}.pdf"`,
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    console.error("[pdf episode]", e);
    return NextResponse.json(
      { error: "Génération de la fiche impossible pour le moment." },
      { status: 500 }
    );
  }
}
