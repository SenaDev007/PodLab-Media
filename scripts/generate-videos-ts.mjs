// Génère src/lib/videos.ts à partir des métadonnées oEmbed réelles (scripts/videos-data.json)
// + une cartographie thématique éditoriale (vidéo par vidéo).
import fs from "node:fs";

const data = JSON.parse(
  fs.readFileSync("/home/z/my-project/scripts/videos-data.json", "utf8")
);

// Thèmes éditoriaux du catalogue réel PodLab
const THEMES = {
  "entrepreneursuriat": "Entrepreneuriat & Business",
  "finance": "Finance & Investissement",
  "success-stories": "Success Stories",
  "showbiz": "Musique & Showbiz",
  "societe": "Société & Révélations",
};

// Cartographie éditoriale (videoId -> thème)
const THEME_MAP = {
  "ffsMdUO5dqw": "entrepreneuriat", // Stanislas Zézé & Régis Facia
  "hTCraS5qU34": "finance", // Si tu gagnes 1 million — Stan Zézé
  "v2bdmOuogvY": "success-stories", // Richard ODJRADO
  "5qNXELZfCu0": "success-stories", // Steve Facia
  "Fzw4I2M5Nz0": "showbiz", // Quiz Master Danny
  "MRn9vTGoT74": "success-stories", // Claudy Siar Codjovi
  "IfIhhB_Z5us": "finance", // Jeanne SISSOKO-ZEZE
  "x-3JodohGP0": "societe", // Huguette BOPKE
  "TSzxqWtgqF4": "showbiz", // X-Time
  "x37QkXpaVKM": "societe", // Sagbohan DANIALOU — présidents
  "_ccQXbS71Zs": "success-stories", // Sagbohan DANIALOU — trahison
  "J04QN8m5gqA": "societe", // Rodrigue AKO — Patrice TALON
  "eW08xU1hf1A": "success-stories", // Jerry Sinclair
  "0_mxbi5pHZY": "showbiz", // Stévy WALLACE
  "_3gZ2IXeg1s": "societe", // Patrice TALON
  "56nmEWSUYMw": "societe", // Com du Pr TALON
  "ursfTiR8MbE": "finance", // Leslie Ossete — levée 1M€
  "H9KzvG32N04": "entrepreneuriat", // Gilles Atayi — client pas roi
  "M8is_gvx46M": "success-stories", // Fred Sympoz
  "0XQRGskW-nE": "success-stories", // Tchif
  "JngieFjqOG8": "entrepreneuriat", // Vital — 22 agents IA
  "Av7KHSdVEZY": "showbiz", // Président Djangoun
  "u5p5v-3XhNc": "success-stories", // Aziz Yerima — PayDunya
  "97Pwlm4pNIY": "showbiz", // King Mensah
  "kO0pi8plsX8": "showbiz", // King Mensah
  "W632rC9VhI0": "success-stories", // Keith Sonon
  "3P1oL6ReFJ0": "entrepreneuriat", // Valère Tadagbé — manioc
  "hqGxOPRhWPY": "showbiz", // Bella Agossou
  "sv3pMXULrSk": "showbiz", // Meiway
  "7Ec0vtM1k98": "showbiz", // Willy Dumbo
  "Ts_NX8YAiKo": "entrepreneuriat", // Jeff Lebeninoa — réseautage
  "VLwOCxBu8uU": "showbiz", // Shado Chris
  "33OSU4rh4SA": "showbiz", // First King x Fanicko
  "CDJX4Y7TuNI": "showbiz", // Blaaz
  "Y6ny6DKFD-8": "showbiz", // Fanicko
  "Zrn3EHMw4aw": "showbiz", // Amir — Blaaz CCC
  "jllYfJBMLSA": "showbiz", // Amir
  "KETjRHucqbo": "showbiz", // Bobo Wê
  "_bSXkAnGOmA": "showbiz", // Bobo Wê
  "n391rT7I1GA": "showbiz", // Bobo Wê
  "2pc-MCNP4QI": "entrepreneuriat", // Hermann Cakpo — milliard
  "IGET1L2pWRc": "entrepreneuriat", // Eden Food
  "MzX4uUpSrzM": "showbiz", // Axel Merryl — vendeur
  "xmcyahI_d6s": "entrepreneuriat", // Régis Facia — 30 ans 30 leçons
  "07UPhsoutTk": "showbiz", // Vano Baby
  "FmQp8ShPSZ8": "showbiz", // artiste N°1
  "Wfy2oKUzqkE": "showbiz", // Vano Baby — 5 millions
  "anFA8KKDkcc": "showbiz", // Vano Baby — trahison
  "27gLHkYqNfA": "success-stories", // Tgang
  "vrMxGPRiFvs": "showbiz", // First King
  "0xocLvQCOgM": "entrepreneuriat", // Hermann Cakpo — empire
  "59cWlAws2-U": "success-stories", // Sèdo Tossou
  "LacEC_HFG3A": "finance", // Jonathan Morrison
  "L5QAmcmeb2w": "showbiz", // Pépé Oleka
  "kM5amDE4Fbk": "showbiz", // TMA Crush
  "bl7k6PbA9os": "success-stories", // Crisba
  "cDKKgloOQLA": "success-stories", // Bovann
  "O-1IeHwz8UM": "showbiz", // The Style
  "Cay9Fe3W7IQ": "entrepreneuriat", // ex-DG BlackBerry
  "ZOuhkvn66mU": "showbiz", // Ladji K1000 & Saiyan Armand
  "QUR66Uv-i90": "showbiz", // Stéphane Sessegnon
  "EhPptDYXMIA": "finance", // Philippe Simo
  "HjrjO-BhU94": "showbiz", // Conex et Don
  "Gn206I4UBPE": "showbiz", // Stéphanie Montcho
  "NG0kX0uRqck": "entrepreneuriat", // Entrepreneuriat vs Parentalité
  "HON6Dup5B_c": "success-stories", // Fabrice COMLAN
  "2W0bj2JDmDg": "showbiz", // Mickaël Poté
  "RD453L9h_Vo": "showbiz", // Axel Merryl
  "YzQxx0O7h7I": "entrepreneuriat", // Mariage & entrepreneuriat
  "LPdFb9fUI6w": "showbiz", // Djo le magicien P2
  "k_6rWpJDsJs": "showbiz", // Djo le magicien P1
  "VowKTxQyyuA": "entrepreneuriat", // Nabou Fall x Senam Beheton
  "8MO_QzB9T04": "showbiz", // Nasty Nesta & Olsen
  "ozrySoegUCA": "entrepreneuriat", // Mylène Flicka — internet
  "WDpakVcKRY0": "showbiz", // Richard Flash
};

