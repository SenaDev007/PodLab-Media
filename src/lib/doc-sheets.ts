import type { PodLabVideo } from "@/types/podlab";
import { highlightsFor } from "@/lib/episode-highlights";
import { VIDEOS as VIDEOS_LIGHT } from "@/lib/videos";
import {
  cleanNotes,
  synopsisFor,
  topicsFrom,
  formatDateFr,
  formatDurationFr,
} from "@/lib/episode-content";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Fiches PDF pilotées depuis le back-office
//
// Modèle de données éditorial commun à tous les documents PDF distribués sur
// le site public : fiche de synthèse d'épisode (5 min), fiche complète
// (invités / citation / notes), fiche abonnés « PodLab Business Brief » et
// Kit Média annonceurs.
//
// Chaque fiche = un titre, un sous-titre et une liste ordonnée de sections
// activables. Le back-office édite tout ce contenu AVANT génération ; tant
// qu'aucune fiche n'est enregistrée (ou si elle est dépubliée), la génération
// utilise les valeurs PAR DÉFAUT calculées ci-dessous à partir du catalogue
// réel de la chaîne. Ce module est volontairement client-safe (aucun import
// serveur) : il pré-remplit l'éditeur du back-office et fournit les replis
// des routes PDF.
// ═══════════════════════════════════════════════════════════════════════════

export type DocType =
  | "episode_synthese"
  | "episode_complete"
  | "business_brief"
  | "kit_media";

export type SheetSectionKind =
  | "paragraph"
  | "bullets"
  | "chapters"
  | "quote"
  | "guests"
  | "stats"
  | "bars"
  | "table"
  | "callout"
  | "contact";

export interface SheetSection {
  id: string;
  kind: SheetSectionKind;
  label: string;
  enabled: boolean;
  /** paragraph / callout : corps de texte (les sauts de ligne doubles font des paragraphes). */
  text?: string;
  /** bullets / chapters : une entrée par ligne. table : lignes « cellule | cellule ». */
  items?: string[];
  /** quote */
  quoteText?: string;
  quoteAuthor?: string;
  /** guests */
  guests?: { name: string; role: string }[];
  /** stats */
  stats?: { value: string; label: string }[];
  /** bars */
  bars?: { label: string; pct: number }[];
  /** table */
  tableHeaders?: string[];
  tableWidths?: number[];
  /** callout */
  calloutValue?: string;
}

export interface DocSheetData {
  docType: DocType;
  scopeKey: string;
  title: string;
  subtitle: string;
  sections: SheetSection[];
  showContact: boolean;
  footerNote: string;
  published: boolean;
  updatedAt?: string;
}

// ─── Méta-données des types de documents (affichage back-office) ────────────

export const DOC_TYPES: Array<{
  id: DocType;
  label: string;
  short: string;
  perEpisode: boolean;
  description: string;
}> = [
  {
    id: "episode_synthese",
    label: "Fiche de synthèse d'épisode",
    short: "Synthèse 5 min",
    perEpisode: true,
    description:
      "Lead magnet envoyé contre email depuis chaque fiche épisode — le contenu que POD'LAB décide d'y faire figurer.",
  },
  {
    id: "episode_complete",
    label: "Fiche complète d'épisode",
    short: "Fiche complète",
    perEpisode: true,
    description:
      "Document enrichi téléchargé depuis la fiche épisode : invités, citation, notes et chapitres réels.",
  },
  {
    id: "business_brief",
    label: "Fiche abonnés — PodLab Business Brief",
    short: "Business Brief",
    perEpisode: false,
    description:
      "Fiche de synthèse reçue par les abonnés du Business Brief lors de leur inscription (et chaque dimanche).",
  },
  {
    id: "kit_media",
    label: "Kit Média & grille tarifaire",
    short: "Kit Média",
    perEpisode: false,
    description:
      "Document annonceurs débloqué dans le tunnel sponsoring — audience, formats et tarifs.",
  },
];

export function isDocType(v: string): v is DocType {
  return DOC_TYPES.some((t) => t.id === v);
}

const SECTION_KINDS: SheetSectionKind[] = [
  "paragraph",
  "bullets",
  "chapters",
  "quote",
  "guests",
  "stats",
  "bars",
  "table",
  "callout",
  "contact",
];

export function isSheetSectionKind(v: string): v is SheetSectionKind {
  return (SECTION_KINDS as string[]).includes(v);
}

