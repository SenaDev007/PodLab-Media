"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CircleAlert,
  FileText,
  MoreHorizontal,
  Plus,
  RotateCcw,
  ScrollText,
  Tag,
  Trash2,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlassCard } from "@/components/podlab/shared";
import { RichTextEditor } from "@/components/podlab/admin/rich-text-editor";
import { VIDEOS, VIDEO_THEMES } from "@/lib/videos";
import { toast } from "@/hooks/use-toast";
import type { PodLabVideo, VideoTheme } from "@/types/podlab";

// ═══════════════════════════════════════════════════════════════════════════
// Back-office — CMS Épisodes
//
// CRUD réel et persistant : les épisodes ajoutés, leurs statuts et leurs
// surcharges sont enregistrés en base (ManagedEpisode) via /api/admin/episodes.
// Le modal de création permet de définir de NOUVELLES thématiques quand les
// cinq catégories officielles sont insuffisantes (persistées via
// /api/admin/themes). « Résumé public » et « Transcription SEO » sont des
// éditeurs de texte enrichi multi-paragraphes (gras, titres, listes).
// ═══════════════════════════════════════════════════════════════════════════

type CmsStatus = "publie" | "brouillon" | "retire";

interface CmsEpisode {
  id: string;
  videoId: string;
  isCustom: boolean;
  title: string;
  guest: string | null;
  theme: string;
  youtubeUrl: string;
  thumbnail: string | null;
  excerpt: string | null;
  transcription: string | null;
  status: CmsStatus;
  createdAt: string;
  updatedAt: string;
}

const STATUS_BADGES: Record<CmsStatus, { label: string; cls: string }> = {
  publie: {
    label: "Publié",
    cls: "rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black",
  },
  brouillon: {
    label: "Brouillon",
    cls: "rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-300",
  },
  retire: {
    label: "Retiré",
    cls: "rounded-full border border-red-500/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-400",
  },
};

const themeLabel = (t: string) =>
  (VIDEO_THEMES as Record<string, string>)[t] ?? t;

