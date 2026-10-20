"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Youtube,
  FileText,
  ScrollText,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/podlab/shared";
import { VIDEOS, VIDEO_THEMES } from "@/lib/videos";
import { toast } from "@/hooks/use-toast";
import type { PodLabVideo, VideoTheme } from "@/types/podlab";

interface ManagedVideo extends PodLabVideo {
  status: "publie" | "brouillon";
  hasTranscription: boolean;
  hasPdf: boolean;
}

// Initialisation : catalogue réel de la chaîne, tous publiés avec fiche PDF
const INITIAL: ManagedVideo[] = VIDEOS.map((v) => ({
  ...v,
  status: "publie" as const,
  hasTranscription: true,
  hasPdf: true,
}));

function AddEpisodeDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (video: ManagedVideo) => void;
}) {
  const [title, setTitle] = useState("");
  const [guest, setGuest] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [theme, setTheme] = useState<VideoTheme>("entrepreneuriat");
  const [transcription, setTranscription] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const submit = () => {
    if (!title || !youtubeUrl.includes("v=")) {
      toast({
        title: "Champs manquants",
        description: "Titre et URL YouTube (avec ?v=…) sont requis.",
      });
      return;
    }
    const videoId = youtubeUrl.split("v=")[1]?.split("&")[0] ?? `local-${Date.now()}`;
    onAdd({
      videoId,
      title,
      theme,
      youtubeUrl,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      status: "brouillon",
      hasTranscription: transcription.length > 40,
      hasPdf: false,
    });
    toast({
      title: "Épisode ajouté au CMS",
      description: `« ${title} » enregistré en brouillon${guest ? ` — invité : ${guest}` : ""}.`,
    });
    setTitle("");
    setGuest("");
    setYoutubeUrl("");
    setTranscription("");
    setExcerpt("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong rounded-2xl border-white/10 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white">
            Ajouter un épisode
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Synchronisez l&apos;URL YouTube, la transcription SEO et la fiche
            de synthèse PDF.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3.5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Titre de l&apos;épisode</label>
            <Input
              placeholder="Ex. Bâtir une fintech panafricaine : les leçons"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 rounded-lg bg-black/60 border-white/15"
            />
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Invité (optionnel)</label>
              <Input
                placeholder="Nom de l'invité"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                className="h-10 rounded-lg bg-black/60 border-white/15"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Thématique</label>
              <Select value={theme} onValueChange={(v) => setTheme(v as VideoTheme)}>
                <SelectTrigger className="h-10 rounded-lg bg-black/60 border-white/15 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong border-white/10">
                  {Object.entries(VIDEO_THEMES).map(([k, v]) => (
                    <SelectItem key={k} value={k} className="text-zinc-200 focus:bg-white/10">
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">URL YouTube</label>
            <Input
              placeholder="https://www.youtube.com/watch?v=…"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="h-10 rounded-lg bg-black/60 border-white/15"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Résumé public (SEO)</label>
            <Textarea
              placeholder="Description de l'épisode (2-3 lignes, mots-clés inclus)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="min-h-20 rounded-lg bg-black/60 border-white/15 text-sm resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <ScrollText className="size-3.5" /> Transcription SEO (optionnel)
            </label>
            <Textarea
              placeholder="Collez ici la transcription de l'épisode…"
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="min-h-20 rounded-lg bg-black/60 border-white/15 text-sm resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" className="rounded-lg" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button className="rounded-lg gap-2" onClick={submit}>
            <Plus className="size-4" /> Ajouter au CMS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EpisodesCms() {
  const [videos, setVideos] = useState<ManagedVideo[]>(INITIAL);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? videos.filter((v) => v.title.toLowerCase().includes(q)) : videos;
  }, [videos, query]);

  const remove = (id: string) => {
    setVideos((list) => list.filter((v) => v.videoId !== id));
    toast({ title: "Épisode supprimé", description: "L'épisode a été retiré du catalogue." });
  };

  const toggleStatus = (id: string) => {
    setVideos((list) =>
      list.map((v) =>
        v.videoId === id
          ? { ...v, status: v.status === "publie" ? "brouillon" : "publie" }
          : v
      )
    );
  };

  const add = (video: ManagedVideo) => setVideos((list) => [video, ...list]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Gestionnaire d&apos;épisodes</h2>
          <p className="mt-1 text-xs text-zinc-500">
            {videos.length} épisodes · {videos.filter((v) => v.status === "publie").length}{" "}
            publiés · {videos.filter((v) => v.status === "brouillon").length} brouillons
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
          <Button onClick={() => setDialogOpen(true)} className="gap-2 rounded-xl font-semibold">
            <Plus className="size-4" /> Ajouter un épisode
          </Button>
        </div>
      </div>

      <div className="max-h-[560px] space-y-3 overflow-y-auto scrollbar-dark pr-1">
        {list.map((v) => (
          <GlassCard key={v.videoId} className="p-4 md:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3.5">
                <div className="group relative size-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                  <img
                    src={v.thumbnail}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-white">
                      {v.title}
                    </h3>
                    <span
                      className={
                        v.status === "publie"
                          ? "rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black"
                          : "rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-300"
                      }
                    >
                      {v.status === "publie" ? "Publié" : "Brouillon"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    {VIDEO_THEMES[v.theme]} · {v.videoId}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-zinc-400">
                      <Youtube className="size-3" /> URL YouTube synchronisée
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-zinc-400">
                      <ScrollText className="size-3" />{" "}
                      {v.hasTranscription ? "Transcription SEO" : "Transcription manquante"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] text-zinc-400">
                      <FileText className="size-3" />{" "}
                      {v.hasPdf ? "Fiche PDF" : "Fiche PDF manquante"}
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
                <DropdownMenuContent align="end" className="glass-strong border-white/10">
                  <DropdownMenuItem
                    onClick={() => window.open(v.youtubeUrl, "_blank", "noreferrer")}
                    className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                  >
                    <Youtube className="size-3.5" /> Ouvrir sur YouTube
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toggleStatus(v.videoId)}
                    className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                  >
                    <Check className="size-3.5" />{" "}
                    {v.status === "publie" ? "Repasser en brouillon" : "Publier"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => remove(v.videoId)}
                    className="gap-2 text-zinc-400 focus:bg-white/10 focus:text-white"
                  >
                    <Trash2 className="size-3.5" /> Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </GlassCard>
        ))}
      </div>

      <AddEpisodeDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={add} />
    </div>
  );
}
