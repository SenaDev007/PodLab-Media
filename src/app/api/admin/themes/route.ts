import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

// Thématiques personnalisées du CMS — stockées dans AdminSetting (clé
// « cms_custom_themes », JSON string[]). Elles s'ajoutent aux thématiques
// officielles du catalogue (VIDEO_THEMES) dans le modal « Ajouter un épisode »
// pour classer les nouveaux épisodes quand les catégories existantes sont
// insuffisantes.
const KEY = "cms_custom_themes";

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const row = await db.adminSetting.findUnique({ where: { key: KEY } });
    const themes: string[] = row ? JSON.parse(row.value) : [];
    return NextResponse.json({ themes });
  } catch (e) {
    console.error("[admin/themes GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/admin/themes — remplace la liste des thématiques personnalisées.
const schema = z.object({
  themes: z.array(z.string().min(2).max(60)).max(40),
});

export async function PUT(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Liste invalide." }, { status: 400 });
    }
    const value = JSON.stringify(parsed.data.themes);
    await db.adminSetting.upsert({
      where: { key: KEY },
      create: { key: KEY, value },
      update: { value },
    });
    return NextResponse.json({ ok: true, themes: parsed.data.themes });
  } catch (e) {
    console.error("[admin/themes PUT]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
