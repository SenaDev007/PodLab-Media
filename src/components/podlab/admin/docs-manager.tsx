"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Loader2,
  Mail,
  Plus,
  Presentation,
  RotateCcw,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { GlassCard } from "@/components/podlab/shared";
import { toast } from "@/hooks/use-toast";
import { downloadBlob } from "@/lib/download";
import {
  DOC_TYPES,
  sectionId,
  type DocSheetData,
  type DocType,
  type SheetSection,
  type SheetSectionKind,
} from "@/lib/doc-sheets";
import { VIDEOS, VIDEO_THEMES } from "@/lib/videos";

// ═══════════════════════════════════════════════════════════════════════════
// Back-office — Fiches & Documents PDF
//
// POD'LAB compose ici, de fond en comble, chaque document distribué sur le
// site public : fiches de synthèse d'épisode, fiches complètes (invités,
// citation, notes), fiche abonnés « PodLab Business Brief » et Kit Média.
// Sections activables, textes, ordre des blocs, publication — avec aperçu
// PDF AVANT enregistrement. Tant qu'aucune fiche n'est personnalisée, la
// génération publique utilise le contenu par défaut calculé automatiquement.
// ═══════════════════════════════════════════════════════════════════════════

const TYPE_ICONS: Record<DocType, typeof FileText> = {
  episode_synthese: FileText,
  episode_complete: BookOpen,
  business_brief: Mail,
  kit_media: Presentation,
};

const KIND_META: Record<SheetSectionKind, { label: string; hint: string }> = {
  paragraph: { label: "Paragraphe", hint: "Les sauts de ligne doubles créent plusieurs paragraphes." },
  bullets: { label: "Liste à puces", hint: "Une entrée par ligne." },
  chapters: { label: "Chapitres numérotés", hint: "Une entrée par ligne — numérotation automatique 01, 02…" },
  quote: { label: "Citation", hint: "Mise en avant oblique avec attribution." },
  guests: { label: "Invités", hint: "Nom et fonction de chaque invité." },
  stats: { label: "Chiffres clés", hint: "4 encadrés par rangée maximum." },
  bars: { label: "Barres de répartition", hint: "Répartition en pourcentage." },
  table: { label: "Tableau", hint: "Lignes « cellule | cellule | cellule »." },
  callout: { label: "Encadré choc", hint: "Un chiffre fort + un texte d'argumentation." },
  contact: { label: "Bloc contact", hint: "Coordonnées officielles PodLab." },
};

const INPUT_CLS =
  "w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none";

interface IndexEntry {
  scopeKey: string;
  title: string;
  published: boolean;
  updatedAt: string;
}

function newSection(kind: SheetSectionKind): SheetSection {
  const base: SheetSection = {
    id: sectionId(kind),
    kind,
    label: KIND_META[kind].label,
    enabled: true,
  };
  switch (kind) {
    case "paragraph":
      return { ...base, text: "" };
    case "bullets":
    case "chapters":
      return { ...base, items: [""] };
    case "quote":
      return { ...base, quoteText: "", quoteAuthor: "" };
    case "guests":
      return { ...base, guests: [{ name: "", role: "" }] };
    case "stats":
      return { ...base, stats: [{ value: "", label: "" }] };
    case "bars":
      return { ...base, bars: [{ label: "", pct: 50 }] };
    case "table":
      return { ...base, tableHeaders: ["Colonne 1", "Colonne 2"], items: [" | "] };
    case "callout":
      return { ...base, calloutValue: "", text: "" };
    case "contact":
      return { ...base };
  }
}

// ─── Éditeur d'une section (selon son type) ─────────────────────────────────

