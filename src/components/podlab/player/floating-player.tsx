"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, Gauge, Share2, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePlayerStore, savedPositionFor } from "@/lib/player-store";
import { VIDEOS, VIDEO_THEMES } from "@/lib/videos";
import { loadYouTubeApi, PLAYBACK_RATES, formatTime } from "@/lib/youtube-api";
import { CONTACT, SOCIALS } from "@/lib/brand";
import { highlightsFor } from "@/lib/episode-highlights";
import { downloadPdf } from "@/lib/pdf";
import { downloadBackendPdf } from "@/lib/download";
import { toast } from "@/hooks/use-toast";
import type { PodLabVideo } from "@/types/podlab";

// ─── Modale de téléchargement de la fiche PDF (captation email) — partagée. ──────────────
// Le PDF est généré par le backend (logo officiel embarqué) via
// /api/pdf/episode ; l'ancien générateur client reste en repli.
export function PdfCaptureDialog({
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
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!video || !email.includes("@")) {
      toast({ title: "Email invalide", description: "Renseignez une adresse email valide." });
      return;
    }
    if (!consent) {
      toast({ title: "Consentement requis", description: "Cochez la case pour recevoir la fiche et le Business Brief." });
      return;
    }
    setLoading(true);
    try {
      // Captation : l'email rejoint la base audience (source episode-pdf)
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || null,
          segment: video.theme,
          source: "episode-pdf",
          consent: true,
        }),
      });

      // PDF généré par le backend (logo officiel) ; repli client si besoin
      const delivered = await downloadBackendPdf(
        `/api/pdf/episode?videoId=${encodeURIComponent(video.videoId)}&email=${encodeURIComponent(email)}`,
        `podlab-fiche-${video.videoId}.pdf`
      );
      if (!delivered) {
        downloadPdf(
          {
            brand: "PodLab Media — Fiche d'épisode",
            title: video.title,
            subtitle: `Thématique : ${VIDEO_THEMES[video.theme]} · Émission « Discussion Informelle » — Chaîne PodLab (@podlabmedia)`,
            sections: [
              {
                heading: "L'essentiel de cet épisode",
                lines: highlightsFor(video.theme).map((h) => `• ${h}`),
              },
              {
                heading: "Pour aller plus loin",
                lines: [
                  `• Regardez l'épisode complet sur YouTube : ${video.youtubeUrl}`,
                  "• Abonnez-vous au PodLab Business Brief — l'analyse de chaque épisode, chaque dimanche à 8h.",
                  `• Suivez PodLab : Instagram ${SOCIALS.instagramHandle} · TikTok ${SOCIALS.tiktokHandle}`,
                ],
              },
            ],
            footer: `© PodLab Media — Fiche générée pour ${email} · ${CONTACT.email} · ${CONTACT.phoneDisplay}`,
          },
          `podlab-${video.videoId}.pdf`
        );
      }

      setDone(true);
      toast({
        title: "Fiche PDF téléchargée",
        description: "Vous êtes abonné(e) : les prochaines fiches arriveront par email.",
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
            <FileText className="size-12 mx-auto text-white" />
            <div>
              <DialogTitle className="text-lg font-bold text-white">
                Fiche PDF envoyée !
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Le fichier a été téléchargé. Vous recevrez aussi les prochaines
                fiches d&apos;épisodes à <span className="text-zinc-200">{email}</span>.
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
              <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-white/10 bg-black/50 p-2.5 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-3.5 shrink-0 cursor-pointer accent-white"
                  aria-label="Consentement à recevoir la fiche et le Business Brief"
                />
                <span className="text-[11px] leading-relaxed text-zinc-400">
                  Je souhaite recevoir la fiche de synthèse et le <span className="font-semibold text-zinc-200">PodLab Business Brief</span> chaque dimanche. Désinscription en un clic.
                </span>
              </label>
              <Button
                onClick={submit}
                disabled={loading}
                className="w-full h-11 rounded-lg gap-2 font-semibold"
              >
                {loading ? "Envoi en cours…" : "Recevoir la fiche PDF"}
                {!loading && <Download className="size-4" />}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Barre flottante de lecture (design system §3 — 21st.dev) ────────────────
// « Barre flottante en bas d'écran avec contrôles d'écoute minimalistes
//   et waveform animée en blanc pur. »
export function FloatingPlayer() {
  const video = usePlayerStore((s) => s.video);
  const close = usePlayerStore((s) => s.close);
  const hydrate = usePlayerStore((s) => s.hydrate);
  const save = usePlayerStore((s) => s.save);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rate, setRate] = useState(1);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<{
    getCurrentTime?: () => number;
    getPlaybackRate?: () => number;
    setPlaybackRate?: (r: number) => void;
    seekTo?: (t: number, allowSeekAhead: boolean) => void;
    destroy?: () => void;
  } | null>(null);

  // Hydratation au montage : reprise de la dernière écoute (toutes pages)
  useEffect(() => {
    hydrate(VIDEOS);
  }, [hydrate]);

  // Création du lecteur YouTube managé (IFrame API) quand la vidéo change.
  // Reprise de lecture : position sauvegardée (start + seekTo de sécurité).
  useEffect(() => {
    if (!video || !hostRef.current) return;
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | undefined;
    let onHide: (() => void) | undefined;
    const startAt = savedPositionFor(video.videoId);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !hostRef.current) return;
        try {
          playerRef.current = new YT.Player(hostRef.current, {
            videoId: video.videoId,
            playerVars: {
              autoplay: 1,
              rel: 0,
              modestbranding: 1,
              ...(startAt > 0 ? { start: startAt } : {}),
            },
            events: {
              onReady: () => {
                try {
                  const cur = playerRef.current?.getCurrentTime?.() ?? 0;
                  if (startAt > 0 && Math.abs(cur - startAt) > 5) {
                    playerRef.current?.seekTo?.(startAt, true);
                  }
                } catch {}
              },
            },
          });
        } catch {}

        // Sauvegarde continue de la position d'écoute (reprise de lecture)
        poll = setInterval(() => {
          try {
            const t = playerRef.current?.getCurrentTime?.() ?? 0;
            const r = playerRef.current?.getPlaybackRate?.() ?? 1;
            if (t > 0) save({ videoId: video.videoId, time: t, rate: r });
          } catch {}
        }, 3000);

        // Sauvegarde au départ de la page (dernier point d'écoute)
        onHide = () => {
          try {
            const t = playerRef.current?.getCurrentTime?.() ?? 0;
            if (t > 0) save({ videoId: video.videoId, time: t, rate });
          } catch {}
        };
        window.addEventListener("pagehide", onHide);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      if (onHide) window.removeEventListener("pagehide", onHide);
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
    };
  }, [video?.videoId]);

  // Vitesse de lecture — cycle 1× / 1,25× / 1,5× / 2×
  const cycleRate = () => {
    const next =
      PLAYBACK_RATES[
        (PLAYBACK_RATES.indexOf(rate as (typeof PLAYBACK_RATES)[number]) + 1) %
          PLAYBACK_RATES.length
      ];
    try {
      playerRef.current?.setPlaybackRate?.(next);
    } catch {}
    setRate(next);
  };

  // Partage du passage en cours — lien YouTube avec timestamp
  const sharePassage = async () => {
    const t = Math.floor(playerRef.current?.getCurrentTime?.() ?? 0);
    const url = `https://youtu.be/${video?.videoId}?t=${t}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Passage copié !",
        description: `Lien à ${formatTime(t)} — collez-le où vous voulez.`,
      });
    } catch {
      toast({ title: "Copie impossible", description: url });
    }
  };

  return (
    <>
      <AnimatePresence>
        {video && (
          <motion.div
            initial={{ y: 96, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl"
            role="complementary"
            aria-label="Lecteur PodLab en cours de lecture"
          >
            <div className="glass-strong flex items-center gap-3 rounded-2xl p-3 shadow-2xl shadow-black/80">
              {/* Mini lecteur vidéo — managé par l'API IFrame YouTube (reprise/vitesse) */}
              <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black sm:w-40">
                <div key={video.videoId} ref={hostRef} className="absolute inset-0 h-full w-full" />
              </div>

              {/* Titre + waveform animée blanche */}
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  En lecture · {VIDEO_THEMES[video.theme]}
                </div>
                <p className="mt-1 line-clamp-1 text-xs font-semibold text-white sm:text-sm">
                  {video.title}
                </p>
                <div
                  className="mt-2 hidden h-4 items-end gap-[3px] sm:flex"
                  aria-hidden
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                    <span
                      key={i}
                      className="waveform-bar w-[3px] rounded-full bg-white"
                      style={{
                        height: "100%",
                        animationDelay: `${(i % 6) * 0.13}s`,
                        animationDuration: `${0.9 + (i % 4) * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Contrôles minimalistes — reprise, vitesse, partage */}
              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  size="icon"
                  onClick={() => setDialogOpen(true)}
                  aria-label="Recevoir la fiche de synthèse PDF"
                  title="Fiche de synthèse PDF"
                  className="size-9 rounded-xl border-white/15 bg-black/60 hover:bg-white/10"
                  variant="outline"
                >
                  <Download className="size-4" />
                </Button>
                <Button
                  size="icon"
                  onClick={sharePassage}
                  aria-label="Partager ce passage"
                  title="Partager ce passage (lien horodaté)"
                  className="size-9 rounded-xl border-white/15 bg-black/60 hover:bg-white/10"
                  variant="outline"
                >
                  <Share2 className="size-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={cycleRate}
                  aria-label="Vitesse de lecture"
                  title="Vitesse de lecture"
                  className="h-9 min-w-12 rounded-xl border-white/15 bg-black/60 px-2 text-[11px] font-bold hover:bg-white/10"
                  variant="outline"
                >
                  <Gauge className="size-3.5" /> {rate}×
                </Button>
                <Button
                  size="icon"
                  onClick={() => window.open(video.youtubeUrl, "_blank", "noreferrer")}
                  aria-label="Ouvrir sur YouTube"
                  title="Ouvrir sur YouTube"
                  className="hidden size-9 rounded-xl border-white/15 bg-black/60 hover:bg-white/10 sm:inline-flex"
                  variant="outline"
                >
                  <Youtube className="size-4" />
                </Button>
                <Button
                  size="icon"
                  onClick={close}
                  aria-label="Fermer le lecteur"
                  className="size-9 rounded-xl bg-white text-black hover:bg-zinc-200"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PdfCaptureDialog
        video={video}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
