import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

// GET /api/admin/episodes — surcharges + épisodes personnalisés du CMS
export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const rows = await db.managedEpisode.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ episodes: rows });
  } catch (e) {
    console.error("[admin/episodes GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/admin/episodes — upsert : création d'épisode personnalisé (isCustom)
// ou override de statut d'un épisode du catalogue officiel.
const schema = z.object({
  videoId: z.string().min(3).max(40),
  isCustom: z.boolean().optional().default(false),
  title: z.string().min(2).max(200),
  guest: z.string().max(160).optional().nullable(),
  theme: z.string().min(2).max(80),
  youtubeUrl: z.string().min(6).max(300),
  thumbnail: z.string().max(400).optional().nullable(),
  excerpt: z.string().max(60000).optional().nullable(), // HTML riche
  transcription: z.string().max(200000).optional().nullable(), // HTML riche
  status: z.enum(["publie", "brouillon", "retire"]),
});

export async function PUT(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
        { status: 400 }
      );
    }
    const d = parsed.data;
    const episode = await db.managedEpisode.upsert({
      where: { videoId: d.videoId },
      create: {
        videoId: d.videoId,
        isCustom: d.isCustom,
        title: d.title,
        guest: d.guest ?? null,
        theme: d.theme,
        youtubeUrl: d.youtubeUrl,
        thumbnail: d.thumbnail ?? null,
        excerpt: d.excerpt ?? null,
        transcription: d.transcription ?? null,
        status: d.status,
      },
      update: {
        isCustom: d.isCustom,
        title: d.title,
        guest: d.guest ?? null,
        theme: d.theme,
        youtubeUrl: d.youtubeUrl,
        thumbnail: d.thumbnail ?? null,
        excerpt: d.excerpt ?? null,
        transcription: d.transcription ?? null,
        status: d.status,
      },
    });
    return NextResponse.json({ ok: true, episode });
  } catch (e) {
    console.error("[admin/episodes PUT]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/admin/episodes?videoId=… — suppression de la personnalisation
// (override de catalogue ou épisode créé depuis le back-office).
export async function DELETE(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const videoId = new URL(request.url).searchParams.get("videoId");
    if (!videoId) {
      return NextResponse.json({ error: "videoId requis." }, { status: 400 });
    }
    await db.managedEpisode.deleteMany({ where: { videoId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/episodes DELETE]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
