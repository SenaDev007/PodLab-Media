"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Eye, Loader2, RotateCcw, Save, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/podlab/shared";
import { toast } from "@/hooks/use-toast";

/**
 * Gestion des chiffres clés — même architecture que WinAgro (« Gestion des
 * Chiffres Clés » du dashboard) : le back-office édite les valeurs, libellés
 * et sous-textes affichés dans le hero du site public (table SiteStat).
 * Chaque modification est visible immédiatement sur la page d'accueil.
 */

interface StatRow {
  key: string;
  value: number;
  label: string;
  subText: string;
  prefix: string;
  format: "full" | "compact";
}

export function SiteStatsManager() {
  const [rows, setRows] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/site-stats");
      if (res.ok) {
        const d = await res.json();
        setRows(d.stats ?? []);
      }
    } catch {
      // silencieux
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = (i: number, patch: Partial<StatRow>) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats: rows }),
      });
      const d = await res.json();
      if (res.ok && d.success) {
        setRows(d.stats ?? rows);
        setDirty(false);
        toast({
          title: "Chiffres clés mis à jour",
          description:
            "Le hero de la page d'accueil affiche désormais ces valeurs.",
        });
      } else {
        toast({
          title: "Erreur",
          description: d.error || "Enregistrement impossible.",
        });
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Enregistrement impossible — réessayez.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 py-20 text-sm text-zinc-400">
        <Loader2 className="size-4 animate-spin" /> Chargement des chiffres clés…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Aperçu live du hero */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Eye className="size-4" /> Aperçu — barre de preuve sociale du site public
          </h3>
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="size-3" /> Recharger
          </button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {rows.slice(0, 3).map((r) => (
            <div
              key={r.key}
              className="card-shine rounded-2xl border border-white/10 bg-black/60 p-5 text-left"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold tracking-tight tabular-nums text-white">
                  {r.prefix}
                  {new Intl.NumberFormat("fr-FR", {
                    notation: r.format === "compact" ? "compact" : "standard",
                    maximumFractionDigits: 1,
                  }).format(r.value)}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
                  {r.label}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">{r.subText}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-zinc-600">
          <Sparkles className="mt-0.5 size-3 shrink-0" />
          Aperçu fidèle de la page d&apos;accueil — les visiteurs voient ces
          chiffres dès leur prochaine visite. Utilisez des valeurs vérifiables
          (statistiques chaîne YouTube, nombres de réservations réelles).
        </p>
      </div>

      {/* Éditeur ligne par ligne */}
      <div className="space-y-4">
        {rows.map((r, i) => (
          <GlassCard key={r.key} className="p-5">
            <div className="flex flex-wrap items-center gap-3">
              <code className="rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[11px] font-semibold text-zinc-400">
                {r.key}
              </code>
              <span className="text-xs text-zinc-500">
                Clé technique — stable, utilisée par le hero public
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Valeur (nombre)
                </label>
                <input
                  type="number"
                  min={0}
                  value={r.value}
                  onChange={(e) => update(i, { value: Number(e.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm tabular-nums text-white focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Libellé (max 80)
                </label>
                <input
                  type="text"
                  maxLength={80}
                  value={r.label}
                  onChange={(e) => update(i, { label: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Préfixe / format
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={2}
                    value={r.prefix}
                    placeholder="+"
                    onChange={(e) => update(i, { prefix: e.target.value })}
                    className="w-14 rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 text-center text-sm text-white focus:border-white/40 focus:outline-none"
                  />
                  <select
                    value={r.format}
                    onChange={(e) =>
                      update(i, { format: e.target.value === "compact" ? "compact" : "full" })
                    }
                    className="flex-1 rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 text-sm text-white focus:border-white/40 focus:outline-none [&>option]:bg-black"
                  >
                    <option value="full">Complet — 128 000</option>
                    <option value="compact">Compact — 1 M</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Sous-texte descriptif (max 200)
              </label>
              <textarea
                rows={2}
                maxLength={200}
                value={r.subText}
                onChange={(e) => update(i, { subText: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-sm leading-relaxed text-white focus:border-white/40 focus:outline-none"
              />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/80 px-5 py-4 backdrop-blur">
        <p className="text-[11px] leading-relaxed text-zinc-500">
          {dirty
            ? "Modifications non enregistrées — pensez à publier."
            : "Chiffres synchronisés avec la page d'accueil."}
        </p>
        <button
          onClick={save}
          disabled={saving || !dirty}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? <Loader2 className="size-3.5 animate-spin" /> : dirty ? <Save className="size-3.5" /> : <Check className="size-3.5" />}
          {saving ? "Publication…" : "Publier sur le site public"}
        </button>
      </div>
    </div>
  );
}
