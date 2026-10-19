import type { Metadata } from "next";
import { AppShell } from "@/components/podlab/app-shell";
import { SponsoringView } from "@/components/podlab/sponsoring/sponsoring-view";

export const metadata: Metadata = {
  title: "Sponsoring B2B — PodLab Media | Parlons à 128 000 décideurs",
  description:
    "Sponsoring et partenariats sur le 1er Média Business d'Afrique francophone : 128 000 abonnés YouTube, 18,2 M de vues cumulées. Qualifiez votre budget, recevez le Kit Média instantanément.",
};

export default function SponsoringPage() {
  return (
    <AppShell active="sponsoring">
      <SponsoringView />
    </AppShell>
  );
}