// Invités marquants pour le bandeau défilant (tous issus de vrais épisodes)
const GUESTS = [
  "STAN ZÉZÉ", "RÉGIS FACIA", "RICHARD ODJRADO", "HERMANN CAKPO", "AZIZ YERIMA",
  "JEANNE SISSOKO-ZÉZÉ", "SÈDO TOSSOU", "MEIWAY", "KING MENSAH", "TMA CRUSH",
  "VITAL", "JERRY SINCLAIR", "PHILIPPE SIMO", "MYLÈNE FLICKA", "BOBO WÊ",
];

const entries = data
  .filter((v) => v.title)
  .map((v) => {
    const title = v.title.trim().replace(/\s+/g, " ");
    const theme = THEME_MAP[v.id] ?? "showbiz";
    return `  {
    videoId: ${JSON.stringify(v.id)},
    title: ${JSON.stringify(title)},
    theme: ${JSON.stringify(theme)},
    youtubeUrl: "https://www.youtube.com/watch?v=${v.id}",
    thumbnail: "https://i.ytimg.com/vi/${v.id}/hqdefault.jpg",
  },`;
  });

const out = `import type { PodLabVideo, VideoTheme } from "@/types/podlab";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Catalogue réel des épisodes YouTube (chaîne @podlabmedia)
// 128 K abonnés · 18,2 M de vues cumulées · 894 vidéos
// Titres récupérés depuis l'API oEmbed YouTube (scripts/fetch-videos.mjs).
// ═══════════════════════════════════════════════════════════════════════════

export const VIDEO_THEMES: Record<VideoTheme, string> = ${JSON.stringify(THEMES, null, 2)};

// ─── Catalogue (ordre : du plus récent au plus ancien) ───────────────────────
export const VIDEOS: PodLabVideo[] = [
${entries.join("\n")}
];

// Épisode vedette affiché dans le hero (dernière publication)
export const FEATURED_VIDEO: PodLabVideo = VIDEOS[0];

// Invités marquants — tous issus d'épisodes réels (bandeau accueil)
export const NOTABLE_GUESTS: string[] = ${JSON.stringify(GUESTS, null, 2)};

// Statistiques officielles de la chaîne YouTube PodLab (octobre 2026)
export const CHANNEL_STATS = {
  "subscribers": 128_000,
  "totalViews": 18_282_319,
  "videos": 894,
  "countries": 14,
} as const;
`;

fs.writeFileSync("/home/z/my-project/src/lib/videos.ts", out);
console.log("src/lib/videos.ts généré :", entries.length, "vidéos.");
const counts = {};
for (const t of Object.values(THEME_MAP)) counts[t] = (counts[t] ?? 0) + 1;
console.log("Répartition thèmes :", counts);
