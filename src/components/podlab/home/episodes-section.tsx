"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Play, Loader2, CheckCircle2, FileText, Search, Youtube, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import { VIDEOS, VIDEO_THEMES } from "@/lib/videos";
import { SOCIALS, CONTACT } from "@/lib/brand";
import { downloadPdf } from "@/lib/pdf";
import { toast } from "@/hooks/use-toast";
import type { PodLabVideo, VideoTheme } from "@/types/podlab";
import { cn } from "@/lib/utils";

type Filter = "all" | VideoTheme;

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "Tous" },
  { id: "entrepreneuriat", label: "Entrepreneuriat & Business" },
  { id: "finance", label: "Finance & Investissement" },
  { id: "success-stories", label: "Success Stories" },
  { id: "showbiz", label: "Musique & Showbiz" },
  { id: "societe", label: "Société & Révélations" },
];

const PAGE_SIZE = 9;

// Points de synthèse par thématique (fiche PDF de captation)
const THEME_HIGHLIGHTS: Record<VideoTheme, string[]> = {
  entrepreneursuriat: [
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

// ─── Modale de téléchargement du résumé PDF (captation email) ────────────────
function PdfCaptureDialog({
  video,
  open,
  onOpenChange,
}: {
  video: PodLabVideo | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!video || !email.includes("@")) {
      toast({ title: "Email invalide", description: "Renseignez une adresse email valide." });
      return;
    }
    setLoading(true);
    try {
      // Captation : l'email est enregistré dans la base audience (source episode-pdf)
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || null,
          segment: video.theme,
          source: "episode-pdf",
        }),
      });

      downloadPdf(
        {
          brand: "PodLab Media — Fiche d'épisode",
          title: video.title,
          subtitle: `Thématique : ${VIDEO_THEMES[video.theme]} · Chaîne YouTube PodLab (@podlabmedia)`,
          sections: [
            {
              heading: "L'essentiel de cet épisode",
              lines: THEME_HIGHLIGHTS[video.theme].map((h) => `• ${h}`),
            },
            {
              heading: "Pour aller plus loin",
              lines: [
                `• Regardez l'épisode complet sur YouTube : ${video.youtubeUrl}`,
                "• Abonnez-vous au PodLab Business Brief, chaque lundi matin.",
                `• Suivez PodLab : Instagram ${SOCIALS.instagramHandle} · TikTok ${SOCIALS.tiktokHandle}`,
              ],
            },
          ],
          footer: `© PodLab Media — Fiche générée pour ${email} · ${CONTACT.email} · ${CONTACT.phoneDisplay}`,
        },
        `podlab-${video.videoId}.pdf`
      );

      setDone(true);
      toast({
        title: "Fiche PDF téléchargée",
        description: "Vous êtes abonné(e) : les prochains résumés arriveront par email.",
      });
    } catch {
      toast({ title: "Erreur", description: "Le téléchargement a échoué, réessayez." });
    } finally {
      setLoading(false);
    }
  };

  const reset = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setEmail("");
        setName("");
        setDone(false);
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="glass-strong rounded-2xl border-white/10 sm:max-w-md">
        {done ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="size-12 mx-auto text-white" />
            <div>
              <DialogTitle className="text-lg font-bold text-white">
                Fiche PDF envoyée !
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Le fichier a été téléchargé. Vous recevrez aussi les prochains
                résumés d&apos;épisodes à <span className="text-zinc-200">{email}</span>.
              </DialogDescription>
            </div>
            <Button variant="outline" className="rounded-lg" onClick={() => reset(false)}>
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mb-1 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                <FileText className="size-3" /> Fiche de synthèse
              </div>
              <DialogTitle className="text-lg font-bold leading-snug text-white line-clamp-2">
                {video?.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400 leading-relaxed">
                Recevez la fiche de synthèse de cet épisode (thématique, points
                clés et plan d&apos;action) directement par email.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-1">
              <Input
                placeholder="Votre nom (optionnel)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-lg bg-black/60 border-white/15 text-sm"
              />
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg bg-black/60 border-white/15 text-sm"
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <Button
                onClick={submit}
                disabled={loading}
                className="w-full h-11 rounded-lg gap-2 font-semibold"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Download className="size-4" />
                )}
                {loading ? "Envoi en cours…" : "Recevoir la fiche PDF"}
              </Button>
              <p className="text-[11px] leading-relaxed text-zinc-500 text-center">
                En validant, vous acceptez de recevoir le PodLab Business Brief.
                Désinscription en un clic, à tout moment.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Section épisodes : catalogue réel de la chaîne YouTube ─────────────────
