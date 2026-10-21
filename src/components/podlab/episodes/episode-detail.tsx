"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileText,
  ListOrdered,
  Headphones,
  Loader2,
  Mail,
  Play,
  Quote,
  UserRound,
  Youtube,
  Ear,
  Users,
  Music4,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTag } from "@/components/podlab/shared";
import { PdfCaptureDialog } from "@/components/podlab/player/floating-player";
import { VIDEO_THEMES, CHANNEL_STATS } from "@/lib/videos";
import { SOCIALS } from "@/lib/brand";
import {
  cleanNotes,
  synopsisFor,
  topicsFrom,
  formatDateFr,
  formatDurationFr,
} from "@/lib/episode-content";
import { downloadBackendPdf } from "@/lib/download";
import { usePlayerStore } from "@/lib/player-store";
import { navigate } from "@/lib/router";
import { toast } from "@/hooks/use-toast";
import type { PodLabVideo } from "@/types/podlab";

// ─── Fiche d'épisode SEO — cahier des charges §3.1 ────────────────────────────
// Une URL par épisode (75 pages SSG), synopsis réel, invités, date, durée,
// citation, notes de l'épisode (description officielle), liens d'écoute
// et lead magnet PDF contre adresse e-mail.

// Les fonctions d'extraction éditoriale (synopsis, notes, chapitres) sont
// partagées avec le back-office et la génération PDF : src/lib/episode-content.ts

