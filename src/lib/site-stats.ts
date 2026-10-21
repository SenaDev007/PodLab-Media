import { db } from "@/lib/db";

/**
 * Chiffres clés du site public, pilotés depuis le back-office
 * (table SiteStat) — même architecture que WinAgro (model Stat ↔ dashboard
 * « Gestion des Chiffres Clés »). Le hero lit ces valeurs avec repli sur
 * les statistiques officielles de la chaîne si la base est vide.
 */

export interface SiteStatItem {
  key: string;
  value: number;
  label: string;
  subText: string;
  prefix: string;
  format: "full" | "compact";
}

export const DEFAULT_SITE_STATS: SiteStatItem[] = [
  {
    key: "ecoutes_trim",
    value: 1_000_000,
    label: "d'Écoutes / Trimestre",
    subText:
      "Le podcast business le plus écouté au Bénin & 2e en Afrique de l'Ouest.",
    prefix: "+",
    format: "compact",
  },
  {
    key: "decideurs",
    value: 128_000,
    label: "Décideurs",
    subText:
      "Une communauté engagée de dirigeants, fondateurs, créatifs et investisseurs.",
    prefix: "+",
    format: "full",
  },
  {
    key: "studios",
    value: 2,
    label: "Studios Internationaux",
    subText:
      "Plateaux de tournage 4K Broadcast — Cotonou (Bénin) & Abidjan (Côte d'Ivoire).",
    prefix: "",
    format: "full",
  },
  {
    key: "videos",
    value: 894,
    label: "Vidéos publiées",
    subText: "Catalogue complet de l'émission Discussion Informelle.",
    prefix: "",
    format: "full",
  },
];

/** Lit les SiteStat en base ; complète avec les défauts si absents. */
export async function getSiteStats(): Promise<SiteStatItem[]> {
  try {
    const rows = await db.siteStat.findMany();
    const byKey = new Map(rows.map((r) => [r.key, r]));
    return DEFAULT_SITE_STATS.map((d) => {
      const row = byKey.get(d.key);
      return row
        ? {
            key: row.key,
            value: row.value,
            label: row.label,
            subText: row.subText,
            prefix: row.prefix,
            format: (row.format === "compact" ? "compact" : "full") as
              | "full"
              | "compact",
          }
        : d;
    });
  } catch {
    // Base indisponible (SSG sans DB) → valeurs officielles par défaut
    return DEFAULT_SITE_STATS;
  }
}
