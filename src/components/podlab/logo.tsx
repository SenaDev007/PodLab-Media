import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── Logo PodLab Media ──────────────────────────────────────────────────────
// VRAI logo officiel — wordmark « PodLab » blanc sur fond transparent.
// Fichier : public/logo-podlab.png (181×81 — contenu 168×43 centré verticalement).
// Proposé par l'utilisateur depuis le dépôt officiel :
// github.com/SenaDev007/PodLab-Media/blob/main/public/logo-podlab.png

const SIZES = {
  // Hauteur d'affichage du canevas complet (padding vertical du PNG inclus) ;
  // le lettrage visible fait ~53 % de la hauteur du canevas.
  sm: "h-9", // 36 px → lettrage ~19 px
  md: "h-11", // 44 px → lettrage ~23 px
  lg: "h-16", // 64 px → lettrage ~34 px
} as const;

export function PodLabLogo({
  size = "md",
  className,
  priority = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Préchargement LCP (logo du header, au-dessus de la ligne de flottaison). */
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-podlab.png"
      alt="PodLab Media"
      width={181}
      height={81}
      priority={priority}
      className={cn(SIZES[size], "w-auto select-none", className)}
    />
  );
}