export function EpisodeDetail({
  video,
  related,
}: {
  video: PodLabVideo;
  related: PodLabVideo[];
}) {
  const [playing, setPlaying] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dlComplete, setDlComplete] = useState(false);
  const openPlayer = usePlayerStore((s) => s.open);

  const synopsis =
    synopsisFor(video) ||
    `Nouvel épisode de l'émission « Discussion Informelle » — le podcast business le plus écouté au Bénin et le 2ᵉ d'Afrique de l'Ouest. Une conversation sans filtre, orientée ROI, classée ${VIDEO_THEMES[video.theme]} dans le catalogue PodLab Media.`;
  const notes = video.description ? cleanNotes(video.description) : "";
  const hasLongNotes = notes.length > synopsis.length + 120;
  const topics = topicsFrom(video.description ?? "");

  // Fiche complète PDF — contenu composé depuis le back-office « Fiches & Documents »
  const downloadCompleteSheet = async () => {
    setDlComplete(true);
    try {
      const ok = await downloadBackendPdf(
        `/api/pdf/episode-complete?videoId=${encodeURIComponent(video.videoId)}`,
        `podlab-fiche-complete-${video.videoId}.pdf`
      );
      if (ok) {
        toast({
          title: "Fiche complète téléchargée",
          description: "Invités, citation, notes et chapitres — au format PDF.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Indisponible",
          description: "La fiche complète est momentanément indisponible.",
        });
      }
    } finally {
      setDlComplete(false);
    }
  };

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

          {/* Métadonnées réelles — date, durée, vues, invités */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Youtube className="size-3.5" /> Chaîne PodLab · @podlabmedia
            </span>
            {video.publishedAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                Publié le {formatDateFr(video.publishedAt)}
              </span>
            )}
            {video.durationSeconds ? (
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-3.5" />
                {formatDurationFr(video.durationSeconds)}
              </span>
            ) : null}
            {video.views ? (
              <span className="flex items-center gap-1.5 tabular-nums">
                <Eye className="size-3.5" />
                {new Intl.NumberFormat("fr-FR").format(video.views)} vues
              </span>
            ) : null}
          </div>

          {/* Invités de l'épisode */}
          {video.guests && video.guests.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Invités
              </span>
              {video.guests.map((g) => (
                <span
                  key={g}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-xs font-semibold text-zinc-200"
                >
                  <UserRound className="size-3" /> {g}
                </span>
              ))}
            </div>
          )}
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
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-110 opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
                <span className="relative z-10 flex size-16 md:size-20 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <Play className="size-6 md:size-8 translate-x-[2px]" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Citation d'invité mise en avant */}
        {video.citation && (
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-8 flex gap-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur"
          >
            <Quote className="size-6 shrink-0 text-zinc-600" aria-hidden />
            <div>
              <p className="text-base md:text-lg font-medium leading-relaxed text-white">
                « {video.citation} »
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Extrait de cet épisode — Discussion Informelle
                {video.guests?.length ? ` · ${video.guests.join(" & ")}` : ""}
              </p>
            </div>
          </motion.blockquote>
        )}

        {/* Synopsis + notes de l'épisode + liens d'écoute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-10 grid gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-white">Synopsis</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {synopsis}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Retrouvez les décisions structurantes, les chiffres réels et les
              méthodes d&apos;arbitrage des bâtisseurs de l&apos;économie
              africaine — et téléchargez la fiche de synthèse pour retenir
              l&apos;essentiel en 5 minutes.
            </p>

            {/* Notes officielles de l'épisode (description YouTube intégrale) */}
            {hasLongNotes && (
              <details className="group mt-6 rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur">
                <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 transition-colors group-open:text-white">
                  Notes de l&apos;épisode — afficher / masquer
                </summary>
                <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-zinc-400">
                  {notes}
                </p>
              </details>
            )}

            {/* Au programme — chapitres thématiques issus des notes réelles */}
            {topics.length >= 3 && (
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                  <ListOrdered className="size-4" /> Au programme de cet épisode
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {topics.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-[13px] leading-snug text-zinc-300"
                    >
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-zinc-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => setDialogOpen(true)}
                className="gap-2 rounded-xl font-semibold"
              >
                <Download className="size-4" /> Fiche de synthèse PDF
              </Button>
              <Button
                variant="outline"
                onClick={downloadCompleteSheet}
                disabled={dlComplete}
                className="gap-2 rounded-xl border-white/20 hover:bg-white/10"
              >
                {dlComplete ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <FileText className="size-4" />
                )}
                Fiche complète — invités, citation, notes
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

          {/* Écouter — toutes les plateformes réelles */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Headphones className="size-4" /> Écouter cet épisode
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                Vidéo complète sur YouTube et YouTube Music — le mini-lecteur
                flottant garde votre position d&apos;écoute sur tout le site.
              </p>
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-lg border-white/20 hover:bg-white/10"
                  onClick={() =>
                    window.open(video.youtubeUrl, "_blank", "noreferrer")
                  }
                >
                  <Youtube className="size-4" /> Regarder sur YouTube
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-lg border-white/20 hover:bg-white/10"
                  onClick={() =>
                    window.open(
                      `https://music.youtube.com/watch?v=${video.videoId}`,
                      "_blank",
                      "noreferrer"
                    )
                  }
                >
                  <Music4 className="size-4" /> Écouter sur YouTube Music
                </Button>
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-zinc-400 hover:text-white"
                  onClick={() => window.open(SOCIALS.youtube, "_blank", "noreferrer")}
                >
                  @podlabmedia — s&apos;abonner · {CHANNEL_STATS.videos} vidéos
                </Button>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Mail className="size-3.5" /> PodLab Business Brief
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500">
                  L&apos;analyse de cet épisode, chaque dimanche 8h — avec les
                  fiches de synthèse PDF. {CHANNEL_STATS.subscribers.toLocaleString("fr-FR")} décideurs
                  nous lisent déjà.
                </p>
                <Button
                  size="sm"
                  className="mt-3 w-full gap-2 rounded-lg font-semibold"
                  onClick={() => setDialogOpen(true)}
                >
                  <Download className="size-3.5" /> Recevoir la fiche PDF
                </Button>
              </div>
            </div>

            {/* Transcription & synthèse lisible — cahier des charges §3.1 */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <FileText className="size-4" /> Transcription &amp; synthèse
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                La transcription interactive complète (horodatée) est publiée
                avec l&apos;épisode sur YouTube : ouvrez la vidéo puis « …plus »
                → « Afficher la transcription ».
              </p>
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-lg border-white/20 hover:bg-white/10"
                  onClick={() =>
                    window.open(video.youtubeUrl, "_blank", "noreferrer")
                  }
                >
                  <FileText className="size-4" /> Ouvrir la transcription
                  YouTube
                </Button>
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-zinc-400 hover:text-white"
                  onClick={() => setDialogOpen(true)}
                >
                  <Download className="size-4" /> Version lisible — fiche PDF
                  5 min
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 px-5 py-4 text-[11px] text-zinc-500 backdrop-blur">
              <span className="flex items-center gap-1.5">
                <Ear className="size-3.5" /> 1 M d&apos;écoutes / trimestre
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5" /> 128 000 abonnés
              </span>
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
                      {rel.publishedAt ? ` · ${formatDateFr(rel.publishedAt)}` : ""}
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
