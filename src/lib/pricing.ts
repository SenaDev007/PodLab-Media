import type { StudioCity, StudioFormulaId } from "@/types/podlab";

// Tarifs officiels PodLab (F CFA par créneau) — source unique de vérité
export const PRICES: Record<StudioCity, Record<StudioFormulaId, number>> = {
  cotonou: { audio: 75_000, video4k: 150_000, "cle-en-main": 340_000 },
  abidjan: { audio: 85_000, video4k: 160_000, "cle-en-main": 350_000 },
};

export function getPrice(city: StudioCity, formula: StudioFormulaId): number {
  return PRICES[city][formula];
}
