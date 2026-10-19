import type { Metadata } from "next";
import { AppShell } from "@/components/podlab/app-shell";
import { StudiosView } from "@/components/podlab/studios/studios-view";

export const metadata: Metadata = {
  title: "Réserver un Studio — PodLab Media | Cotonou & Abidjan",
  description:
    "Studios professionnels 4K à Cotonou et Abidjan : enregistrement audio, vidéo podcast 4K, formule clé en main (tournage + montage). Réservation en ligne, paiement Mobile Money ou carte.",
};

export default function StudiosPage() {
  return (
    <AppShell active="studios">
      <StudiosView />
    </AppShell>
  );
}
