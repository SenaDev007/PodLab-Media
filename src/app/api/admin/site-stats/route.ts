import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { getSiteStats } from "@/lib/site-stats";

export const dynamic = "force-dynamic";

/** GET /api/admin/site-stats — lecture back-office des chiffres clés. */
export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const stats = await getSiteStats();
  return NextResponse.json({ stats });
}

/**
 * PUT /api/admin/site-stats — mise à jour des chiffres clés affichés sur le
 * site public (valeur, libellé, sous-texte). Chaque clé est upsertée.
 */
export async function PUT(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { stats } = await request.json();
    if (!Array.isArray(stats)) {
      return NextResponse.json(
        { error: "Format invalide : tableau attendu." },
        { status: 400 }
      );
    }

    for (const s of stats) {
      if (
        typeof s?.key !== "string" ||
        typeof s?.value !== "number" ||
        typeof s?.label !== "string" ||
        typeof s?.subText !== "string"
      ) {
        continue;
      }
      await db.siteStat.upsert({
        where: { key: s.key },
        update: {
          value: Math.max(0, Math.round(s.value)),
          label: s.label.slice(0, 80),
          subText: s.subText.slice(0, 200),
          prefix: typeof s.prefix === "string" ? s.prefix.slice(0, 2) : "",
          format: s.format === "compact" ? "compact" : "full",
        },
        create: {
          key: s.key,
          value: Math.max(0, Math.round(s.value)),
          label: s.label.slice(0, 80),
          subText: s.subText.slice(0, 200),
          prefix: typeof s.prefix === "string" ? s.prefix.slice(0, 2) : "",
          format: s.format === "compact" ? "compact" : "full",
        },
      });
    }

    const updated = await getSiteStats();
    return NextResponse.json({ success: true, stats: updated });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer les chiffres clés." },
      { status: 500 }
    );
  }
}
