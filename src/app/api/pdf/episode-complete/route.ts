import { NextResponse } from "next/server";
import { buildEpisodeCompletePdf } from "@/lib/pdf-server";
import { VIDEOS } from "@/lib/videos";

// ─── GET /api/pdf/episode-complete?videoId=…&email=… ────────────────────────
// Fiche complète d'épisode (invités, citation, notes, chapitres) générée côté
// serveur. Le contenu est entièrement piloté depuis le back-office
// « Fiches & Documents » : fiche personnalisée publiée si elle existe, sinon
// contenu par défaut calculé à partir des données réelles de l'épisode.

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

    const bytes = await buildEpisodeCompletePdf(video, {
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
        "Content-Disposition": `attachment; filename="podlab-fiche-complete-${videoId}.pdf"`,
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (e) {
    console.error("[pdf episode-complete]", e);
    return NextResponse.json(
      { error: "Génération de la fiche complète impossible pour le moment." },
      { status: 500 }
    );
  }
}
