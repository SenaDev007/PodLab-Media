"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CalendarCheck, UserRoundPlus, Mic, Building2, Ear } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/podlab/shared";
import { FEATURED_VIDEO, CHANNEL_STATS } from "@/lib/videos";
import { navigate } from "@/lib/router";

// ─── Barre de preuve sociale & impact (copywriting §2.2 — 3 chiffres) ────────
const IMPACT_NUMBERS = [
  {
    icon: Ear,
    value: <CountUp to={1_000_000} format="compact" prefix="+" />,
    label: "d'Écoutes / Trimestre",
    sub: "Le podcast business le plus écouté au Bénin & 2e en Afrique de l'Ouest.",
  },
  {
    icon: UserRoundPlus,
    value: <CountUp to={CHANNEL_STATS.subscribers} format="full" prefix="+" />,
    label: "Décideurs",
    sub: "Une communauté engagée de dirigeants, fondateurs, créatifs et investisseurs.",
  },
  {
    icon: Building2,
    value: <CountUp to={2} />,
    label: "Studios Internationaux",
    sub: "Plateaux de tournage 4K Broadcast — Cotonou (Bénin) & Abidjan (Côte d'Ivoire).",
  },
];

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
          {/* Kicker — copywriting §2.1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur"
          >
            <Mic className="size-3.5 animate-pulse-dot" />
            <span className="font-semibold uppercase tracking-[0.18em]">
              Le 1<sup>er</sup> Média Business d&apos;Afrique Francophone
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-gradient"
          >
            L&apos;Écosystème où s&apos;écrit
            <br />
            le futur du Business
            <br />
            en Afrique.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-zinc-400 max-w-2xl mx-auto"
          >
            Chaque dimanche, accédez aux conversations confidentielles avec
            les bâtisseurs, dirigeants et investisseurs qui façonnent
            l&apos;économie régionale.{" "}
            <span className="text-zinc-300">
              Sans filtre, sans langue de bois, orienté ROI.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("newsletter")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="w-full sm:w-auto gap-2 rounded-xl px-7 h-12 text-sm font-semibold shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-6px_rgba(255,255,255,0.55)] transition-shadow"
            >
              <UserRoundPlus className="size-4" />
              Rejoindre le Cercle Privé — Gratuit
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("studios")}
              className="w-full sm:w-auto gap-2 rounded-xl px-7 h-12 text-sm font-semibold border-white/20 hover:bg-white/10"
            >
              <CalendarCheck className="size-4" />
              Réserver un Studio (Cotonou &amp; Abidjan)
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
                  {/* Miniature réelle de l'épisode — monochrome au repos, vraies couleurs au survol */}
                  <img
                    src={ep.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover grayscale contrast-110 opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
                  <div className="absolute left-5 top-5 md:left-8 md:top-8 text-left">
                    <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                      Épisode vedette · Discussion Informelle
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

        {/* ─── Barre de preuve sociale & impact (copywriting §2.2) ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mx-auto mt-10 md:mt-12 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
        >
          {IMPACT_NUMBERS.map(({ icon: Icon, value, label, sub }) => (
            <div
              key={label}
              className="card-shine rounded-2xl border border-white/10 bg-zinc-950/80 p-5 md:p-6 text-left backdrop-blur"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-white tabular-nums">
                  {value}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
                  {label}
                </span>
              </div>
              <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
                <Icon className="mt-0.5 size-3.5 shrink-0" />
                {sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