let seq = 0;
/** Identifiant stable pour une nouvelle section (éditeur back-office). */
export function sectionId(prefix = "sec"): string {
  seq = (seq + 1) % 10000;
  return `${prefix}-${Date.now().toString(36)}-${seq}`;
}

function sec(
  id: string,
  kind: SheetSectionKind,
  label: string,
  data: Partial<SheetSection> = {},
  enabled = true
): SheetSection {
  return { id, kind, label, enabled, ...data };
}

/** Prochain dimanche (date d'envoi du Brief) au format « 26 octobre 2025 ». */
function nextSundayLabel(from = new Date()): string {
  const d = new Date(from);
  const add = (7 - d.getDay()) % 7 || 7; // dimanche = 0
  d.setDate(d.getDate() + add);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
  }).format(d);
}

// ─── Défaut 1 : fiche de synthèse d'épisode (5 min — lead magnet) ───────────

export function defaultEpisodeSynthese(video: PodLabVideo): DocSheetData {
  return {
    docType: "episode_synthese",
    scopeKey: video.videoId,
    title: video.title,
    subtitle: `Émission « Discussion Informelle » · Chaîne officielle PodLab @podlabmedia`,
    sections: [
      sec("essentiel", "bullets", "L'essentiel de cet épisode", {
        items: highlightsFor(video.theme),
      }),
      sec("usage", "paragraph", "Comment utiliser cette fiche", {
        text: "Lisez-la en 5 minutes avant votre réunion, votre investissement ou votre prise de décision. Repérez les leçons directement transposables à votre contexte, puis approfondissez en regardant l'épisode complet — les passages clés y sont cités.",
      }),
      sec("lien", "paragraph", "Épisode complet", {
        text: `Épisode complet : ${video.youtubeUrl}`,
      }),
      sec("aller-plus-loin", "bullets", "Aller plus loin avec PodLab", {
        items: [
          "Abonnez-vous au PodLab Business Brief : l'analyse business de chaque épisode, chaque dimanche à 8h.",
          "Nos studios 4K de Cotonou et Abidjan accueillent vos propres formats — réservation en ligne.",
          "Suivez-nous : Instagram @podlab.so · TikTok @podlabmedia · Facebook /podlabmedia.",
        ],
      }),
    ],
    showContact: true,
    footerNote: "",
    published: true,
  };
}

// ─── Défaut 2 : fiche complète d'épisode (invités, citation, notes) ─────────

export function defaultEpisodeComplete(video: PodLabVideo): DocSheetData {
  const synopsis = synopsisFor(video);
  const notes = video.description ? cleanNotes(video.description) : "";
  const hasLongNotes = notes.length > synopsis.length + 120;
  const topics = topicsFrom(video.description ?? "");
  const guests = video.guests ?? [];

  const stats: { value: string; label: string }[] = [];
  if (video.publishedAt) stats.push({ value: formatDateFr(video.publishedAt), label: "date de publication" });
  if (video.durationSeconds) stats.push({ value: formatDurationFr(video.durationSeconds), label: "durée de l'épisode" });
  if (video.views) stats.push({ value: new Intl.NumberFormat("fr-FR").format(video.views), label: "vues YouTube" });

  return {
    docType: "episode_complete",
    scopeKey: video.videoId,
    title: video.title,
    subtitle: `Fiche complète — invités, citation & notes · Émission « Discussion Informelle »`,
    sections: [
      ...(stats.length
        ? [sec("chiffres", "stats", "L'épisode en chiffres", { stats })]
        : []),
      ...(guests.length
        ? [
            sec("invites", "guests", "Invités de l'épisode", {
              guests: guests.map((g) => ({ name: g, role: "Invité — Discussion Informelle" })),
            }),
          ]
        : []),
      ...(video.citation
        ? [
            sec("citation", "quote", "Citation marquante", {
              quoteText: video.citation,
              quoteAuthor: guests.length ? `${guests.join(" & ")} — extrait de l'épisode` : "Extrait de l'épisode",
            }),
          ]
        : []),
      sec("synopsis", "paragraph", "Synopsis", { text: synopsis }),
      ...(topics.length >= 3
        ? [sec("programme", "chapters", "Au programme de cet épisode", { items: topics })]
        : []),
      ...(hasLongNotes
        ? [sec("notes", "paragraph", "Notes de l'épisode — description officielle", { text: notes })]
        : []),
      sec("ecouter", "bullets", "Où écouter cet épisode", {
        items: [
          `YouTube — ${video.youtubeUrl}`,
          `YouTube Music — https://music.youtube.com/watch?v=${video.videoId}`,
        ],
      }),
      sec("aller-plus-loin", "bullets", "Aller plus loin avec PodLab", {
        items: [
          "Abonnez-vous au PodLab Business Brief : l'analyse business de chaque épisode, chaque dimanche à 8h.",
          "Nos studios 4K de Cotonou et Abidjan accueillent vos propres formats — réservation en ligne.",
        ],
      }),
    ],
    showContact: true,
    footerNote: "",
    published: true,
  };
}

