"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ChevronRight,
  FileCheck2,
  GripVertical,
  Star,
  UserRound,
} from "lucide-react";
import { GlassCard } from "@/components/podlab/shared";
import { LEAD_STATUS_LABELS } from "@/lib/data-mock";
import { toast } from "@/hooks/use-toast";
import type { Lead, LeadStatus } from "@/types/podlab";
import { cn } from "@/lib/utils";

const STATUSES: LeadStatus[] = ["nouveau", "kit_envoye", "rdv_cale", "devis", "signe"];
const STATUS_HINTS: Record<LeadStatus, string> = {
  nouveau: "Demandes entrantes",
  kit_envoye: "Kit Média PDF transmis",
  rdv_cale: "Rendez-vous planifiés",
  devis: "Propositions commerciales en revue",
  signe: "Contrats signés",
};

export function CrmKanban({ onChanged }: { onChanged?: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<LeadStatus | null>(null);
  const [priorityOnly, setPriorityOnly] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data.leads ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const move = useCallback(
    async (leadId: string, status: LeadStatus) => {
      const lead = leads.find((l) => l.id === leadId);
      if (!lead || lead.status === status) return;
      // Optimiste
      setLeads((list) =>
        list.map((l) => (l.id === leadId ? { ...l, status } : l))
      );
      try {
        const res = await fetch(`/api/leads/${leadId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error();
        toast({
          title: `${lead.company} → ${LEAD_STATUS_LABELS[status]}`,
          description: "Pipeline mis à jour.",
        });
        onChanged?.();
      } catch {
        // rollback
        setLeads((list) =>
          list.map((l) => (l.id === leadId ? { ...l, status: lead.status } : l))
        );
        toast({ title: "Erreur", description: "Mise à jour impossible." });
      }
    },
    [leads, onChanged]
  );

  const togglePriority = async (lead: Lead) => {
    setLeads((list) =>
      list.map((l) =>
        l.id === lead.id ? { ...l, highPriority: !l.highPriority } : l
      )
    );
    try {
      await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ highPriority: !lead.highPriority }),
      });
      onChanged?.();
    } catch {
      setLeads((list) =>
        list.map((l) =>
          l.id === lead.id ? { ...l, highPriority: lead.highPriority } : l
        )
      );
    }
  };

  const visible = useMemo(
    () => (priorityOnly ? leads.filter((l) => l.highPriority) : leads),
    [leads, priorityOnly]
  );

  const byStatus = useMemo(() => {
    const map: Record<LeadStatus, Lead[]> = {
      nouveau: [],
      kit_envoye: [],
      rdv_cale: [],
      devis: [],
      signe: [],
    };
    for (const l of visible) map[l.status]?.push(l);
    return map;
  }, [visible]);

  const highCount = leads.filter((l) => l.highPriority).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Pipeline Sponsoring B2B</h2>
          <p className="mt-1 text-xs text-zinc-500">
            {leads.length} leads · {highCount} en priorité commerciale haute
            (budget &gt; 1 000 000 F CFA) · glissez les cartes ou utilisez
            les flèches
          </p>
        </div>
        <button
          onClick={() => setPriorityOnly((p) => !p)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
            priorityOnly
              ? "border-white bg-white text-black"
              : "border-white/15 text-zinc-400 hover:text-white hover:border-white/40 bg-zinc-950/60"
          )}
          aria-pressed={priorityOnly}
        >
          <Star className={cn("size-3.5", priorityOnly && "fill-current")} />
          Priorité haute uniquement
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl border border-white/5 bg-zinc-950/60"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {STATUSES.map((status) => {
            const items = byStatus[status];
            const nextIdx = STATUSES.indexOf(status) + 1;
            const prevIdx = STATUSES.indexOf(status) - 1;
            return (
              <div
                key={status}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(status);
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/lead-id") || dragging;
                  if (id) move(id, status);
                  setDragOver(null);
                  setDragging(null);
                }}
                className={cn(
                  "flex min-h-[280px] flex-col rounded-2xl border bg-zinc-950/50 p-3 transition-colors",
                  dragOver === status
                    ? "border-white/60 bg-white/[0.06]"
                    : "border-white/10"
                )}
                aria-label={`Colonne ${LEAD_STATUS_LABELS[status]}`}
              >
                <div className="flex items-center justify-between px-1.5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-white" aria-hidden />
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-300">
                      {LEAD_STATUS_LABELS[status]}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-black px-2 py-0.5 text-[10px] font-semibold tabular-nums text-zinc-400">
                      {items.length}
                    </span>
                  </div>
                </div>
                <p className="px-1.5 pb-3 text-[10px] text-zinc-600">
                  {STATUS_HINTS[status]}
                </p>

                <div className="flex-1 space-y-2.5">
                  {items.map((lead) => (
                    <article
                      key={lead.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/lead-id", lead.id);
                        e.dataTransfer.effectAllowed = "move";
                        setDragging(lead.id);
                      }}
                      onDragEnd={() => {
                        setDragging(null);
                        setDragOver(null);
                      }}
                      className={cn(
                        "group cursor-grab rounded-xl border bg-black/70 p-3.5 transition-all active:cursor-grabbing",
                        lead.highPriority
                          ? "border-white/50 shadow-[0_0_24px_-6px_rgba(255,255,255,0.35)]"
                          : "border-white/10 hover:border-white/30",
                        dragging === lead.id && "opacity-40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <GripVertical
                            className="size-3.5 text-zinc-600"
                            aria-hidden
                          />
                          <Briefcase className="size-3.5 text-zinc-500" />
                          <h4 className="text-xs font-bold text-white leading-tight">
                            {lead.company}
                          </h4>
                        </div>
                        <button
                          onClick={() => togglePriority(lead)}
                          className="shrink-0 rounded-md p-1 hover:bg-white/10"
                          aria-label={
                            lead.highPriority
                              ? "Retirer la priorité haute"
                              : "Marquer en priorité haute"
                          }
                          title="Basculer la priorité commerciale"
                        >
                          <Star
                            className={cn(
                              "size-3.5",
                              lead.highPriority
                                ? "fill-white text-white"
                                : "text-zinc-600"
                            )}
                          />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-500">
                        <UserRound className="size-3" /> {lead.contactName}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span
                          className={cn(
                            "rounded-md px-2 py-0.5 text-[10px] font-semibold",
                            lead.budgetRange === "C"
                              ? "bg-white text-black"
                              : "border border-white/15 text-zinc-400"
                          )}
                        >
                          {lead.budgetLabel}
                        </span>
                        {lead.mediaKitSent && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-zinc-500">
                            <FileCheck2 className="size-2.5" /> Kit envoyé
                          </span>
                        )}
                      </div>

                      {/* Contrôles de déplacement */}
                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
                        <button
                          onClick={() => move(lead.id, STATUSES[prevIdx])}
                          disabled={prevIdx < 0}
                          className="rounded-md p-1 text-zinc-600 transition-colors enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-25"
                          aria-label="Reculer d'une étape"
                        >
                          <ArrowLeft className="size-3.5" />
                        </button>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-700">
                          {new Date(lead.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                        <button
                          onClick={() => move(lead.id, STATUSES[nextIdx])}
                          disabled={nextIdx >= STATUSES.length}
                          className="rounded-md p-1 text-zinc-600 transition-colors enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-25"
                          aria-label="Avancer d'une étape"
                        >
                          <ArrowRight className="size-3.5" />
                        </button>
                      </div>
                    </article>
                  ))}

                  {items.length === 0 && (
                    <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-white/10 text-[11px] text-zinc-700">
                      Déposez une carte ici
                    </div>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-end gap-1 px-1 pt-2 text-[10px] text-zinc-700">
                  {nextIdx < STATUSES.length && (
                    <span className="flex items-center gap-1">
                      <ChevronRight className="size-3" /> {LEAD_STATUS_LABELS[STATUSES[nextIdx]]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
