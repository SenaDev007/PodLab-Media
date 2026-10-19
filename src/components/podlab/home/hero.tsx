"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CalendarCheck, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, LiveDot } from "@/components/podlab/shared";
import { FEATURED_VIDEO, CHANNEL_STATS } from "@/lib/videos";
import { navigate } from "@/lib/router";

export function Hero() {
  const [playing, setPlaying] = useState(false);
  const ep = FEATURED_VIDEO;

  return (
    <section className="relative overflow-hidden">
      {/* Fond : grille technique + halo */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-[480px] glow-top"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur"
          >
            <LiveDot />
            <span className="text-zinc-500 font-mono uppercase tracking-widest">
              Nouveau
            </span>
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <span>Épisode en ligne</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-gradient"
          >
            Les voix qui font
            <br />
            l&apos;économie africaine.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-zinc-400 max-w-2xl mx-auto"
          >
            PodLab Media est le 1er Média Business d&apos;Afrique
            francophone : entrepreneurs, investisseurs, artistes et
            décideurs décryptent l&apos;argent, la création d&apos;entreprise
            et la stratégie — depuis nos studios de Cotonou et d&apos;Abidjan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => navigate("studios")}
              className="w-full sm:w-auto gap-2 rounded-xl px-7 h-12 text-sm font-semibold shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-6px_rgba(255,255,255,0.55)] transition-shadow"
            >
              <CalendarCheck className="size-4" />
              Réserver un Studio
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("newsletter")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="w-full sm:w-auto gap-2 rounded-xl px-7 h-12 text-sm font-semibold border-white/20 hover:bg-white/10"
            >
              <Mail className="size-4" />
              S&apos;abonner à la Newsletter
            </Button>
          </motion.div>
        </div>

        {/* ─── Lecteur vidéo de l'épisode vedette (réel) ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-14 md:mt-16 mx-auto max-w-5xl"
        >
          <div className="card-shine rounded-2xl border border-white/10 bg-zinc-950/80 p-2 shadow-2xl shadow-black/60 backdrop-blur-md">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              {playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${ep.videoId}?autoplay=1&rel=0`}
                  title={`Épisode vedette — ${ep.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-6 focus:outline-none"
                  aria-label={`Lancer la lecture : ${ep.title}`}
                >
                  {/* Miniature réelle de l'épisode, traitement monochrome */}
                  <img
                    src={ep.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 opacity-70 transition-all duration-500 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
                  <div className="absolute left-5 top-5 md:left-8 md:top-8 text-left">
                    <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                      Épisode vedette · PodLab
                    </div>
                    <div className="mt-2 max-w-md text-sm md:text-xl font-bold tracking-tight text-white line-clamp-3">
                      {ep.title}
                    </div>
                  </div>

                  <span
                    className="relative z-10 flex size-16 md:size-20 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black text-white"
                    aria-hidden
                  >
                    <Play className="size-6 md:size-8 translate-x-[2px]" fill="currentColor" />
                  </span>
                  <span className="relative z-10 text-xs font-medium uppercase tracking-[0.25em] text-zinc-300">
                    Regarder l&apos;épisode
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ─── Compteurs d'impact (chaîne YouTube réelle) ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mx-auto mt-10 md:mt-12 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 md:p-6 text-center backdrop-blur">
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-white tabular-nums">
              <CountUp to={CHANNEL_STATS.subscribers} prefix="+" format="compact" />
            </div>
            <div className="mt-2 text-xs md:text-sm text-zinc-400">
              Abonnés YouTube
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 md:p-6 text-center backdrop-blur">
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-white tabular-nums">
              <CountUp to={CHANNEL_STATS.totalViews} prefix="+" format="compact" />
            </div>
            <div className="mt-2 text-xs md:text-sm text-zinc-400">
              Vues cumulées
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 md:p-6 text-center backdrop-blur">
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-white tabular-nums">
              <CountUp to={CHANNEL_STATS.videos} suffix="+" />
            </div>
            <div className="mt-2 text-xs md:text-sm text-zinc-400">
              Vidéos publiées
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 md:p-6 text-center backdrop-blur">
            <div className="flex items-center justify-center gap-2 text-2xl md:text-4xl font-bold tracking-tight text-white tabular-nums">
              <CountUp to={CHANNEL_STATS.countries} />
              <Globe className="size-5 md:size-7 text-zinc-500" />
            </div>
            <div className="mt-2 text-xs md:text-sm text-zinc-400">
              Pays d&apos;audience
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
