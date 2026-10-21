import type { PodLabVideo } from "@/types/podlab";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Extraction du contenu éditorial réel d'un épisode
// Fonctions pures partagées entre la fiche web (/episodes/[videoId]), le
// back-office « Fiches & Documents » et la génération PDF backend. Aucun
// contenu inventé : tout provient de la description officielle YouTube
// publiée par la rédaction.
// ═══════════════════════════════════════════════════════════════════════════

/** Nettoie la description YouTube : liens, coordonnées, séparateurs. */
export function cleanNotes(raw: string): string {
  return raw
    .replace(/https?:\/\/\S+/g, "")
    .replace(/^\s*(contact|tél|tel|site|suivez[- ]nous|rejoignez|abonnez[- ]vous|cliquez|commandez|réserv)\b.*$/gim, "")
    .replace(/[_—-]{4,}/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Les 2-3 premières phrases du synopsis (sans liens). */
export function synopsisFrom(raw: string): string {
  const clean = raw
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length < 40) return "";
  const sentences = clean.match(/[^.!?…]+[.!?…]*/g) ?? [clean];
  return sentences.slice(0, 3).join(" ").trim();
}

/** Thèmes réellement abordés — puces extraites de la description officielle
 *  YouTube publiée par la rédaction (aucun contenu inventé). */
export function topicsFrom(raw: string): string[] {
  const BULLET = /^[•●▪]\s+|^[\u2714\u2713]\uFE0F?\s+/;
  const topics: string[] = [];
  for (const line of raw.split("\n")) {
    const l = line.trim();
    if (!BULLET.test(l)) continue;
    const t = l.replace(BULLET, "").trim();
    if (t.length < 12 || t.length > 160 || /^https?/i.test(t)) continue;
    topics.push(t);
  }
  return [...new Set(topics)].slice(0, 8);
}

/** Synopsis garanti non vide — repli éditorial générique si la description
 *  YouTube est trop courte (les fiches restent publiables dans tous les cas). */
export function synopsisFor(video: PodLabVideo): string {
  return (
    synopsisFrom(video.description ?? "") ||
    `Nouvel épisode de l'émission « Discussion Informelle » — le podcast business le plus écouté au Bénin et le 2ᵉ d'Afrique de l'Ouest. Une conversation sans filtre, orientée ROI, classée ${video.theme} dans le catalogue PodLab Media.`
  );
}

/** Date de publication lisible (« 12 octobre 2025 »). */
export function formatDateFr(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${iso}T12:00:00Z`));
  } catch {
    return iso;
  }
}

/** Durée lisible (« 1 h 42 min ») depuis des secondes. */
export function formatDurationFr(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return m > 0 ? `${h} h ${m} min` : `${h} h`;
  if (m > 0) return s > 0 ? `${m} min ${s} s` : `${m} min`;
  return `${s} s`;
}

/** Vues lisibles (« 52 300 vues »). */
export function formatViewsFr(views: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(views)} vues`;
}