// ─── Défaut 3 : fiche abonnés « PodLab Business Brief » ──────────────────────

const BRIEF_REFERENCE_EPISODES = ["ffsMdUO5dqw", "v2bdmOuogvY"]; // Stan Zézé × Richard Odjrado (réels)

export function defaultBusinessBrief(): DocSheetData {
  const reference = BRIEF_REFERENCE_EPISODES.map((id) =>
    VIDEOS_LIGHT.find((v) => v.videoId === id)
  ).filter((v): v is PodLabVideo => v != null);

  return {
    docType: "business_brief",
    scopeKey: "",
    title: "L'Envers du Décor Business",
    subtitle: `Fiche de synthèse décideur — PodLab Business Brief · Édition du ${nextSundayLabel()}`,
    sections: [
      sec("contenu", "bullets", "Ce que contient la Fiche Décideur", {
        items: [
          "Grilles de lecture BRVM : comment décoder un épisode finance en actions concrètes",
          "Ratios de gestion : les indicateurs que les bâtisseurs africains suivent réellement",
          "Les décisions structurantes derrière les trajectoires de Stan Zézé et Richard Odjrado",
        ],
      }),
      ...(reference.length
        ? [
            sec("references", "bullets", "Les épisodes de référence", {
              items: reference.map((v) => `${v.title} — ${v.youtubeUrl}`),
            }),
          ]
        : []),
      sec("analyse", "paragraph", "L'analyse du dimanche", {
        text: "Chaque dimanche matin à 8h00, recevez l'analyse financière et stratégique confidentielle de l'épisode du jour. L'épisode sort officiellement à 13h — vous lisez l'analyse avant tout le monde.",
      }),
      sec("chiffre", "callout", "Le chiffre de la semaine", {
        calloutValue: "128 000",
        text: "décideurs — cadres, dirigeants et investisseurs — suivent déjà l'analyse PodLab chaque semaine. Rejoignez le cercle.",
      }),
      sec("ce-que-vous-recevez", "bullets", "Ce que vous recevrez chaque dimanche", {
        items: [
          "L'analyse confidentielle de l'épisode du jour, à 8h00 — avant sa sortie officielle à 13h",
          "Les fiches de synthèse des épisodes décryptés en 5 minutes, en PDF",
          "Invitations VIP aux masterclasses et enregistrements publics, en priorité",
        ],
      }),
    ],
    showContact: true,
    footerNote: "Document réservé aux abonnés du PodLab Business Brief.",
    published: true,
  };
}

// ─── Défaut 4 : Kit Média & grille tarifaire (annonceurs) ────────────────────