function SectionEditor({
  section,
  onChange,
}: {
  section: SheetSection;
  onChange: (patch: Partial<SheetSection>) => void;
}) {
  const meta = KIND_META[section.kind];

  switch (section.kind) {
    case "paragraph":
      return (
        <div>
          <textarea
            rows={5}
            value={section.text ?? ""}
            placeholder="Texte du paragraphe…"
            onChange={(e) => onChange({ text: e.target.value })}
            className={`${INPUT_CLS} resize-y leading-relaxed`}
          />
          <p className="mt-1.5 text-[11px] text-zinc-600">{meta.hint}</p>
        </div>
      );
    case "bullets":
    case "chapters":
      return (
        <div>
          <textarea
            rows={Math.min(12, (section.items?.length ?? 1) + 2)}
            value={(section.items ?? []).join("\n")}
            placeholder={"Première entrée\nDeuxième entrée"}
            onChange={(e) =>
              onChange({ items: e.target.value.split("\n") })
            }
            className={`${INPUT_CLS} resize-y leading-relaxed`}
          />
          <p className="mt-1.5 text-[11px] text-zinc-600">{meta.hint}</p>
        </div>
      );
    case "quote":
      return (
        <div className="grid gap-3 md:grid-cols-[2fr,1fr]">
          <textarea
            rows={3}
            value={section.quoteText ?? ""}
            placeholder="La citation marquante de l'invité…"
            onChange={(e) => onChange({ quoteText: e.target.value })}
            className={`${INPUT_CLS} resize-none leading-relaxed`}
          />
          <input
            type="text"
            value={section.quoteAuthor ?? ""}
            placeholder="Attribution (invité, contexte…)"
            onChange={(e) => onChange({ quoteAuthor: e.target.value })}
            className={INPUT_CLS}
          />
        </div>
      );
    case "guests":
      return (
        <div className="space-y-2">
          {(section.guests ?? []).map((g, i) => (
            <div key={i} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={g.name}
                placeholder="Nom de l'invité"
                onChange={(e) =>
                  onChange({
                    guests: (section.guests ?? []).map((x, j) =>
                      j === i ? { ...x, name: e.target.value } : x
                    ),
                  })
                }
                className={`${INPUT_CLS} sm:w-72`}
              />
              <input
                type="text"
                value={g.role}
                placeholder="Fonction / rôle"
                onChange={(e) =>
                  onChange({
                    guests: (section.guests ?? []).map((x, j) =>
                      j === i ? { ...x, role: e.target.value } : x
                    ),
                  })
                }
                className={INPUT_CLS} style={{ flex: 1 }}
              />
              <button
                onClick={() =>
                  onChange({ guests: (section.guests ?? []).filter((_, j) => j !== i) })
                }
                className="shrink-0 self-start rounded-lg border border-white/10 px-2.5 py-2.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Supprimer cet invité"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange({ guests: [...(section.guests ?? []), { name: "", role: "" }] })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Plus className="size-3" /> Ajouter un invité
          </button>
        </div>
      );
    case "stats":
      return (
        <div className="space-y-2">
          {(section.stats ?? []).map((g, i) => (
            <div key={i} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={g.value}
                placeholder="Valeur (ex : 128 000)"
                onChange={(e) =>
                  onChange({
                    stats: (section.stats ?? []).map((x, j) =>
                      j === i ? { ...x, value: e.target.value } : x
                    ),
                  })
                }
                className={`${INPUT_CLS} sm:w-44 tabular-nums`}
              />
              <input
                type="text"
                value={g.label}
                placeholder="Libellé (ex : décideurs abonnés YouTube)"
                onChange={(e) =>
                  onChange({
                    stats: (section.stats ?? []).map((x, j) =>
                      j === i ? { ...x, label: e.target.value } : x
                    ),
                  })
                }
                className={INPUT_CLS} style={{ flex: 1 }}
              />
              <button
                onClick={() => onChange({ stats: (section.stats ?? []).filter((_, j) => j !== i) })}
                className="shrink-0 self-start rounded-lg border border-white/10 px-2.5 py-2.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Supprimer ce chiffre"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
          {(section.stats?.length ?? 0) < 8 && (
            <button
              onClick={() => onChange({ stats: [...(section.stats ?? []), { value: "", label: "" }] })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Plus className="size-3" /> Ajouter un chiffre
            </button>
          )}
        </div>
      );
    case "bars":
      return (
        <div className="space-y-2">
          {(section.bars ?? []).map((b, i) => (
            <div key={i} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={b.label}
                placeholder="Libellé (ex : Dirigeants & fondateurs)"
                onChange={(e) =>
                  onChange({
                    bars: (section.bars ?? []).map((x, j) =>
                      j === i ? { ...x, label: e.target.value } : x
                    ),
                  })
                }
                className={INPUT_CLS} style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={b.pct}
                onChange={(e) =>
                  onChange({
                    bars: (section.bars ?? []).map((x, j) =>
                      j === i ? { ...x, pct: Number(e.target.value) } : x
                    ),
                  })
                }
                className={`${INPUT_CLS} sm:w-24 tabular-nums`}
              />
              <button
                onClick={() => onChange({ bars: (section.bars ?? []).filter((_, j) => j !== i) })}
                className="shrink-0 self-start rounded-lg border border-white/10 px-2.5 py-2.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Supprimer cette barre"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange({ bars: [...(section.bars ?? []), { label: "", pct: 50 }] })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Plus className="size-3" /> Ajouter une répartition
          </button>
        </div>
      );
    case "table":
      return (
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              En-têtes (séparés par | )
            </label>
            <input
              type="text"
              value={(section.tableHeaders ?? []).join(" | ")}
              placeholder="Format | Contenu | Tarif"
              onChange={(e) =>
                onChange({ tableHeaders: e.target.value.split("|").map((c) => c.trim()) })
              }
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Lignes
            </label>
            <textarea
              rows={Math.min(12, (section.items?.length ?? 1) + 1)}
              value={(section.items ?? []).join("\n")}
              placeholder={"Mention orale | 60 à 90 secondes | dès 250 000"}
              onChange={(e) => onChange({ items: e.target.value.split("\n") })}
              className={`${INPUT_CLS} resize-y leading-relaxed`}
            />
            <p className="mt-1.5 text-[11px] text-zinc-600">{meta.hint}</p>
          </div>
        </div>
      );
    case "callout":
      return (
        <div className="space-y-3">
          <input
            type="text"
            value={section.calloutValue ?? ""}
            placeholder="Chiffre fort (ex : 62 %)"
            onChange={(e) => onChange({ calloutValue: e.target.value })}
            className={`${INPUT_CLS} sm:w-56 font-bold`}
          />
          <textarea
            rows={3}
            value={section.text ?? ""}
            placeholder="Texte d'argumentation du chiffre…"
            onChange={(e) => onChange({ text: e.target.value })}
            className={`${INPUT_CLS} resize-none leading-relaxed`}
          />
        </div>
      );
    case "contact":
      return (
        <p className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-[11px] leading-relaxed text-zinc-500">
          {meta.hint} Ce bloc affiche les coordonnées officielles (téléphone,
          email, studios, réseaux) — aucune saisie nécessaire.
        </p>
      );
  }
}

// ─── Module principal ────────────────────────────────────────────────────────

export function DocsManager() {
  const [typeId, setTypeId] = useState<DocType>("episode_synthese");
  const activeType = DOC_TYPES.find((t) => t.id === typeId)!;

  const [index, setIndex] = useState<Record<string, IndexEntry>>({});
  const [loadingIndex, setLoadingIndex] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const [defaults, setDefaults] = useState<DocSheetData | null>(null);
  const [draft, setDraft] = useState<DocSheetData | null>(null);
  const [savedPublished, setSavedPublished] = useState<boolean | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [addKind, setAddKind] = useState<SheetSectionKind>("paragraph");

  // Index des fiches personnalisées du type actif
  const loadIndex = useCallback(async (t: DocType) => {
    setLoadingIndex(true);
    try {
      const res = await fetch(`/api/admin/doc-sheets?docType=${t}`);
      if (res.ok) {
        const d = await res.json();
        const map: Record<string, IndexEntry> = {};
        for (const s of d.sheets ?? []) map[s.scopeKey] = s;
        setIndex(map);
      }
    } catch {
      // silencieux
    } finally {
      setLoadingIndex(false);
    }
  }, []);

  // Chargement d'une fiche (enregistrée + défauts)
  const loadSheet = useCallback(async (t: DocType, scopeKey: string) => {
    setLoadingSheet(true);
    try {
      const res = await fetch(
        `/api/admin/doc-sheets?docType=${t}&scopeKey=${encodeURIComponent(scopeKey)}`
      );
      if (res.ok) {
        const d = await res.json();
        setDefaults(d.defaults ?? null);
        setDraft(d.saved ?? d.defaults ?? null);
        setSavedPublished(d.saved ? d.saved.published : null);
        setSavedAt(d.saved?.updatedAt ?? null);
        setDirty(false);
      }
    } catch {
      // silencieux
    } finally {
      setLoadingSheet(false);
    }
  }, []);

  // Changement de type de document
  useEffect(() => {
    setIndex({});
    setDraft(null);
    setDefaults(null);
    setSelected(null);
    setSavedPublished(null);
    setSavedAt(null);
    setDirty(false);
    loadIndex(typeId);
    if (!activeType.perEpisode) {
      // Document global : sélection immédiate
      setSelected("");
    }
  }, [typeId, activeType.perEpisode, loadIndex]);

  // Sélection d'une portée (épisode ou document global)
  useEffect(() => {
    if (selected === null) return;
    loadSheet(typeId, selected);
  }, [selected, typeId, loadSheet]);

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? VIDEOS.filter((v) => v.title.toLowerCase().includes(q))
      : VIDEOS;
    return list.slice(0, 60);
  }, [query]);

  // ─── Mutations du brouillon ─────────────────────────────────────────────
  const patchDraft = (patch: Partial<DocSheetData>) => {
    setDraft((d) => (d ? { ...d, ...patch } : d));
    setDirty(true);
  };

  const patchSection = (i: number, patch: Partial<SheetSection>) => {
    setDraft((d) =>
      d
        ? {
            ...d,
            sections: d.sections.map((s, j) => (j === i ? { ...s, ...patch } : s)),
          }
        : d
    );
    setDirty(true);
  };

  const moveSection = (i: number, dir: -1 | 1) => {
    setDraft((d) => {
      if (!d) return d;
      const j = i + dir;
      if (j < 0 || j >= d.sections.length) return d;
      const sections = [...d.sections];
      [sections[i], sections[j]] = [sections[j], sections[i]];
      return { ...d, sections };
    });
    setDirty(true);
  };

  const removeSection = (i: number) => {
    setDraft((d) => (d ? { ...d, sections: d.sections.filter((_, j) => j !== i) } : d));
    setDirty(true);
  };

  const addSection = () => {
    setDraft((d) => (d ? { ...d, sections: [...d.sections, newSection(addKind)] } : d));
    setDirty(true);
  };

  // ─── Actions ─────────────────────────────────────────────────────────────
  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/doc-sheets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const d = await res.json();
      if (res.ok && d.success) {
        setSavedPublished(d.sheet.published);
        setSavedAt(d.sheet.updatedAt ?? null);
        setDirty(false);
        loadIndex(typeId);
        toast({
          title: "Fiche enregistrée",
          description: d.sheet.published
            ? "Le site public génère désormais ce document avec votre contenu."
            : "Fiche enregistrée en brouillon — le site public utilise encore les valeurs par défaut.",
        });
      } else {
        toast({ variant: "destructive", title: "Erreur", description: d.error || "Enregistrement impossible." });
      }
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Enregistrement impossible — réessayez." });
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (selected === null) return;
    setSaving(true);
    try {
      const res = await fetch(
        `/api/admin/doc-sheets?docType=${typeId}&scopeKey=${encodeURIComponent(selected)}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        await loadSheet(typeId, selected);
        loadIndex(typeId);
        toast({
          title: "Personnalisation supprimée",
          description: "Le document revient au contenu par défaut calculé automatiquement.",
        });
      }
    } catch {
      // silencieux
    } finally {
      setSaving(false);
    }
  };

  const loadDefaultsIntoEditor = () => {
    if (!defaults) return;
    setDraft({ ...defaults, published: draft?.published ?? true });
    setDirty(true);
    toast({
      title: "Valeurs par défaut chargées",
      description: "Modifiez-les puis enregistrez pour personnaliser la fiche.",
    });
  };

  const preview = async () => {
    if (!draft) return;
    setPreviewing(true);
    try {
      const res = await fetch("/api/admin/doc-sheets/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheet: draft }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const win = window.open(url, "_blank");
      if (!win) {
        // Popup bloquée : on télécharge l'aperçu
        downloadBlob(blob, `apercu-${typeId}${selected ? `-${selected}` : ""}.pdf`);
      }
      setTimeout(() => URL.revokeObjectURL(url), 8000);
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Aperçu impossible — réessayez." });
    } finally {
      setPreviewing(false);
    }
  };

  const selectedVideo =
    activeType.perEpisode && selected ? VIDEOS.find((v) => v.videoId === selected) ?? null : null;

  return (
    <div className="space-y-5">
      {/* Sélecteur de type de document */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {DOC_TYPES.map((t) => {
          const Icon = TYPE_ICONS[t.id];
          const active = t.id === typeId;
          return (
            <button
              key={t.id}
              onClick={() => setTypeId(t.id)}
              className={`card-shine rounded-2xl border p-4 text-left transition-colors ${
                active
                  ? "border-white/60 bg-white/10"
                  : "border-white/10 bg-zinc-950/80 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`size-4 ${active ? "text-white" : "text-zinc-500"}`} />
                {active && (
                  <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                    Actif
                  </span>
                )}
              </div>
              <div className="mt-2.5 text-sm font-bold text-white">{t.label}</div>
              <div className="mt-1 text-[11px] leading-snug text-zinc-500">{t.description}</div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        {/* Sélecteur d'épisode (fiches par épisode uniquement) */}
        {activeType.perEpisode && (
          <div className="xl:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                  <Search className="size-4" /> Choisir un épisode
                </h3>
                <span className="text-[11px] text-zinc-600">
                  {Object.keys(index).length} personnalisé
                  {Object.keys(index).length > 1 ? "s" : ""} / {VIDEOS.length}
                </span>
              </div>
              <input
                type="text"
                value={query}
                placeholder="Rechercher un épisode…"
                onChange={(e) => setQuery(e.target.value)}
                className={`${INPUT_CLS} mt-4`}
              />
              <div className="mt-4 max-h-[26rem] space-y-2 overflow-y-auto pr-1">
                {loadingIndex && (
                  <p className="flex items-center justify-center gap-2 py-8 text-xs text-zinc-500">
                    <Loader2 className="size-3.5 animate-spin" /> Chargement…
                  </p>
                )}
                {filteredVideos.map((v) => {
                  const entry = index[v.videoId];
                  const active = selected === v.videoId;
                  return (
                    <button
                      key={v.videoId}
                      onClick={() => setSelected(v.videoId)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${
                        active
                          ? "border-white/60 bg-white/10"
                          : "border-white/10 bg-black/40 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={v.thumbnail}
                        alt=""
                        loading="lazy"
                        className="h-11 w-20 shrink-0 rounded-lg object-cover grayscale"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold text-white">
                          {v.title}
                        </span>
                        <span className="mt-0.5 block text-[10px] text-zinc-500">
                          {VIDEO_THEMES[v.theme]}
                          {v.publishedAt ? ` · ${v.publishedAt}` : ""}
                        </span>
                      </span>
                      {entry ? (
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            entry.published
                              ? "bg-white text-black"
                              : "border border-white/20 text-zinc-400"
                          }`}
                        >
                          {entry.published ? "Perso." : "Brouillon"}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-600">
                          Défaut
                        </span>
                      )}
                    </button>
                  );
                })}
                {!loadingIndex && filteredVideos.length === 0 && (
                  <p className="py-8 text-center text-xs text-zinc-600">
                    Aucun épisode ne correspond à cette recherche.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Éditeur de la fiche */}
        <div className={activeType.perEpisode ? "xl:col-span-7" : "xl:col-span-12"}>
          {selected === null || loadingSheet || !draft ? (
            <div className="flex min-h-[24rem] items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/80 text-sm text-zinc-500 backdrop-blur">
              {loadingSheet ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="size-4 animate-spin" /> Chargement de la fiche…
                </span>
              ) : (
                <span className="max-w-xs text-center leading-relaxed">
                  {activeType.perEpisode
                    ? "Sélectionnez un épisode pour composer la fiche que recevront les visiteurs."
                    : "Sélectionnez un type de document pour le composer."}
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Statut + actions */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {activeType.label}
                      {selectedVideo && (
                        <span className="text-zinc-500"> — {selectedVideo.title}</span>
                      )}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {savedPublished === null && (
                        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Mode par défaut — contenu calculé automatiquement
                        </span>
                      )}
                      {savedPublished === true && (
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                          Personnalisée · publiée
                        </span>
                      )}
                      {savedPublished === false && (
                        <span className="flex items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                          <AlertTriangle className="size-3" /> Brouillon — le site public
                          utilise les défauts
                        </span>
                      )}
                      {savedAt && (
                        <span className="text-[10px] text-zinc-600">
                          Enregistrée le{" "}
                          {new Date(savedAt).toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={preview}
                      disabled={previewing}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3.5 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-white/10 disabled:opacity-40"
                    >
                      {previewing ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                      Aperçu PDF
                    </button>
                    <button
                      onClick={loadDefaultsIntoEditor}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <RotateCcw className="size-3.5" /> Repartir des défauts
                    </button>
                    {savedPublished !== null && (
                      <button
                        onClick={reset}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
                      >
                        <Trash2 className="size-3.5" /> Supprimer la perso.
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Titre & sous-titre */}
              <GlassCard className="space-y-4 p-5">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Titre du document
                  </label>
                  <input
                    type="text"
                    value={draft.title}
                    placeholder={defaults?.title ?? "Titre…"}
                    onChange={(e) => patchDraft({ title: e.target.value })}
                    className={`${INPUT_CLS} font-bold`}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Sous-titre
                  </label>
                  <input
                    type="text"
                    value={draft.subtitle}
                    placeholder={defaults?.subtitle ?? "Sous-titre…"}
                    onChange={(e) => patchDraft({ subtitle: e.target.value })}
                    className={INPUT_CLS}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/10 bg-black/40 p-3">
                    <input
                      type="checkbox"
                      checked={draft.published}
                      onChange={(e) => patchDraft({ published: e.target.checked })}
                      className="mt-0.5 size-4 shrink-0 cursor-pointer accent-white"
                    />
                    <span className="text-[11px] leading-relaxed text-zinc-400">
                      <span className="font-semibold text-zinc-200">Fiche publiée</span> —
                      le site public génère le document avec ce contenu. Décochée,
                      elle reste un brouillon côté back-office.
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/10 bg-black/40 p-3">
                    <input
                      type="checkbox"
                      checked={draft.showContact}
                      onChange={(e) => patchDraft({ showContact: e.target.checked })}
                      className="mt-0.5 size-4 shrink-0 cursor-pointer accent-white"
                    />
                    <span className="text-[11px] leading-relaxed text-zinc-400">
                      <span className="font-semibold text-zinc-200">Bloc contact final</span>{" "}
                      — coordonnées officielles PodLab en fin de document.
                    </span>
                  </label>
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Note de pied de page (optionnel)
                  </label>
                  <input
                    type="text"
                    value={draft.footerNote}
                    placeholder="Ex : Document réservé aux abonnés du PodLab Business Brief."
                    onChange={(e) => patchDraft({ footerNote: e.target.value })}
                    className={INPUT_CLS}
                  />
                </div>
              </GlassCard>

              {/* Sections */}
              {draft.sections.map((s, i) => (
                <GlassCard key={s.id} className="p-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5">
                      <input
                        type="checkbox"
                        checked={s.enabled}
                        onChange={(e) => patchSection(i, { enabled: e.target.checked })}
                        className="size-3.5 cursor-pointer accent-white"
                        aria-label={`Afficher la section ${s.label}`}
                      />
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          s.enabled ? "text-zinc-200" : "text-zinc-600"
                        }`}
                      >
                        {s.enabled ? "Visible" : "Masquée"}
                      </span>
                    </label>
                    <span className="rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-semibold text-zinc-500">
                      {KIND_META[s.kind].label}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-40 flex-1">
                      <input
                        type="text"
                        value={s.label}
                        placeholder="Intitulé de la section dans le PDF"
                        onChange={(e) => patchSection(i, { label: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white focus:border-white/40 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveSection(i, -1)}
                        disabled={i === 0}
                        className="rounded-lg border border-white/10 p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
                        aria-label="Monter la section"
                      >
                        <ChevronUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => moveSection(i, 1)}
                        disabled={i === draft.sections.length - 1}
                        className="rounded-lg border border-white/10 p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
                        aria-label="Descendre la section"
                      >
                        <ChevronDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => removeSection(i)}
                        className="rounded-lg border border-white/10 p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Supprimer la section"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className={`mt-4 ${s.enabled ? "" : "opacity-40"}`}>
                    <SectionEditor section={s} onChange={(patch) => patchSection(i, patch)} />
                  </div>
                </GlassCard>
              ))}

              {/* Ajout de section */}
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-white/15 bg-black/30 px-5 py-4">
                <select
                  value={addKind}
                  onChange={(e) => setAddKind(e.target.value as SheetSectionKind)}
                  className="rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 text-xs text-white focus:border-white/40 focus:outline-none [&>option]:bg-black"
                >
                  {(Object.keys(KIND_META) as SheetSectionKind[]).map((k) => (
                    <option key={k} value={k}>
                      {KIND_META[k].label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addSection}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3.5 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Plus className="size-3.5" /> Ajouter une section
                </button>
                <span className="text-[11px] text-zinc-600">
                  Les sections vides ou masquées n&apos;apparaissent pas dans le PDF.
                </span>
              </div>

              {/* Barre d'enregistrement */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 px-5 py-4 backdrop-blur">
                <p
                  className={`flex items-center gap-2 text-[11px] leading-relaxed ${
                    dirty ? "font-semibold text-amber-400" : "text-zinc-500"
                  }`}
                >
                  {dirty ? (
                    <>
                      <AlertTriangle className="size-3.5 shrink-0 text-amber-400" />
                      Modifications non enregistrées — la génération publique
                      utilisera la dernière version publiée.
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-3.5 shrink-0" />
                      {savedPublished === null
                        ? "Fiche par défaut — enregistrez pour prendre le contrôle du contenu."
                        : "Fiche synchronisée avec la génération publique."}
                    </>
                  )}
                </p>
                <button
                  onClick={save}
                  disabled={saving || !dirty}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {saving ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : dirty ? (
                    <Save className="size-3.5" />
                  ) : (
                    <CheckCircle2 className="size-3.5" />
                  )}
                  {saving ? "Enregistrement…" : "Enregistrer la fiche"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
