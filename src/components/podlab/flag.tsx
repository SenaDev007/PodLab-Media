import { cn } from "@/lib/utils";
import type { CountryFlagCode } from "@/types/podlab";

// ─── Drapeaux SVG inline ─────────────────────────────────────────────────────
// Les emojis drapeaux (🇧🇯 / 🇨🇮) ne sont PAS rendus par Windows ni par Chrome
// desktop — seul le code pays « BJ » / « CI » apparaissait, quel que soit le
// navigateur ou l'appareil. Ces drapeaux SVG vectoriels s'affichent partout :
// desktop, mobile, tous navigateurs, et même dans les PDF générés côté serveur.

const FLAG_LABELS: Record<CountryFlagCode, string> = {
  BJ: "Drapeau du Bénin",
  CI: "Drapeau de la Côte d'Ivoire",
};

/**
 * Drapeau national en SVG inline.
 * - `cover` : recadre le drapeau pour remplir un conteneur carré (comme
 *   `object-cover`), idéal pour les pastilles d'identité.
 * - sans `cover` : le drapeau garde ses proportions 3:2 naturelles.
 */
export function CountryFlag({
  code,
  className,
  cover = false,
}: {
  code: CountryFlagCode;
  className?: string;
  cover?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 900 600"
      preserveAspectRatio={cover ? "xMidYMid slice" : "xMidYMid meet"}
      className={cn("block shrink-0", className)}
      role="img"
      aria-label={FLAG_LABELS[code] ?? code}
      xmlns="http://www.w3.org/2000/svg"
    >
      {code === "BJ" ? (
        <>
          {/* Bénin — bande verticale verte au mât, moitié haute jaune, moitié basse rouge */}
          <rect width="300" height="600" fill="#008751" />
          <rect x="300" width="600" height="300" fill="#FCD116" />
          <rect x="300" y="300" width="600" height="300" fill="#E8112D" />
        </>
      ) : (
        <>
          {/* Côte d'Ivoire — tricolore vertical orange / blanc / vert */}
          <rect width="300" height="600" fill="#F77F00" />
          <rect x="300" width="300" height="600" fill="#FFFFFF" />
          <rect x="600" width="300" height="600" fill="#009E60" />
        </>
      )}
    </svg>
  );
}