export function defaultKitMedia(): DocSheetData {
  return {
    docType: "kit_media",
    scopeKey: "",
    title: "Le 1er média business d'Afrique francophone.",
    subtitle:
      "128 000 décideurs abonnés · 1 million d'écoutes par trimestre · 894 vidéos publiées · 2 studios 4K Broadcast internationaux",
    sections: [
      sec("audience", "stats", "L'audience PodLab en bref", {
        stats: [
          { value: "128 000", label: "décideurs abonnés YouTube" },
          { value: "1 M+", label: "écoutes par trimestre" },
          { value: "894", label: "vidéos publiées" },
          { value: "78 %", label: "cadres, dirigeants & investisseurs" },
        ],
      }),
      sec("profil", "bars", "Profil des auditeurs", {
        bars: [
          { label: "Dirigeants & fondateurs d'entreprise", pct: 34 },
          { label: "Cadres supérieurs & consultants", pct: 27 },
          { label: "Investisseurs & professionnels de la finance", pct: 17 },
          { label: "Créatifs, artistes & créateurs de contenu", pct: 13 },
          { label: "Étudiants en business & autres curieux", pct: 9 },
        ],
      }),
      sec("methode", "paragraph", "Méthodologie", {
        text: "Moyennes internes constatées sur les 12 derniers mois (YouTube Analytics + base newsletter PodLab Business Brief). 14 pays d'écoute : Côte d'Ivoire, Bénin, Sénégal, Togo, Cameroun et France en tête.",
      }),
      sec("attention", "callout", "Niveau d'attention — notre actif le plus rare", {
        calloutValue: "62 %",
        text: "de taux de complétion moyen des vidéos PodLab — là où les formats interview longs s'arrêtent en général autour de 45 %. Une audience qui écoute jusqu'au bout, donc expose durablement votre marque.",
      }),
      sec("formats", "bullets", "Nos formats pour annonceurs", {
        items: [
          "Mentions orales naturelles intégrées aux épisodes (Finance & Investissement, Success Stories, Entrepreneuriat, Showbiz)",
          "Intégration produit en plateau 4K + déclinaison extraits Shorts / Reels",
          "Relais newsletter B2B « PodLab Business Brief » — audience 100 % professionnelle",
          "Masterclasses & enregistrements publics : speaking, stand, billetterie partenaire",
          "Épisode dédié « Marque Story » produit en studio clé en main (script, tournage, montage)",
        ],
      }),
      sec("tarifs", "table", "Grille tarifaire indicative (F CFA)", {
        tableHeaders: ["Format", "Contenu", "Tarif"],
        tableWidths: [2.4, 4.6, 1.7],
        items: [
          "Mention orale épisode | 60 à 90 secondes intégrées au fil d'un épisode existant | dès 250 000",
          "Sponsoring Success Stories | Package 4 épisodes ciblés + relais newsletter | sur devis",
          "Épisode dédié « Marque Story » | Interview de marque produite clé en main | sur devis",
          "Pack studio — Audio Master | 3 h d'enregistrement, ingénieur du son dédié | 75 000",
          "Pack studio — Podcasting Vidéo 4K | 3 caméras 4K, éclairage cinématique, 3 h | 150 000",
          "Pack Production Clé en Main | Journée complète : tournage + montage + extraits | 350 000",
          "Événements & masterclasses | Speaking, stand, billetterie partenaire | sur devis",
        ],
      }),
      sec("pourquoi", "bullets", "Pourquoi PodLab plutôt qu'ailleurs ?", {
        items: [
          "CPM PodLab : 2 500 F CFA pour 1 000 écoutes qualifiées — contre ~10 000 F CFA en équivalent TV / presse, soit 4 fois moins cher.",
          "2 heures de temps d'attention moyen par épisode : votre message est écouté, pas survolé.",
          "Un environnement premium : nos plateaux 4K de Cotonou et Abidjan valorisent l'image de votre marque.",
        ],
      }),
      sec("travaillons", "paragraph", "Travaillons ensemble", {
        text: `Qualifiez votre objectif et débloquez le kit complet en ligne : ${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://podlab-media.vercel.app").replace(/^https?:\/\//, "").replace(/\/+$/, "")}/sponsoring`,
      }),
    ],
    showContact: true,
    footerNote: "",
    published: true,
  };
}

// ─── Fabrique de défauts (routes API + éditeur back-office) ─────────────────

export function defaultSheetFor(
  docType: DocType,
  scopeKey: string,
  video: PodLabVideo | null
): DocSheetData {
  switch (docType) {
    case "episode_synthese":
      return defaultEpisodeSynthese(video!);
    case "episode_complete":
      return defaultEpisodeComplete(video!);
    case "business_brief":
      return defaultBusinessBrief();
    case "kit_media":
      return defaultKitMedia();
  }
}

/** Bandeau d'en-tête du document (kicker + titre de bande) selon le type. */
export function bandFor(docType: DocType, video: PodLabVideo | null): {
  kicker: string;
  title: string;
} {
  switch (docType) {
    case "episode_synthese":
      return {
        kicker: "Fiche de synthèse",
        title: `Discussion Informelle · ${video?.theme ?? "PodCast"}`,
      };
    case "episode_complete":
      return {
        kicker: "Fiche complète",
        title: `Discussion Informelle · ${video?.theme ?? "PodCast"}`,
      };
    case "business_brief":
      return { kicker: "PodLab Business Brief", title: "Fiche de synthèse — abonnés" };
    case "kit_media":
      return { kicker: "Kit Média 2026", title: "Média & grille tarifaire — annonceurs" };
  }
}
