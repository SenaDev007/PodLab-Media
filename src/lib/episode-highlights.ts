import type { VideoTheme } from "@/types/podlab";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Points de synthèse par thématique (fiche épisode)
// Module de données pur : partagé entre le client (modale de captation)
// et le serveur (génération PDF backend).
// ═══════════════════════════════════════════════════════════════════════════

export const THEME_HIGHLIGHTS: Record<string, string[]> = {
  entrepreneuriat: [
    "Les décisions structurantes derrière la trajectoire de l'invité",
    "Méthodes, modèles économiques et leviers de croissance applicables en zone CFA",
    "Erreurs à éviter et conseils opérationnels pour entrepreneurs et dirigeants",
  ],
  finance: [
    "Principes d'argent, d'épargne et d'investissement partagés par l'invité",
    "Réflexes concrets pour bâtir son indépendance financière en Afrique",
    "Pièges financiers courants et comment les contourner",
  ],
  "success-stories": [
    "Le parcours complet : débuts, obstacles et points de bascule",
    "Les leçons de résilience transposables à votre propre projet",
    "Vision et prochaines étapes de l'invité",
  ],
  showbiz: [
    "Les coulisses de la carrière : réalités du métier et rapports à l'argent",
    "Gestion de la notoriété, des critiques et des trahisons",
    "Conseils aux artistes et créateurs de contenu",
  ],
  societe: [
    "Analyses et révélations sur les enjeux de société abordés",
    "Éclairages inédits sur les personnalités et institutions évoquées",
    "Regard contextualisé sur l'actualité béninoise et africaine",
  ],
};

export const DEFAULT_HIGHLIGHTS = [
  "Les points clés et décisions structurantes de l'épisode",
  "Les leçons business transposables à votre contexte",
];

export function highlightsFor(theme: VideoTheme): string[] {
  return THEME_HIGHLIGHTS[theme] ?? DEFAULT_HIGHLIGHTS;
}