const stripHtml = (html: string | null | undefined) =>
  (html ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

// ─── Modal : création / édition d'un épisode ────────────────────────────────

function EpisodeDialog({
  open,
  onOpenChange,
  customThemes,
  onAddTheme,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  customThemes: string[];
  onAddTheme: (t: string) => Promise<boolean>;
  initial?: CmsEpisode | null;
  onSubmit: (data: {
    videoId: string;
    isCustom: boolean;
    title: string;
    guest: string | null;
    theme: string;
    youtubeUrl: string;
    thumbnail: string | null;
    excerpt: string;
    transcription: string;
    status: CmsStatus;
  }) => Promise<boolean>;
}) {
  const isEdit = !!initial;
  const [title, setTitle] = useState(initial?.title ?? "");
  const [guest, setGuest] = useState(initial?.guest ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.youtubeUrl ?? "");
  const [theme, setTheme] = useState<string>(initial?.theme ?? "entrepreneuriat");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [transcription, setTranscription] = useState(initial?.transcription ?? "");
  const [saving, setSaving] = useState(false);

  // Création de thématique en direct
  const [showThemeInput, setShowThemeInput] = useState(false);
  const [newTheme, setNewTheme] = useState("");
  const [addingTheme, setAddingTheme] = useState(false);

  const allThemes = [
    ...Object.entries(VIDEO_THEMES).map(([k, v]) => ({ value: k, label: v })),
    ...customThemes.map((t) => ({ value: t, label: t })),
  ];

  const addTheme = async () => {
    const t = newTheme.trim();
    if (t.length < 2) {
      toast({
        variant: "destructive",
        title: "Thématique invalide",
        description: "Au moins 2 caractères.",
      });
      return;
    }
    setAddingTheme(true);
    const ok = await onAddTheme(t);
    setAddingTheme(false);
    if (ok) {
      setTheme(t);
      setNewTheme("");
      setShowThemeInput(false);
    }
  };

  const submit = async () => {
    if (!title || (!isEdit && !youtubeUrl.includes("v="))) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Titre et URL YouTube (avec ?v=…) sont requis.",
      });
      return;
    }
    setSaving(true);
    const videoId = isEdit
      ? initial!.videoId
      : (youtubeUrl.split("v=")[1]?.split("&")[0] ?? `local-${Date.now()}`);
    const ok = await onSubmit({
      videoId,
      isCustom: initial?.isCustom ?? !VIDEOS.some((v) => v.videoId === videoId),
      title,
      guest: guest.trim() || null,
      theme,
      youtubeUrl,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      excerpt,
      transcription,
      status: initial?.status ?? "brouillon",
    });
    setSaving(false);
    if (ok) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[92vh] overflow-y-auto scrollbar-dark rounded-2xl border-white/10 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white">
            {isEdit ? "Modifier l'épisode" : "Ajouter un épisode"}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            {isEdit
              ? "Corrigez les métadonnées, le résumé public ou la transcription SEO."
              : "Synchronisez l'URL YouTube, choisissez ou créez la thématique, rédigez le résumé et la transcription avec mise en forme."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Titre de l&apos;épisode
              </label>
              <Input
                placeholder="Ex. Bâtir une fintech panafricaine : les leçons"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 rounded-lg bg-black/60 border-white/15"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Invité (optionnel)
              </label>
              <Input
                placeholder="Nom de l'invité"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                className="h-10 rounded-lg bg-black/60 border-white/15"
              />
            </div>
          </div>

          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                URL YouTube
              </label>
              <Input
                placeholder="https://www.youtube.com/watch?v=…"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="h-10 rounded-lg bg-black/60 border-white/15"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Thématique
              </label>
              <div className="flex gap-2">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="h-10 flex-1 rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
                  aria-label="Thématique de l'épisode"
                >
                  {allThemes.map((t) => (
                    <option key={t.value} value={t.value} className="bg-zinc-950">
                      {t.label}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowThemeInput((v) => !v)}
                  className="h-10 shrink-0 gap-1.5 rounded-lg border-white/20 text-xs"
                >
                  <Tag className="size-3.5" /> Nouvelle
                </Button>
              </div>
              {showThemeInput && (
                <div className="flex gap-2 rounded-xl border border-white/10 bg-black/40 p-2">
                  <Input
                    autoFocus
                    placeholder="Nom de la nouvelle thématique…"
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTheme();
                      }
                    }}
                    className="h-9 rounded-lg bg-black/60 border-white/15 text-xs"
                  />
                  <Button
                    type="button"
                    onClick={addTheme}
                    disabled={addingTheme}
                    className="h-9 shrink-0 gap-1 rounded-lg px-3 text-xs"
                  >
                    <Plus className="size-3.5" />
                    {addingTheme ? "Ajout…" : "Créer"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">
              Résumé public (SEO) — texte enrichi, multi-paragraphes
            </label>
            <RichTextEditor
              value={excerpt}
              onChange={setExcerpt}
              placeholder="Description de l'épisode : accroche, promesse, mots-clés… (gras, titres et listes disponibles)"
              minHeight={140}
              ariaLabel="Résumé public SEO"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <ScrollText className="size-3.5" /> Transcription SEO — texte
              enrichi, paragraphes illimités
            </label>
            <RichTextEditor
              value={transcription}
              onChange={setTranscription}
              placeholder="Collez ou rédigez la transcription complète : un paragraphe par séquence, titres de chapitres en T1/T2…"
              minHeight={220}
              ariaLabel="Transcription SEO"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            className="rounded-lg"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button onClick={submit} disabled={saving} className="gap-2 rounded-lg">
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Ajouter au CMS"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Vue principale ──────────────────────────────────────────────────────────

export function EpisodesCms() {
  const [overrides, setOverrides] = useState<Record<string, CmsEpisode>>({});
  const [customs, setCustoms] = useState<CmsEpisode[]>([]);
  const [customThemes, setCustomThemes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CmsEpisode | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const [re, rt] = await Promise.all([
        fetch("/api/admin/episodes"),
        fetch("/api/admin/themes"),
      ]);
      if (!re.ok || !rt.ok) throw new Error();
      const [de, dt] = await Promise.all([re.json(), rt.json()]);
      const rows: CmsEpisode[] = de.episodes ?? [];
      const map: Record<string, CmsEpisode> = {};
      const customs: CmsEpisode[] = [];
      for (const r of rows) {
        if (r.isCustom) customs.push(r);
        else map[r.videoId] = r;
      }
      setOverrides(map);
      setCustoms(customs);
      setCustomThemes(dt.themes ?? []);
    } catch {
      setLoadError(true);
      toast({
        variant: "destructive",
        title: "Chargement impossible",
        description: "Le CMS n'a pas pu charger les épisodes — réessayez.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addTheme = useCallback(
    async (t: string) => {
      try {
        const list = Array.from(new Set([...customThemes, t]));
        const res = await fetch("/api/admin/themes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ themes: list }),
        });
        if (!res.ok) throw new Error();
        setCustomThemes(list);
        toast({
          title: "Thématique créée",
          description: `« ${t} » est désormais disponible dans le select.`,
        });
        return true;
      } catch {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Création de la thématique impossible.",
        });
        return false;
      }
    },
    [customThemes]
  );

  // Catalogue officiel fusionné avec les surcharges enregistrées
  const catalog: Array<{
    video: PodLabVideo;
    row: CmsEpisode | null;
    status: CmsStatus;
    isCustom: false;
  }> = VIDEOS.map((v) => ({
    video: v,
    row: overrides[v.videoId] ?? null,
    status: overrides[v.videoId]?.status ?? "publie",
    isCustom: false as const,
  }));

  const customList: Array<{
    video: CmsEpisode;
    row: CmsEpisode;
    status: CmsStatus;
    isCustom: true;
  }> = customs.map((c) => ({
    video: c as unknown as PodLabVideo & CmsEpisode,
    row: c,
    status: c.status,
    isCustom: true as const,
  }));

  const merged = (() => {
    const q = query.trim().toLowerCase();
    const all = [...customList, ...catalog];
    return q ? all.filter((e) => e.video.title.toLowerCase().includes(q)) : all;
  })();

  const persist = useCallback(
    async (
      videoId: string,
      payload: Partial<{
        isCustom: boolean;
        title: string;
        guest: string | null;
        theme: string;
        youtubeUrl: string;
        thumbnail: string | null;
        excerpt: string;
        transcription: string;
        status: CmsStatus;
      }>
    ): Promise<boolean> => {
      const cat = VIDEOS.find((v) => v.videoId === videoId);
      const existing =
        overrides[videoId] ?? customs.find((c) => c.videoId === videoId) ?? null;
      const body = {
        videoId,
        isCustom: payload.isCustom ?? existing?.isCustom ?? !cat,
        title: payload.title ?? existing?.title ?? cat?.title ?? "",
        guest: payload.guest ?? existing?.guest ?? null,
        theme: payload.theme ?? existing?.theme ?? cat?.theme ?? "entrepreneuriat",
        youtubeUrl:
          payload.youtubeUrl ?? existing?.youtubeUrl ?? cat?.youtubeUrl ?? "",
        thumbnail:
          payload.thumbnail ?? existing?.thumbnail ?? cat?.thumbnail ?? null,
        excerpt: payload.excerpt ?? existing?.excerpt ?? null,
        transcription:
          payload.transcription ?? existing?.transcription ?? null,
        status: payload.status ?? existing?.status ?? "brouillon",
      };
      try {
        const res = await fetch("/api/admin/episodes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const d = await res.json();
        if (!res.ok || !d.ok) {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: d.error ?? "Enregistrement impossible.",
          });
          return false;
        }
        return true;
      } catch {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Serveur injoignable — réessayez.",
        });
        return false;
      }
    },
    [overrides, customs]
  );

  const submitEpisode = async (data: {
    videoId: string;
    isCustom: boolean;
    title: string;
    guest: string | null;
    theme: string;
    youtubeUrl: string;
    thumbnail: string | null;
    excerpt: string;
    transcription: string;
    status: CmsStatus;
  }) => {
    const editingCustom = editing?.isCustom ? editing.videoId === data.videoId : false;
    const ok = await persist(data.videoId, data);
    if (ok) {
      toast({
        title: editingCustom ? "Épisode mis à jour" : "Épisode enregistré",
        description: editingCustom
          ? "Les modifications sont persistées en base."
          : `« ${data.title} » enregistré en brouillon${data.guest ? ` — invité : ${data.guest}` : ""}.`,
      });
      load();
    }
    return ok;
  };

  const setStatus = async (videoId: string, status: CmsStatus) => {
    const ok = await persist(videoId, { status });
    if (ok) {
      toast({
        title:
          status === "publie"
            ? "Épisode publié"
            : status === "brouillon"
              ? "Épisode en brouillon"
              : "Épisode retiré du catalogue",
        description: "Statut persisté en base.",
      });
      load();
    }
  };

  const remove = async (videoId: string, isCustom: boolean) => {
    try {
      const res = await fetch(
        `/api/admin/episodes?videoId=${encodeURIComponent(videoId)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      toast({
        title: isCustom ? "Épisode supprimé" : "Personnalisation supprimée",
        description: isCustom
          ? "L'épisode a été définitivement retiré."
          : "L'épisode du catalogue retrouve son état officiel.",
      });
      load();
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Suppression impossible.",
      });
    }
  };

  const counts = {
    total: catalog.length + customs.length,
    publie:
      catalog.filter((c) => c.status === "publie").length +
      customs.filter((c) => c.status === "publie").length,
    brouillon:
      catalog.filter((c) => c.status === "brouillon").length +
      customs.filter((c) => c.status === "brouillon").length,
    retire:
      catalog.filter((c) => c.status === "retire").length +
      customs.filter((c) => c.status === "retire").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">
            Gestionnaire d&apos;épisodes
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {counts.total} épisodes · {counts.publie} publiés ·{" "}
            {counts.brouillon} brouillons · {counts.retire} retirés ·{" "}
            {customThemes.length} thématique
            {customThemes.length > 1 ? "s" : ""} personnalisée
            {customThemes.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrer le catalogue…"
            aria-label="Filtrer les épisodes du CMS"
            className="h-9 w-48 rounded-lg border-white/15 bg-black/60 text-xs"
          />
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
            className="gap-2 rounded-xl font-semibold"
          >
            <Plus className="size-4" /> Ajouter un épisode
          </Button>
        </div>
      </div>

      {loadError ? (
        <GlassCard className="flex flex-col items-center gap-3 p-10 text-center">
          <CircleAlert className="size-8 text-red-500" />
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            Le CMS n&apos;a pas pu charger les épisodes. Vérifiez que le serveur
            est bien actif, puis relancez.
          </p>
          <Button onClick={load} variant="outline" className="gap-2 rounded-lg">
            <RotateCcw className="size-3.5" /> Réessayer
          </Button>
        </GlassCard>
      ) : loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl border border-white/5 bg-zinc-950/60"
            />
          ))}
        </div>
      ) : (
        <div className="max-h-[560px] space-y-3 overflow-y-auto scrollbar-dark pr-1">
          {merged.map((e) => {
            const v = e.video;
            const isCustom = e.isCustom;
            const status = e.status;
            const badge = STATUS_BADGES[status];
            const excerptText = isCustom
              ? stripHtml((e.row as CmsEpisode).excerpt)
              : "";
            const hasTranscription = isCustom
              ? stripHtml((e.row as CmsEpisode).transcription).length > 40
              : true;
            const hasPdf = isCustom ? false : true;
            const thumbnail = isCustom
              ? (e.row as CmsEpisode).thumbnail ?? ""
              : (v as PodLabVideo).thumbnail;
            const youtubeUrl = isCustom
              ? (e.row as CmsEpisode).youtubeUrl
              : (v as PodLabVideo).youtubeUrl;
            const videoId = isCustom
              ? (e.row as CmsEpisode).videoId
              : (v as PodLabVideo).videoId;
            const title = v.title;
            const theme = isCustom
              ? (e.row as CmsEpisode).theme
              : (v as PodLabVideo).theme;

            return (
              <GlassCard key={videoId} className="p-4 md:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <div className="group relative size-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                      <img
                        src={thumbnail}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-bold text-white">
                          {title}
                        </h3>
                        <span className={badge.cls}>{badge.label}</span>
                        {isCustom && (
                          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                            Ajouté au CMS
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">
                        {themeLabel(theme)} · {videoId}
                      </p>
                      {isCustom && excerptText && (
                        <p className="mt-1 max-w-xl truncate text-[11px] text-zinc-600">
                          {excerptText.slice(0, 140)}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-zinc-400">
                          <Youtube className="size-3" /> URL YouTube synchronisée
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-zinc-400">
                          <ScrollText className="size-3" />{" "}
                          {hasTranscription ? "Transcription SEO" : "Transcription manquante"}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-zinc-400">
                          <FileText className="size-3" />{" "}
                          {hasPdf ? "Fiche PDF" : "Fiche PDF manquante"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 shrink-0 rounded-lg border-white/15"
                        aria-label="Actions épisode"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="glass-strong border-white/10"
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          window.open(youtubeUrl, "_blank", "noreferrer")
                        }
                        className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                      >
                        <Youtube className="size-3.5" /> Ouvrir sur YouTube
                      </DropdownMenuItem>
                      {isCustom && (
                        <DropdownMenuItem
                          onClick={() => {
                            setEditing(e.row as CmsEpisode);
                            setDialogOpen(true);
                          }}
                          className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                        >
                          <ScrollText className="size-3.5" /> Modifier (résumé,
                          transcription…)
                        </DropdownMenuItem>
                      )}
                      {status !== "publie" && (
                        <DropdownMenuItem
                          onClick={() => setStatus(videoId, "publie")}
                          className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                        >
                          <Plus className="size-3.5" /> Publier
                        </DropdownMenuItem>
                      )}
                      {status !== "brouillon" && (
                        <DropdownMenuItem
                          onClick={() => setStatus(videoId, "brouillon")}
                          className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                        >
                          <RotateCcw className="size-3.5" /> Repasser en brouillon
                        </DropdownMenuItem>
                      )}
                      {!isCustom && status !== "retire" && (
                        <DropdownMenuItem
                          onClick={() => setStatus(videoId, "retire")}
                          className="gap-2 text-zinc-400 focus:bg-white/10 focus:text-white"
                        >
                          <Trash2 className="size-3.5" /> Retirer du catalogue
                        </DropdownMenuItem>
                      )}
                      {!isCustom && status === "retire" && (
                        <DropdownMenuItem
                          onClick={() => setStatus(videoId, "publie")}
                          className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                        >
                          <RotateCcw className="size-3.5" /> Restaurer dans le
                          catalogue
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-white/10" />
                      {(isCustom || status !== "publie") && (
                        <DropdownMenuItem
                          onClick={() => remove(videoId, isCustom)}
                          className="gap-2 text-red-400 focus:bg-red-950/60 focus:text-red-300"
                        >
                          <Trash2 className="size-3.5" />{" "}
                          {isCustom
                            ? "Supprimer définitivement"
                            : "Supprimer la personnalisation"}
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      <EpisodeDialog
        key={editing?.id ?? "new"}
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) setEditing(null);
        }}
        customThemes={customThemes}
        onAddTheme={addTheme}
        initial={editing}
        onSubmit={submitEpisode}
      />
    </div>
  );
}