export function EpisodesSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<PodLabVideo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VIDEOS.filter((v) => {
      if (filter !== "all" && v.theme !== filter) return false;
      if (q && !v.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  const shown = filtered.slice(0, visible);

  const openPdf = (video: PodLabVideo) => {
    setSelected(video);
    setDialogOpen(true);
  };

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setVisible(PAGE_SIZE);
  };

  const changeQuery = (q: string) => {
    setQuery(q);
    setVisible(PAGE_SIZE);
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTag index="01" label="Derniers épisodes" />
          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="max-w-xl text-3xl md:text-5xl font-bold tracking-tight text-white">
              Des épisodes qui font{" "}
              <span className="text-zinc-500">réfléchir tout un continent.</span>
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="w-fit gap-2 rounded-lg border-white/20 hover:bg-white/10"
              onClick={() => window.open(SOCIALS.youtube, "_blank", "noreferrer")}
            >
              <Youtube className="size-4" /> Chaîne YouTube · +894 vidéos
            </Button>
          </div>
        </Reveal>

        {/* Filtres thématiques + recherche */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les épisodes par thématique">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => changeFilter(f.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition-all border",
                    filter === f.id
                      ? "bg-white text-black border-white"
                      : "border-white/15 text-zinc-400 hover:text-white hover:border-white/40 bg-zinc-950/60"
                  )}
                  aria-pressed={filter === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
              <Input
                value={query}
                onChange={(e) => changeQuery(e.target.value)}
                placeholder="Rechercher un invité, un sujet…"
                aria-label="Rechercher un épisode"
                className="h-10 rounded-lg border-white/15 bg-black/60 pl-9 text-sm"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500" aria-live="polite">
            {filtered.length} épisode{filtered.length > 1 ? "s" : ""}
            {filter !== "all" && ` · ${VIDEO_THEMES[filter as VideoTheme]}`}
            {" · "}
            <span className="text-zinc-600">chaîne officielle @podlabmedia</span>
          </p>
        </Reveal>

        {/* Grille d'épisodes — miniatures réelles */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((video, i) => (
              <motion.article
                layout
                key={video.videoId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
                className="group card-shine flex flex-col rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md overflow-hidden hover:border-white/25 transition-colors"
              >
                {/* Miniature réelle YouTube (traitement monochrome) */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={`Miniature de l'épisode : ${video.title}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover grayscale contrast-110 opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

                  <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-300 backdrop-blur">
                    {VIDEO_THEMES[video.theme]}
                  </div>

                  <button
                    onClick={() => window.open(video.youtubeUrl, "_blank", "noreferrer")}
                    className="absolute inset-0 focus:outline-none"
                    aria-label={`Ouvrir sur YouTube : ${video.title}`}
                  >
                    <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                      <Play className="size-5 translate-x-[1px]" fill="currentColor" />
                    </span>
                  </button>
                </div>

                {/* Contenu */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-sm font-bold leading-snug text-white line-clamp-2 group-hover:text-zinc-200 transition-colors">
                    {video.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Youtube className="size-3" /> PodLab · @podlabmedia
                  </div>
                  <div className="mt-5 flex items-center gap-2 pt-1 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 flex-1 rounded-lg gap-1.5 text-xs font-semibold border-white/15 hover:bg-white/10"
                      onClick={() =>
                        window.open(video.youtubeUrl, "_blank", "noreferrer")
                      }
                    >
                      <Play className="size-3.5" /> Regarder
                    </Button>
                    <Button
                      size="sm"
                      className="h-9 flex-1 rounded-lg gap-1.5 text-xs font-semibold"
                      onClick={() => openPdf(video)}
                    >
                      <Download className="size-3.5" /> Fiche PDF
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Chargement progressif */}
        {shown.length < filtered.length && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="gap-2 rounded-xl border-white/20 hover:bg-white/10 px-8"
            >
              <Loader className="size-4" />
              Afficher plus d&apos;épisodes ({filtered.length - shown.length} restants)
            </Button>
          </div>
        )}
      </div>

      <PdfCaptureDialog
        video={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
