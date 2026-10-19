"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Play, Search, Youtube, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import { PdfCaptureDialog } from "@/components/podlab/player/floating-player";
import { VIDEOS, VIDEO_THEMES } from "@/lib/videos";
import { SOCIALS } from "@/lib/brand";
import { usePlayerStore } from "@/lib/player-store";
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

// ─── Section épisodes : catalogue réel de la chaîne YouTube ─────────────────
export function EpisodesSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<PodLabVideo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const openPlayer = usePlayerStore((s) => s.open);

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
          <SectionTag index="02" label="Derniers épisodes · Discussion Informelle" />
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
              <Youtube className="size-4" /> Chaîne YouTube · 894 vidéos
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
                    onClick={() => openPlayer(video)}
                    className="absolute inset-0 focus:outline-none"
                    aria-label={`Écouter sur le site : ${video.title}`}
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
                      onClick={() => openPlayer(video)}
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
