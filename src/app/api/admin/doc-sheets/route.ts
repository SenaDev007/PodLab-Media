import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import {
  getDocSheet,
  listDocSheets,
  upsertDocSheet,
  deleteDocSheet,
  sanitizeSheet,
} from "@/lib/doc-sheet-service";
import { defaultSheetFor, isDocType } from "@/lib/doc-sheets";
import { VIDEOS } from "@/lib/videos";

export const dynamic = "force-dynamic";

// ─── /api/admin/doc-sheets — back-office « Fiches & Documents » ──────────────
// GET    ?docType=X               → index des fiches personnalisées du type
// GET    ?docType=X&scopeKey=Y    → { saved, defaults } pour l'éditeur
// PUT    { docType, scopeKey, … } → upsert de la fiche éditée
// DELETE ?docType=X&scopeKey=Y    → supprime la personnalisation (retour défauts)

function params(url: string) {
  const { searchParams } = new URL(url);
  const docType = searchParams.get("docType") ?? "";
  // Les documents globaux (Business Brief, Kit Média) ont une portée VIDE :
  // on distingue index et détail par la PRÉSENCE du paramètre, pas sa valeur.
  const scopeKey = searchParams.get("scopeKey") ?? "";
  const isDetail = searchParams.has("scopeKey");
  return { docType, scopeKey, isDetail };
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { docType, scopeKey, isDetail } = params(request.url);
  if (!isDocType(docType)) {
    return NextResponse.json({ error: "Type de document inconnu." }, { status: 400 });
  }

  // Index : liste des fiches personnalisées (badges de l'éditeur)
  if (!isDetail) {
    const sheets = await listDocSheets(docType);
    return NextResponse.json({ docType, sheets });
  }

  // Détail : fiche enregistrée + contenu par défaut calculé
  const video = VIDEOS.find((v) => v.videoId === scopeKey) ?? null;
  const defaults = defaultSheetFor(docType, scopeKey, video);
  const saved = await getDocSheet(docType, scopeKey);
  return NextResponse.json({ docType, scopeKey, saved, defaults });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const sheet = sanitizeSheet(body);
    if (!sheet) {
      return NextResponse.json(
        { error: "Fiche invalide — vérifiez le type de document." },
        { status: 400 }
      );
    }
    // Les fiches d'épisode doivent cibler un épisode réel du catalogue
    if (sheet.docType === "episode_synthese" || sheet.docType === "episode_complete") {
      if (!VIDEOS.some((v) => v.videoId === sheet.scopeKey)) {
        return NextResponse.json(
          { error: "Épisode introuvable dans le catalogue PodLab." },
          { status: 404 }
        );
      }
    }
    const saved = await upsertDocSheet(sheet);
    return NextResponse.json({ success: true, sheet: saved });
  } catch (e) {
    console.error("[doc-sheets PUT]", e);
    return NextResponse.json(
      { error: "Enregistrement de la fiche impossible." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { docType, scopeKey } = params(request.url);
  if (!isDocType(docType)) {
    return NextResponse.json({ error: "Type de document inconnu." }, { status: 400 });
  }
  await deleteDocSheet(docType, scopeKey);
  return NextResponse.json({ success: true });
}
