import type {
  BookingSlot,
  PodLabEvent,
  Studio,
  StudioFormula,
} from "@/types/podlab";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Données commerciales (studios, événements, sponsoring)
// 1er Média Business d'Afrique francophone — Studios Cotonou & Abidjan
// Catalogue réel des épisodes : voir src/lib/videos.ts
// ═══════════════════════════════════════════════════════════════════════════

// ─── Studios physiques ───────────────────────────────────────────────────────
export const STUDIOS: Studio[] = [
  {
    id: "cotonou",
    city: "Cotonou",
    country: "Bénin",
    flag: "BJ",
    address: "Fidjrossè Plage, Boulevard de la Marina",
    capacity: "3 invités + équipe technique",
    features: [
      "Plateau 4K Broadcast 3 caméras",
      "Cabine audio traitée acoustiquement",
      "Régie lumière & fond noir studio",
      "Fibre dédiée pour live streaming",
    ],
  },
  {
    id: "abidjan",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    flag: "CI",
    address: "Cocody Riviera Golf, Rue des Jardins",
    capacity: "4 invités + équipe technique",
    features: [
      "Plateau 4K Broadcast 120 m² double fond",
      "Studio audio double cabine",
      "Traitement acoustique professionnel",
      "Régie complète + station de montage",
    ],
  },
];

// Packs studios — copywriting officiel (charte copywriting_podlab_complet.docx §4)
export const STUDIO_FORMULAS: StudioFormula[] = [
  {
    id: "audio",
    name: "Pack Audio Master",
    description:
      "Idéal pour les émissions de radio, livres audio et voix off. Isolation phonique studio, microphones Shure SM7B, ingénieur du son dédié.",
    price: 75_000,
    duration: "3 heures",
    features: [
      "Isolation phonique studio",
      "Microphones Shure SM7B",
      "Ingénieur du son dédié",
      "Fichiers WAV + MP3 livrés",
    ],
  },
  {
    id: "video4k",
    name: "Pack Podcasting Vidéo 4K",
    description:
      "Configuration multi-caméras (3 angles), éclairage cinématique, décor modulable premium, enregistrement live multi-pistes.",
    price: 150_000,
    duration: "3 heures",
    features: [
      "3 caméras 4K · 3 angles",
      "Éclairage cinématique",
      "Décor modulable premium",
      "Enregistrement live multi-pistes",
    ],
  },
  {
    id: "cle-en-main",
    name: "Pack Production Exécutive Clé en Main",
    description:
      "De l'idée au montage final. Inclus : tournage, habillage sonore, découpe des extraits Shorts/Reels et sous-titrage.",
    price: 350_000,
    duration: "Journée complète",
    features: [
      "Tout le Pack Podcasting Vidéo 4K",
      "Habillage sonore + montage final",
      "Découpe Shorts / Reels incluse",
      "Sous-titrage complet",
    ],
  },
];

export const BOOKING_SLOTS: BookingSlot[] = [
  { slot: "09:00 – 12:00", label: "Matinée" },
  { slot: "14:00 – 17:00", label: "Après-midi" },
  { slot: "18:00 – 21:00", label: "Soirée" },
];

// ─── Événements & billetterie ────────────────────────────────────────────────
export const EVENTS: PodLabEvent[] = [
  {
    id: "evt-brvm-cotonou",
    title: "Masterclass : Réussir son 1er Investissement BRVM",
    city: "Cotonou",
    venue: "PodLab Studio Cotonou — Fidjrossè",
    date: "2026-11-08",
    time: "09:00 – 13:00",
    price: 25_000,
    seatsLeft: 18,
    description:
      "Atelier pratique de 4 heures avec analyste sur place : ouverture de compte titres, sélection de valeurs, stratégies de dividendes. Places limitées pour garantir l'interactivité.",
    tag: "Finance",
  },
  {
    id: "evt-live-abidjan",
    title: "Enregistrement Public PodLab Live × Invité Mystère",
    city: "Abidjan",
    venue: "PodLab Studio Abidjan — Cocody Riviera",
    date: "2026-11-15",
    time: "18:00 – 21:00",
    price: 15_000,
    seatsLeft: 42,
    description:
      "Assistez en direct à l'enregistrement d'un épisode avec un invité mystère de la tech africaine. Networking + cocktail de clôture inclus.",
    tag: "Émission live",
  },
  {
    id: "evt-growth-benin",
    title: "Masterclass : Growth pour PME Africaines",
    city: "Cotonou",
    venue: "Espace Créatif — Ganhi",
    date: "2026-11-22",
    time: "09:00 – 16:00",
    price: 35_000,
    seatsLeft: 9,
    description:
      "Journée intensive : tunnels de conversion, acquisition mobile money, rétention client. Chaque participant repart avec un plan d'action growth sur mesure.",
    tag: "Business",
  },
];

// ─── CRM Sponsoring ──────────────────────────────────────────────────────────
export const BUDGET_OPTIONS = [
  {
    id: "A" as const,
    label: "Option A — Découverte",
    range: "< 500 000 F CFA / mois",
    description: "Testez le média : mentions podcasts, spots newsletter ciblés.",
  },
  {
    id: "B" as const,
    label: "Option B — Croissance",
    range: "500 000 – 1 000 000 F CFA / mois",
    description: "Sponsoring d'épisodes récurrents + présence événementielle.",
  },
  {
    id: "C" as const,
    label: "Option C — Sur-mesure",
    range: "+ 1 000 000 F CFA / mois",
    description: "Title sponsor, épisodes dédiés, dispositif sur-mesure, priorité commerciale haute.",
  },
] as const;

export const LEAD_STATUS_LABELS = {
  nouveau: "Nouveau Lead",
  kit_envoye: "Kit Média Envoyé",
  rdv_cale: "RDV Calé",
  devis: "Devis",
  signe: "Signé",
} as const;

// Formatage monnaie F CFA
export function formatCFA(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} F CFA`;
}

// Formatage date française
export function formatDateFR(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShortFR(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}
