"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ChevronRight,
  CircleAlert,
  FileCheck2,
  GripVertical,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Star,
  Trash2,
  UserRound,
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
import { GlassCard } from "@/components/podlab/shared";
import { LEAD_STATUS_LABELS } from "@/lib/data-mock";
import { toast } from "@/hooks/use-toast";
import type { Lead, LeadStatus } from "@/types/podlab";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// Back-office — CRM Sponsoring B2B (Kanban)
//
// Pipeline complet : glisser-déposer + flèches + priorité, ET fiche lead
// éditable au clic sur chaque carte (société, contact, budget, notes, statut,
// kit média) — création manuelle et suppression incluses. Tout est persisté
// via PATCH/DELETE /api/leads/[id] et POST /api/leads.
// ═══════════════════════════════════════════════════════════════════════════

const STATUSES: LeadStatus[] = ["nouveau", "kit_envoye", "rdv_cale", "devis", "signe"];
const STATUS_HINTS: Record<LeadStatus, string> = {
  nouveau: "Demandes entrantes",
  kit_envoye: "Kit Média PDF transmis",
  rdv_cale: "Rendez-vous planifiés",
  devis: "Propositions commerciales en revue",
  signe: "Contrats signés",
};
const BUDGETS: Array<{ id: "A" | "B" | "C"; label: string }> = [
  { id: "A", label: "< 500 000 F CFA" },
  { id: "B", label: "500 000 – 1 000 000 F CFA" },
  { id: "C", label: "> 1 000 000 F CFA" },
];

const emptyLead = {
  company: "",
  contactName: "",
  email: "",
  phone: "",
  budgetRange: "B" as "A" | "B" | "C",
  message: "",
  status: "nouveau" as LeadStatus,
  highPriority: false,
  mediaKitSent: false,
};

// ─── Fiche lead — création & édition ────────────────────────────────────────

