import type { Metadata } from "next";
import { AppShell } from "@/components/podlab/app-shell";
import { InvitationView } from "@/components/podlab/invitation/invitation-view";

// ─── Page VIP /invitation ────────────────────────────────────────────────────
// Destination « invités de prestige » : envoyée par lien direct (e-mail, SMS,
// WhatsApp). Non indexée : c'est une page privée à accès prioritaire.

export const metadata: Metadata = {
  title: "Invitation VIP — Passage à l'antenne | PodLab Media",
  description:
    "Vous êtes invité(e) sur le plateau PodLab : 128 000 décideurs, 62 % de taux de complétion, réservation de créneau immédiate à Cotonou ou Abidjan — sans échange d'e-mails.",
  robots: { index: false, follow: false },
};

export default function InvitationPage() {
  return (
    <AppShell active="invitation">
      <InvitationView />
    </AppShell>
  );
}
