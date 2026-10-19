"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePlayerStore } from "@/lib/player-store";
import { VIDEO_THEMES } from "@/lib/videos";
import { CONTACT, SOCIALS } from "@/lib/brand";
import { downloadPdf } from "@/lib/pdf";
import { toast } from "@/hooks/use-toast";
import type { PodLabVideo } from "@/types/podlab";

// ─── Points de synthèse par thématique (fiche PDF de captation) ──────────────
const THEME_HIGHLIGHTS: Record<string, string[]> = {
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

const DEFAULT_HIGHLIGHTS = [
  "Les points clés et décisions structurantes de l'épisode",
  "Les leçons business transposables à votre contexte",
];

/** Modale de téléchargement de la fiche PDF (captation email) — partagée. */
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
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!video || !email.includes("@")) {
      toast({ title: "Email invalide", description: "Renseignez une adresse email valide." });
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
        }),
      });

      downloadPdf(
        {
          brand: "PodLab Media — Fiche d'épisode",
          title: video.title,
          subtitle: `Thématique : ${VIDEO_THEMES[video.theme]} · Émission « Discussion Informelle » — Chaîne PodLab (@podlabmedia)`,
          sections: [
            {
              heading: "L'essentiel de cet épisode",
              lines: (THEME_HIGHLIGHTS[video.theme] ?? DEFAULT_HIGHLIGHTS).map(
                (h) => `• ${h}`
              ),
            },
            {
              heading: "Pour aller plus loin",
              lines: [
                `• Regardez l'épisode complet sur YouTube : ${video.youtubeUrl}`,
                "• Intégrez le Cercle Privé PodLab — l'analyse de chaque épisode, chaque dimanche à 8h.",
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
              <Button
                onClick={submit}
                disabled={loading}
                className="w-full h-11 rounded-lg gap-2 font-semibold"
              >
                {loading ? "Envoi en cours…" : "Recevoir la fiche PDF"}
                {!loading && <Download className="size-4" />}
              </Button>
              <p className="text-[11px] leading-relaxed text-zinc-500 text-center">
                En validant, vous rejoignez le Cercle Privé PodLab.
                Désinscription en un clic, à tout moment.
              </p>
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
  const [dialogOpen, setDialogOpen] = useState(false);

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
              {/* Mini lecteur vidéo */}
              <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black sm:w-40">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
                  title={`Lecture — ${video.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
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

              {/* Contrôles minimalistes */}
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
                  onClick={() => window.open(video.youtubeUrl, "_blank", "noreferrer")}
                  aria-label="Ouvrir sur YouTube"
                  title="Ouvrir sur YouTube"
                  className="size-9 rounded-xl border-white/15 bg-black/60 hover:bg-white/10"
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