function LeadDialog({
  open,
  onOpenChange,
  initial,
  onSave,
  onDelete,
  saving,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: Lead | null; // null = création
  onSave: (data: typeof emptyLead & { id?: string }) => Promise<boolean>;
  onDelete?: (id: string) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          company: initial.company,
          contactName: initial.contactName,
          email: initial.email,
          phone: initial.phone ?? "",
          budgetRange: (initial.budgetRange as "A" | "B" | "C") ?? "B",
          message: initial.message ?? "",
          status: initial.status,
          highPriority: initial.highPriority,
          mediaKitSent: initial.mediaKitSent,
        }
      : emptyLead
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isEdit = !!initial;

  const patch = (p: Partial<typeof emptyLead>) =>
    setForm((f) => ({ ...f, ...p }));

  const submit = async () => {
    if (!form.company.trim() || !form.contactName.trim() || !form.email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Société, contact et email valide sont requis.",
      });
      return;
    }
    const ok = await onSave({ ...form, id: initial?.id });
    if (ok) onOpenChange(false);
  };

  const set = (k: keyof typeof emptyLead) => ({
    value: (form as Record<string, unknown>)[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      patch({ [k]: e.target.value } as Partial<typeof emptyLead>),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[92vh] overflow-y-auto scrollbar-dark rounded-2xl border-white/10 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-white">
            <Pencil className="size-4" />
            {isEdit ? `Fiche lead — ${initial!.company}` : "Nouveau lead"}
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            {isEdit
              ? "Corrigez les coordonnées, le budget, le statut pipeline ou les notes."
              : "Créez un lead manuellement (prospect entré par téléphone, visio, réseau…)."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3.5">
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Société</label>
              <Input
                placeholder="Ex. Atlantic Groupe"
                className="h-10 rounded-lg bg-black/60 border-white/15"
                {...set("company")}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Contact</label>
              <Input
                placeholder="Nom du contact"
                className="h-10 rounded-lg bg-black/60 border-white/15"
                {...set("contactName")}
              />
            </div>
          </div>
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Email</label>
              <Input
                type="email"
                placeholder="contact@societe.com"
                className="h-10 rounded-lg bg-black/60 border-white/15"
                {...set("email")}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Téléphone</label>
              <Input
                placeholder="+229 …"
                className="h-10 rounded-lg bg-black/60 border-white/15"
                {...set("phone")}
              />
            </div>
          </div>
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Budget annuel
              </label>
              <select
                value={form.budgetRange}
                onChange={(e) =>
                  patch({ budgetRange: e.target.value as "A" | "B" | "C" })
                }
                className="h-10 w-full rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
                aria-label="Budget annuel"
              >
                {BUDGETS.map((b) => (
                  <option key={b.id} value={b.id} className="bg-zinc-950">
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Statut pipeline
              </label>
              <select
                value={form.status}
                onChange={(e) => patch({ status: e.target.value as LeadStatus })}
                className="h-10 w-full rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
                aria-label="Statut pipeline"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-zinc-950">
                    {LEAD_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">
              Notes / besoins du prospect
            </label>
            <Textarea
              placeholder="Objectif de campagne, cible, timing souhaité, historique des échanges…"
              className="min-h-24 resize-y rounded-lg bg-black/60 border-white/15 text-sm leading-relaxed"
              {...set("message")}
            />
          </div>
          <div className="grid gap-2.5 md:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/10 bg-black/40 p-3">
              <input
                type="checkbox"
                checked={form.highPriority}
                onChange={(e) => patch({ highPriority: e.target.checked })}
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-white"
              />
              <span className="text-[11px] leading-relaxed text-zinc-400">
                <span className="font-semibold text-zinc-200">Priorité haute</span>{" "}
                — budget &gt; 1 000 000 F CFA, suivi commercial prioritaire.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-white/10 bg-black/40 p-3">
              <input
                type="checkbox"
                checked={form.mediaKitSent}
                onChange={(e) => patch({ mediaKitSent: e.target.checked })}
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-white"
              />
              <span className="text-[11px] leading-relaxed text-zinc-400">
                <span className="font-semibold text-zinc-200">Kit Média envoyé</span>{" "}
                — le PDF Kit Média a été transmis au prospect.
              </span>
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          {isEdit && onDelete && (
            <div className="mr-auto">
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-red-400">
                    Supprimer définitivement ?
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(initial!.id).then(() => onOpenChange(false))}
                    className="rounded-lg border-red-500/50 text-red-400 hover:bg-red-950/60 hover:text-red-300"
                  >
                    Confirmer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-lg"
                  >
                    Non
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmDelete(true)}
                  className="gap-1.5 rounded-lg border-red-500/40 text-red-400 hover:bg-red-950/60 hover:text-red-300"
                >
                  <Trash2 className="size-3.5" /> Supprimer le lead
                </Button>
              )}
            </div>
          )}
          <Button
            variant="outline"
            className="rounded-lg"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button onClick={submit} disabled={saving} className="gap-2 rounded-lg">
            {saving && <Loader2 className="size-4 animate-spin" />}
            {isEdit ? "Enregistrer" : "Créer le lead"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Kanban ──────────────────────────────────────────────────────────────────

export function CrmKanban({ onChanged }: { onChanged?: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<LeadStatus | null>(null);
  const [priorityOnly, setPriorityOnly] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);
  const dragMoved = useRef(false); // distingue clic réel vs fin de drag

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeads(data.leads ?? []);
    } catch {
      setLoadError(true);
      toast({
        variant: "destructive",
        title: "Chargement impossible",
        description: "Le pipeline CRM n'a pas pu être chargé — réessayez.",
      });
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
        setLeads((list) =>
          list.map((l) => (l.id === leadId ? { ...l, status: lead.status } : l))
        );
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Mise à jour impossible.",
        });
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

  // Enregistrement de la fiche lead (édition ou création)
  const saveLead = async (data: typeof emptyLead & { id?: string }) => {
    setSaving(true);
    try {
      if (data.id) {
        // Édition complète — PATCH
        const res = await fetch(`/api/leads/${data.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: data.company.trim(),
            contactName: data.contactName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim() || null,
            budgetRange: data.budgetRange,
            message: data.message.trim() || null,
            status: data.status,
            highPriority: data.highPriority,
            mediaKitSent: data.mediaKitSent,
          }),
        });
        if (!res.ok) throw new Error();
        toast({
          title: "Lead mis à jour",
          description: `${data.company} — fiche enregistrée.`,
        });
      } else {
        // Création — POST
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: data.company.trim(),
            contactName: data.contactName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim() || null,
            budgetRange: data.budgetRange,
            message: data.message.trim() || null,
          }),
        });
        const d = await res.json();
        if (!res.ok) throw new Error(d.error ?? "");
        // Applique immédiatement le statut/priorité choisis
        const created = d.lead as Lead | undefined;
        if (created && (data.status !== "nouveau" || data.highPriority || data.mediaKitSent)) {
          await fetch(`/api/leads/${created.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: data.status,
              highPriority: data.highPriority,
              mediaKitSent: data.mediaKitSent,
            }),
          });
        }
        toast({
          title: "Lead créé",
          description: `${data.company} ajouté au pipeline (${LEAD_STATUS_LABELS[data.status]}).`,
        });
      }
      await load();
      onChanged?.();
      return true;
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          e instanceof Error && e.message
            ? e.message
            : "Enregistrement impossible — réessayez.",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast({
        title: "Lead supprimé",
        description: "La carte a été retirée du pipeline.",
      });
      load();
      onChanged?.();
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Suppression impossible.",
      });
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
            (budget &gt; 1 000 000 F CFA) · cliquez une carte pour ouvrir sa
            fiche, glissez-la ou utilisez les flèches
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
            className="gap-2 rounded-xl font-semibold"
          >
            <Plus className="size-4" /> Nouveau lead
          </Button>
        </div>
      </div>

      {loadError ? (
        <GlassCard className="flex flex-col items-center gap-3 p-10 text-center">
          <CircleAlert className="size-8 text-red-500" />
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            Le pipeline n&apos;a pas pu être chargé. Vérifiez que le serveur est
            actif, puis relancez.
          </p>
          <Button onClick={load} variant="outline" className="gap-2 rounded-lg">
            <RotateCcw className="size-3.5" /> Réessayer
          </Button>
        </GlassCard>
      ) : loading ? (
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
                        dragMoved.current = true;
                        e.dataTransfer.setData("text/lead-id", lead.id);
                        e.dataTransfer.effectAllowed = "move";
                        setDragging(lead.id);
                      }}
                      onDragEnd={() => {
                        dragMoved.current = false;
                        setDragging(null);
                        setDragOver(null);
                      }}
                      onClick={() => {
                        // N'ouvre la fiche que sur un vrai clic (pas après un drag)
                        if (dragMoved.current) return;
                        setEditing(lead);
                        setDialogOpen(true);
                      }}
                      title="Cliquer pour ouvrir la fiche lead"
                      className={cn(
                        "group cursor-pointer rounded-xl border bg-black/70 p-3.5 transition-all",
                        lead.highPriority
                          ? "border-white/50 shadow-[0_0_24px_-6px_rgba(255,255,255,0.35)] hover:border-white/70"
                          : "border-white/10 hover:border-white/40",
                        dragging === lead.id && "opacity-40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <GripVertical
                            className="size-3.5 shrink-0 text-zinc-600"
                            aria-hidden
                          />
                          <Briefcase className="size-3.5 shrink-0 text-zinc-500" />
                          <h4 className="text-xs font-bold leading-tight text-white">
                            {lead.company}
                          </h4>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePriority(lead);
                          }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            move(lead.id, STATUSES[prevIdx]);
                          }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            move(lead.id, STATUSES[nextIdx]);
                          }}
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
                      <ChevronRight className="size-3" />{" "}
                      {LEAD_STATUS_LABELS[STATUSES[nextIdx]]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <LeadDialog
        key={editing?.id ?? "new"}
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) setEditing(null);
        }}
        initial={editing}
        onSave={saveLead}
        onDelete={deleteLead}
        saving={saving}
      />
    </div>
  );
}
