import type { Metadata } from "next";
import { AppShell } from "@/components/podlab/app-shell";
import { EvenementsView } from "@/components/podlab/evenements/evenements-view";

export const metadata: Metadata = {
  title: "Masterclasses & Événements — PodLab Media",
  description:
    "Masterclasses business, investissement BRVM et enregistrements publics PodLab à Cotonou et Abidjan. Réservez vos billets en ligne.",
};

export default function EvenementsPage() {
  return (
    <AppShell active="evenements">
      <EvenementsView />
    </AppShell>
  );
}
