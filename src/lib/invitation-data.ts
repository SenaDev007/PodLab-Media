// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Données de la page Invitation VIP (/invitation)
// Chiffres d'impact, galerie de prestige (invités réels du catalogue YouTube)
// et guide de préparation de l'invité.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Chiffres d'impact présentés à l'invité VIP ─────────────────────────────
export const VIP_IMPACT = {
  completionRate: 62, // % de complétion moyenne des vidéos (YouTube Analytics)
  sectorBenchmark: 45, // moyenne des formats interview longs
  attentionMinutes: 115, // minutes d'attention moyennes par épisode
  listenersPerQuarter: 1_000_000,
  audienceProfile: [
    { label: "Dirigeants & fondateurs", pct: 34 },
    { label: "Cadres & consultants", pct: 27 },
    { label: "Investisseurs & finance", pct: 17 },
    { label: "Créatifs & artistes", pct: 13 },
    { label: "Étudiants & autres", pct: 9 },
  ] as Array<{ label: string; pct: number }>,
  geographies: [
    { label: "Côte d'Ivoire", pct: 31 },
    { label: "Bénin", pct: 28 },
    { label: "Sénégal & Togo", pct: 19 },
    { label: "Reste du monde", pct: 22 },
  ] as Array<{ label: string; pct: number }>,
} as const;

// ─── Galerie de prestige — vrais épisodes du catalogue @podlabmedia ──────────
export interface PrestigeGuest {
  name: string;
  role: string;
  videoId: string;
  quote?: string;
}

export const PRESTIGE_GUESTS: PrestigeGuest[] = [
  {
    name: "Stanislas Zézé",
    role: "Homme d'affaires & investisseur — en compagnie de Régis Facia",
    videoId: "ffsMdUO5dqw",
  },
  {
    name: "Richard Odjrado",
    role: "Entrepreneur — de l'enfance placée à la bourse régionale",
    videoId: "v2bdmOuogvY",
  },
  {
    name: "Steve Facia",
    role: "Star du paysage télévisuel ivoirien",
    videoId: "5qNXELZfCu0",
  },
  {
    name: "Claudy Siar Codjovi",
    role: "Voix emblématique — ex-RFI, Canal+ Afrique",
    videoId: "MRn9vTGoT74",
  },
  {
    name: "Jeanne Sissoko-Zézé",
    role: "Finance & liberté financière",
    videoId: "IfIhhB_Z5us",
  },
  {
    name: "Sagbohan Danialou",
    role: "Artiste emblématique du Bénin",
    videoId: "x37QkXpaVKM",
  },
  {
    name: "Aziz Yerima",
    role: "Fondateur PayDunya — de 400 000 F à 4 milliards",
    videoId: "u5p5v-3XhNc",
  },
  {
    name: "Stéphane Sessegnon",
    role: "International — PSG & Guépards du Bénin",
    videoId: "QUR66Uv-i90",
  },
];

// ─── Formats d'interview proposés à l'invité ─────────────────────────────────
export const VIP_FORMATS = [
  {
    id: "standard" as const,
    label: "Interview Standard",
    duration: "45 – 60 min de plateau",
    detail: "Le format Discussion Informelle : conversation structurée, sans filtre. Extraits Shorts inclus.",
  },
  {
    id: "long" as const,
    label: "Format Long",
    duration: "90 – 120 min de plateau",
    detail: "Pour les parcours complexes : rétrospective approfondie, questions des abonnés du Business Brief, chapitrage YouTube.",
  },
  {
    id: "sur-mesure" as const,
    label: "Ma Demande Spécifique",
    duration: "Défini avec la rédaction",
    detail: "Lancement, promotion d'ouvrage, prise de parole sensible : on construit le déroulé avec vous, en amont.",
  },
];

// ─── Guide de préparation — FAQ courte de l'invité ──────────────────────────
export const VIP_FAQ = [
  {
    q: "Combien de temps dure l'interview ?",
    a: "Comptez 45 à 60 minutes de plateau pour le format standard, jusqu'à 2 heures pour le format long. Sur place, prévoyez 2 h au total : accueil, brief de 10 minutes, réglage micro et lumière, tournage, puis débrief autour d'un café. Vous recevez le déroulé approximatif 48 h avant, mais aucune réponse n'est à préparer : l'émission vit de l'imprévu.",
  },
  {
    q: "Comment se déroule concrètement la journée ?",
    a: "Notre équipe vous accueille à l'heure exacte de votre créneau au studio (Cotonou ou Abidjan). Un chargé d'accueil vous briefe, la régie ajuste caméras et audio pendant que notre maquilleur(veuse) vous prépare (léger, mat, pensé pour la 4K). Le tournage est interrompu quand vous le souhaitez — pauses, reformulations, reprises sont naturelles.",
  },
  {
    q: "Dois-je préparer mes réponses ou arriver avec des notes ?",
    a: "Non — et c'est la promesse de l'émission : sans filtre, sans langue de bois. Les questions sont pensées pour déclencher des récits vrais, pas des communiqués. Si un sujet est sensible, signalez-le simplement au brief : nous l'aborderons autrement, ou pas du tout.",
  },
  {
    q: "Tenue, maquillage, image : comment me préparer ?",
    a: "Venez en tenue dans laquelle vous vous sentez puissant. Évitez les micro-motifs (moirage caméra) et les verts criards : notre plateau est pensé pour les tenues sobres et structurées. Le maquillage professionnel est pris en charge sur place, y compris retouches en cours de tournage.",
  },
  {
    q: "Que devient la vidéo après l'enregistrement ?",
    a: "Le montage complet est livré sous 7 jours. Vous validez la version finale avant publication : rien ne sort sans votre accord. Nous déclinons ensuite 3 à 5 extraits Shorts/Reels et des visuels de promotion — vous recevez tous les fichiers bruts sur demande.",
  },
  {
    q: "Que devient mes données personnelles ?",
    a: "Vos coordonnées servent exclusivement à l'organisation de votre passage (rappels, logistique). Elles sont stockées de manière chiffrée, jamais revendues ni transmises à des annonceurs, et supprimées sur simple demande après votre passage. Le contrat de diffusion vous garantit un contrôle total sur les extraits publiés.",
  },
  {
    q: "Puis-je annuler ou déplacer mon créneau ?",
    a: "Oui, gratuitement jusqu'à 48 h avant le tournage : appelez ou écrivez au studio avec votre référence VIP et un créneau équivalent vous est immédiatement réservé. Au-delà, nous nous adaptons au cas par cas — un imprévu de dirigeant reste un imprévu de dirigeant.",
  },
];
