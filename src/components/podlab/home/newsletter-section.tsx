"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Download, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/podlab/shared";
import { VIDEOS } from "@/lib/videos";
import { downloadPdf } from "@/lib/pdf";
import { toast } from "@/hooks/use-toast";

// ─── PodLab Business Brief (newsletter) — copywriting §5 ────────────────────
// Accroche : « L'Envers du Décor Business : Ce Qui Ne Passe Pas au Montage. »
// Lead magnet : Fiche de Synthèse Décideur (épisodes Stan Zézé & Richard
// Odjrado — grilles de lecture BRVM & ratios de gestion), réelle (catalogue).
const LEAD_MAGNET_EPISODES = [
  VIDEOS.find((v) => v.videoId === "ffsMdUO5dqw"), // Stanislas Zézé & Régis Facia
  VIDEOS.find((v) => v.videoId === "v2bdmOuogvY"), // Richard Odjrado
].filter((v) => v != null);

function buildLeadMagnetPdf(email: string) {
  return {
    brand: "PodLab Media — Fiche de Synthèse Décideur",
    title: "L'Envers du Décor Business",
    subtitle:
      "Fiche de synthèse décideur — épisodes Stan Zézé × Richard Odjrado · Grilles de lecture BRVM & ratios de gestion",
    sections: [
      {
        heading: "Ce que contient la Fiche Décideur",
        lines: [
          "• Grilles de lecture BRVM : comment décoder un épisode finance en actions concrètes",
          "• Ratios de gestion : les indicateurs que les bâtisseurs africains suivent réellement",
          "• Les décisions structurantes derrière les trajectoires de Stan Zézé et Richard Odjrado",
        ],
      },
      {
        heading: "Les épisodes de référence",
        lines: LEAD_MAGNET_EPISODES.map(
          (v) => `• ${v!.title} — ${v!.youtubeUrl}`
        ),
      },
      {
        heading: "PodLab Business Brief",
        lines: [
          "• Chaque dimanche matin à 8h : l'analyse confidentielle de l'épisode du jour",
          "• L'épisode sort officiellement à 13h — vous lisez l'analyse avant tout le monde",
        ],
      },
    ],
    footer: `© PodLab Media — Fiche générée pour ${email} · studiopodlab@gmail.com · +229 97 10 62 88`,
  };
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) {
      toast({
        title: "Email invalide",
        description: "Renseignez une adresse email valide.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || null,
          segment: "general",
          source: "newsletter",
        }),
      });
      if (!res.ok) throw new Error();

      // Lead magnet : téléchargement immédiat de la Fiche de Synthèse Décideur
      downloadPdf(buildLeadMagnetPdf(email), "podlab-fiche-decideur.pdf");

      setDone(true);
      toast({
        title: "Bienvenue dans le PodLab Business Brief !",
        description:
          "Fiche de Synthèse Décideur téléchargée — rendez-vous dimanche 8h00.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Inscription impossible pour le moment, réessayez.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="relative py-16 md:py-24 border-t border-white/10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="card-shine relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
            {/* Halo intérieur */}
            <div className="absolute inset-0 bg-grid-sm opacity-60" aria-hidden />
            <div
              className="absolute inset-x-0 top-0 h-52 glow-top"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl px-6 py-16 md:py-20 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
                <Mail className="size-3.5" />
                PodLab Business Brief — Newsletter
              </div>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-white">
                L&apos;Envers du Décor Business :
                <br />
                <span className="text-zinc-500">
                  Ce Qui Ne Passe Pas au Montage.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-zinc-400">
                Chaque dimanche matin à 8h, recevez l&apos;analyse financière
                et stratégique confidentielle de l&apos;épisode du jour.{" "}
                <span className="text-zinc-300">
                  En bonus immédiat : téléchargez gratuitement la Fiche de
                  Synthèse Décideur du podcast Stan Zézé &amp; Richard
                  Odjrado
                </span>{" "}
                (grilles de lecture BRVM &amp; ratios de gestion).
              </p>

              {done ? (
                <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/15 bg-black/70 p-6">
                  <CheckCircle2 className="size-10 text-white" />
                  <p className="text-sm font-semibold text-white">
                    Bienvenue dans le PodLab Business Brief
                  </p>
                  <p className="text-xs text-zinc-500">
                    Fiche de Synthèse Décideur téléchargée. Rendez-vous chaque
                    dimanche à 8h00 — l&apos;analyse arrive avant la sortie
                    officielle de l&apos;épisode à 13h.
                  </p>
                </div>
              ) : (
                <div className="mx-auto mt-8 max-w-md space-y-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      placeholder="Votre prénom (optionnel)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 flex-1 rounded-xl bg-black/60 border-white/15 text-sm"
                      aria-label="Votre prénom"
                    />
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submit()}
                      className="h-12 flex-1 rounded-xl bg-black/60 border-white/15 text-sm"
                      aria-label="Votre adresse email"
                    />
                  </div>
                  <Button
                    onClick={submit}
                    disabled={loading}
                    className="h-12 w-full rounded-xl px-6 gap-2 font-semibold"
                  >
                    {loading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Download className="size-4" />
                    )}
                    {loading
                      ? "Inscription en cours…"
                      : "Recevoir la Fiche de Synthèse + m'abonner au Business Brief"}
                  </Button>
                </div>
              )}

              <p className="mt-4 text-[11px] text-zinc-600">
                100% gratuit · Aucune publicité · Désinscription en un clic
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
