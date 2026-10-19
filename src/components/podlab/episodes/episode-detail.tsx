"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarCheck,
  Download,
  Play,
  Youtube,
  Ear,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTag } from "@/components/podlab/shared";
import { PdfCaptureDialog } from "@/components/podlab/player/floating-player";
import { VIDEO_THEMES, CHANNEL_STATS } from "@/lib/videos";
import { SOCIALS } from "@/lib/brand";
import { usePlayerStore } from "@/lib/player-store";
import { navigate } from "@/lib/router";
import type { PodLabVideo } from "@/types/podlab";

// ─── Fiche d'épisode SEO — cahier des charges §3.1 ────────────────────────────
// Synopsis, lecteur enrichi, lead magnet PDF, épisodes liés.
export function EpisodeDetail({
  video,
  related,
}: {
  video: PodLabVideo;
  related: PodLabVideo[];
}) {
  const [playing, setPlaying] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const openPlayer = usePlayerStore((s) => s.open);

  return (
    <section className="relative pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-80 glow-top" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => navigate("accueil")}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Retour au catalogue
          </button>

          <div className="mt-6">
            <SectionTag
              index="DI"
              label={`Discussion Informelle · ${VIDEO_THEMES[video.theme]}`}
            />
          </div>
          <h1 className="mt-4 max-w-3xl text-2xl md:text-4xl font-bold leading-tight tracking-tight text-white">
            {video.title}
          </h1>

          {/* Métadonnées réelles */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Youtube className="size-3.5" /> Chaîne PodLab · @podlabmedia
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              128 000 abonnés
            </span>
            <span className="flex items-center gap-1.5">
              <Ear className="size-3.5" />
              1 million d&apos;écoutes / trimestre
            </span>
          </div>
        </motion.div>

        {/* Lecteur enrichi (Interactive Video Player — design system §3) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="card-shine mt-8 rounded-2xl border border-white/10 bg-zinc-950/80 p-2 shadow-2xl shadow-black/60 backdrop-blur-md"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex h-full w-full items-center justify-center focus:outline-none"
                aria-label={`Lancer la lecture : ${video.title}`}
              >
                <img
                  src={video.thumbnail}
                  alt={`Miniature : ${video.title}`}
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 opacity-70 transition-all duration-500 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
                <span className="relative z-10 flex size-16 md:size-20 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <Play className="size-6 md:size-8 translate-x-[2px]" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Synopsis + lead magnet (cahier des charges §3.1) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-10 grid gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-white">Synopsis</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Nouvel épisode de l&apos;émission « Discussion Informelle » — le
              podcast business le plus écouté au Bénin et le 2ᵉ d&apos;Afrique
              de l&apos;Ouest. Une conversation sans filtre, sans langue de
              bois, orientée ROI, classée dans la thématique{" "}
              <span className="text-zinc-200">{VIDEO_THEMES[video.theme]}</span>{" "}
              du catalogue PodLab Media.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Retrouvez les décisions structurantes, les chiffres réels et les
              méthodes d&apos;arbitrage des bâtisseurs de l&apos;économie
              africaine — et téléchargez la fiche de synthèse pour retenir
              l&apos;essentiel en 5 minutes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => setDialogOpen(true)}
                className="gap-2 rounded-xl font-semibold"
              >
                <Download className="size-4" /> Fiche de synthèse PDF
              </Button>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-white/20 hover:bg-white/10"
                onClick={() => openPlayer(video)}
              >
                <Play className="size-4" /> Mini-lecteur flottant
              </Button>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-white/20 hover:bg-white/10"
                onClick={() => navigate("studios")}
              >
                <CalendarCheck className="size-4" /> Réserver un studio
              </Button>
            </div>
          </div>

          {/* Encart chaîne */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
              <h3 className="text-sm font-bold text-white">
                Écoutez sur YouTube
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                PodLab Media — {CHANNEL_STATS.videos} vidéos publiées,{" "}
                {new Intl.NumberFormat("fr-FR", { notation: "compact" }).format(
                  CHANNEL_STATS.totalViews
                )}{" "}
                de vues cumulées, {CHANNEL_STATS.countries} pays d&apos;audience.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full gap-2 rounded-lg border-white/20 hover:bg-white/10"
                onClick={() =>
                  window.open(video.youtubeUrl, "_blank", "noreferrer")
                }
              >
                <Youtube className="size-4" /> Ouvrir l&apos;épisode sur YouTube
              </Button>
              <Button
                variant="ghost"
                className="mt-2 w-full gap-2 text-zinc-400 hover:text-white"
                onClick={() => window.open(SOCIALS.youtube, "_blank", "noreferrer")}
              >
                @podlabmedia — s&apos;abonner
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Épisodes liés */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14"
          >
            <h2 className="text-lg font-bold text-white">
              Épisodes liés — {VIDEO_THEMES[video.theme]}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <button
                  key={rel.videoId}
                  onClick={() => {
                    window.location.href = `/episodes/${rel.videoId}`;
                  }}
                  className="group card-shine flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 text-left backdrop-blur-md transition-colors hover:border-white/25"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={rel.thumbnail}
                      alt={`Miniature : ${rel.title}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover grayscale contrast-110 opacity-85 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold leading-snug text-white line-clamp-2">
                      {rel.title}
                    </p>
                    <p className="mt-1.5 text-[10px] text-zinc-500">
                      {VIDEO_THEMES[rel.theme]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <PdfCaptureDialog video={video} open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
