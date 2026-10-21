"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CalendarRange,
  CalendarX,
  CheckCircle2,
  CircleAlert,
  Clock,
  CreditCard,
  Loader2,
  Mic,
  MoreHorizontal,
  Pencil,
  Plus,
  RotateCcw,
  Smartphone,
  Trash2,
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
import { CountryFlag } from "@/components/podlab/flag";
import { STUDIOS, BOOKING_SLOTS, STUDIO_FORMULAS, formatCFA } from "@/lib/data-mock";
import { toast } from "@/hooks/use-toast";
import type { Booking, InvitationBooking, StudioCity } from "@/types/podlab";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// Back-office — Planning des studios (Cotonou & Abidjan)
//
// CRUD complet + workflow : création de sessions (client, formule, créneau,
// paiement), confirmation / clôture / annulation, reprogrammation (date +
// créneau) et suppression — persistés via POST/PATCH/DELETE /api/bookings[/id].
// Les passages VIP (page /invitation) restent en lecture seule.
// ═══════════════════════════════════════════════════════════════════════════

type CityFilter = "all" | StudioCity;
type StatusFilter = "all" | "avenir" | "termine" | "annule";

const CITY_FILTERS: Array<{ id: CityFilter; label: string }> = [
  { id: "all", label: "Tous les studios" },
  { id: "cotonou", label: "Cotonou" },
  { id: "abidjan", label: "Abidjan" },
];

const STATUS_FILTERS: Array<{ id: StatusFilter; label: string }> = [
  { id: "all", label: "Tout le planning" },
  { id: "avenir", label: "À venir" },
  { id: "termine", label: "Terminées" },
  { id: "annule", label: "Annulées" },
];

const BOOKING_STATUS: Record<string, { label: string; cls: string }> = {
  confirme: {
    label: "Confirmée",
    cls: "bg-white text-black",
  },
  termine: {
    label: "Terminée",
    cls: "border border-white/15 text-zinc-400",
  },
  annule: {
    label: "Annulée",
    cls: "border border-red-500/50 text-red-400",
  },
};

type PlanningItem =
  | { kind: "studio"; key: string; b: Booking }
  | { kind: "vip"; key: string; b: InvitationBooking };

const today = () => new Date(new Date().toDateString());

// ─── Modal : création d'une session studio ──────────────────────────────────

function NewSessionDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: () => Promise<void>;
}) {
  const [city, setCity] = useState<StudioCity>("cotonou");
  const [formula, setFormula] = useState("audio");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(BOOKING_SLOTS[0].slot);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mobile-money" | "carte">(
    "mobile-money"
  );
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!date || !clientName.trim() || !email.includes("@") || phone.trim().length < 6) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Date, client (nom, email, téléphone) et créneau sont requis.",
      });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          formula,
          date,
          slot,
          clientName: clientName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          paymentMethod,
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? "");
      toast({
        title: "Session planifiée",
        description: `${clientName} — ${slot} le ${date} (${d.booking?.formulaLabel ?? "studio"}). Paiement enregistré.`,
      });
      // Reset
      setDate("");
      setClientName("");
      setEmail("");
      setPhone("");
      onOpenChange(false);
      await onCreated();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Création impossible",
        description:
          e instanceof Error && e.message
            ? e.message
            : "Vérifiez les champs et réessayez.",
      });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "h-10 rounded-lg bg-black/60 border-white/15";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[92vh] overflow-y-auto scrollbar-dark rounded-2xl border-white/10 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-white">
            <Plus className="size-4" /> Planifier une session studio
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Créez directement une réservation (client entré par téléphone,
            en direct, ou remplacement d&apos;un créneau).
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3.5">
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Studio</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as StudioCity)}
                className="h-10 w-full rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
                aria-label="Studio"
              >
                <option value="cotonou" className="bg-zinc-950">Cotonou 🇧🇯</option>
                <option value="abidjan" className="bg-zinc-950">Abidjan 🇨🇮</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Formule</label>
              <select
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className="h-10 w-full rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
                aria-label="Formule studio"
              >
                {STUDIO_FORMULAS.map((f) => (
                  <option key={f.id} value={f.id} className="bg-zinc-950">
                    {f.name} — {formatCFA(f.price)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
                aria-label="Date de la session"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Créneau</label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="h-10 w-full rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
                aria-label="Créneau"
              >
                {BOOKING_SLOTS.map((s) => (
                  <option key={s.slot} value={s.slot} className="bg-zinc-950">
                    {s.slot} ({s.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Client</label>
            <Input
              placeholder="Nom complet du client"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={inputCls}
            />
          </div>
          <div className="grid gap-3.5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Email</label>
              <Input
                type="email"
                placeholder="client@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Téléphone</label>
              <Input
                placeholder="+229 …"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">
              Paiement (acompte simulé)
            </label>
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as "mobile-money" | "carte")
              }
              className="h-10 w-full rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
              aria-label="Mode de paiement"
            >
              <option value="mobile-money" className="bg-zinc-950">
                Mobile Money (FedaPay)
              </option>
              <option value="carte" className="bg-zinc-950">
                Carte bancaire (Paystack)
              </option>
            </select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" className="rounded-lg" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={submit} disabled={saving} className="gap-2 rounded-lg">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <CalendarRange className="size-4" />}
            Planifier la session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Modal : reprogrammation ────────────────────────────────────────────────

function RescheduleDialog({
  booking,
  onClose,
  onSaved,
}: {
  booking: Booking | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [date, setDate] = useState(booking?.date ?? "");
  const [slot, setSlot] = useState(booking?.slot ?? BOOKING_SLOTS[0].slot);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (booking) {
      setDate(booking.date);
      setSlot(booking.slot);
    }
  }, [booking]);

  const submit = async () => {
    if (!booking || !date) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, slot }),
      });
      if (!res.ok) throw new Error();
      toast({
        title: "Session reprogrammée",
        description: `${booking.clientName} — ${slot} le ${date}.`,
      });
      onClose();
      await onSaved();
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Reprogrammation impossible.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!booking} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="glass-strong rounded-2xl border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-white">
            <Pencil className="size-4" /> Reprogrammer la session
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            {booking?.clientName} — {booking?.formulaLabel} ({booking?.city})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3.5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Nouvelle date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 rounded-lg bg-black/60 border-white/15"
              aria-label="Nouvelle date"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Nouveau créneau</label>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="h-10 w-full rounded-lg border border-white/15 bg-black/60 px-3 text-sm text-white outline-none focus:border-white/40"
              aria-label="Nouveau créneau"
            >
              {BOOKING_SLOTS.map((s) => (
                <option key={s.slot} value={s.slot} className="bg-zinc-950">
                  {s.slot} ({s.label})
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" className="rounded-lg" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={submit} disabled={saving} className="gap-2 rounded-lg">
            {saving && <Loader2 className="size-4 animate-spin" />} Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Vue principale ──────────────────────────────────────────────────────────

export function PlanningManager({ onChanged }: { onChanged?: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invitations, setInvitations] = useState<InvitationBooking[]>([]);
  const [filter, setFilter] = useState<CityFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [rescheduling, setRescheduling] = useState<Booking | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Booking | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const [resB, resI] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/invitations"),
      ]);
      if (!resB.ok || !resI.ok) throw new Error();
      const [dataB, dataI] = await Promise.all([resB.json(), resI.json()]);
      setBookings(dataB.bookings ?? []);
      setInvitations(dataI.invitations ?? []);
    } catch {
      setLoadError(true);
      toast({
        variant: "destructive",
        title: "Chargement impossible",
        description: "Le planning n'a pas pu être chargé — réessayez.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patchBooking = async (b: Booking, patch: Record<string, unknown>, msg: string) => {
    try {
      const res = await fetch(`/api/bookings/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      toast({ title: msg, description: `${b.clientName} — planning mis à jour.` });
      await load();
      onChanged?.();
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Mise à jour impossible.",
      });
    }
  };

  const removeBooking = async (b: Booking) => {
    try {
      const res = await fetch(`/api/bookings/${b.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast({
        title: "Session supprimée",
        description: `${b.clientName} — réservation retirée du planning.`,
      });
      setConfirmDelete(null);
      await load();
      onChanged?.();
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Suppression impossible.",
      });
    }
  };

  const all: PlanningItem[] = [
    ...bookings.map((b) => ({ kind: "studio" as const, key: b.id, b })),
    ...invitations.map((b) => ({ kind: "vip" as const, key: b.id, b })),
  ]
    .filter((item) => filter === "all" || item.b.city === filter)
    .filter((item) => {
      if (statusFilter === "all") return true;
      if (item.kind !== "studio") return statusFilter === "avenir";
      const st = item.b.status ?? "confirme";
      if (statusFilter === "annule") return st === "annule";
      if (statusFilter === "termine") return st === "termine";
      return st !== "annule" && new Date(item.b.date) >= today();
    })
    .sort((a, b) => a.b.date.localeCompare(b.b.date));

  const revenue = bookings
    .filter((b) => (filter === "all" || b.city === filter) && b.status !== "annule")
    .reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            <CalendarRange className="size-5" /> Planning des studios
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {bookings.length} sessions studio · {invitations.length} passage
            {invitations.length > 1 ? "s" : ""} VIP · {formatCFA(revenue)} de CA
            studios cumulé
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1.5" role="group" aria-label="Filtrer par statut">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStatusFilter(s.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all border",
                  statusFilter === s.id
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-zinc-400 hover:text-white hover:border-white/40 bg-zinc-950/60"
                )}
                aria-pressed={statusFilter === s.id}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5" role="group" aria-label="Filtrer par ville">
            {CITY_FILTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all border",
                  filter === c.id
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-zinc-400 hover:text-white hover:border-white/40 bg-zinc-950/60"
                )}
                aria-pressed={filter === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
          <Button onClick={() => setNewOpen(true)} className="gap-2 rounded-xl font-semibold">
            <Plus className="size-4" /> Nouvelle session
          </Button>
        </div>
      </div>

      {loadError ? (
        <GlassCard className="flex flex-col items-center gap-3 p-10 text-center">
          <CircleAlert className="size-8 text-red-500" />
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            Le planning n&apos;a pas pu être chargé. Vérifiez que le serveur est
            actif, puis relancez.
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
      ) : all.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-3 p-10 text-center">
          <CalendarX className="size-8 text-zinc-600" />
          <p className="text-sm text-zinc-500">
            Aucune session pour ces filtres — planifiez-en une nouvelle.
          </p>
          <Button onClick={() => setNewOpen(true)} variant="outline" className="gap-2 rounded-lg">
            <Plus className="size-3.5" /> Nouvelle session
          </Button>
        </GlassCard>
      ) : (
        <div className="max-h-[520px] space-y-3 overflow-y-auto scrollbar-dark pr-1">
          {all.map((item) => {
            const studio = STUDIOS.find((s) => s.id === item.b.city);
            const isPast = new Date(item.b.date) < today();
            const isVip = item.kind === "vip";
            const vip = isVip ? (item.b as InvitationBooking) : null;
            const studioBooking = !isVip ? (item.b as Booking) : null;
            const bStatus = studioBooking?.status ?? "confirme";
            const statusMeta = BOOKING_STATUS[bStatus] ?? BOOKING_STATUS.confirme;
            const title = isVip ? vip!.guestName : studioBooking!.clientName;
            const subLabel = isVip
              ? `${vip!.role ? vip!.role + " · " : ""}${vip!.topic ? "« " + vip!.topic + " »" : "Sujet à définir"}`
              : studioBooking!.formulaLabel;

            return (
              <GlassCard
                key={item.key}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-4 p-4 md:p-5",
                  isPast && !isVip && bStatus === "confirme" && "opacity-50",
                  isVip && "border-white/20",
                  bStatus === "annule" && "opacity-60"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Bloc date */}
                  <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-white/10 bg-black py-2">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                      {new Date(item.b.date).toLocaleDateString("fr-FR", { month: "short" })}
                    </span>
                    <span className="text-xl font-bold leading-none text-white">
                      {new Date(item.b.date).toLocaleDateString("fr-FR", { day: "2-digit" })}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-white">{title}</span>
                      {isVip ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                          <Mic className="size-2.5" /> VIP
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-400">
                        {studio && (
                          <CountryFlag code={studio.flag} className="h-2.5 w-4 rounded-[2px]" />
                        )}
                        {item.b.city}
                      </span>
                      {isVip && vip!.ref && (
                        <span className="rounded-md border border-white/15 px-2 py-0.5 font-mono text-[9px] tracking-wider text-zinc-300">
                          {vip!.ref}
                        </span>
                      )}
                      {!isVip && (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                            statusMeta.cls
                          )}
                        >
                          {statusMeta.label}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">{subLabel}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> {item.b.slot}
                      </span>
                      {isVip ? (
                        <>
                          <span>{vip!.email}</span>
                          <span>{vip!.phone}</span>
                          <span className="uppercase tracking-wider">
                            Format : {vip!.format}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-1">
                            {studioBooking!.paymentMethod === "mobile-money" ? (
                              <Smartphone className="size-3" />
                            ) : (
                              <CreditCard className="size-3" />
                            )}
                            {studioBooking!.paymentMethod === "mobile-money"
                              ? "Mobile Money"
                              : "Carte"}
                          </span>
                          <span>{studioBooking!.email}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-base font-bold text-white">
                      {isVip ? "Passage offert" : formatCFA(studioBooking!.amount)}
                    </div>
                    {isVip && (
                      <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                        Invitation VIP
                      </div>
                    )}
                  </div>
                  {!isVip && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8 shrink-0 rounded-lg border-white/15"
                          aria-label="Actions session"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-strong border-white/10">
                        {bStatus !== "confirme" && (
                          <DropdownMenuItem
                            onClick={() =>
                              patchBooking(studioBooking!, { status: "confirme" }, "Session confirmée")
                            }
                            className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                          >
                            <CalendarRange className="size-3.5" /> Confirmer
                          </DropdownMenuItem>
                        )}
                        {bStatus !== "termine" && (
                          <DropdownMenuItem
                            onClick={() =>
                              patchBooking(studioBooking!, { status: "termine" }, "Session terminée")
                            }
                            className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                          >
                            <CheckCircle2 className="size-3.5" /> Clôturer (terminée)
                          </DropdownMenuItem>
                        )}
                        {bStatus !== "annule" && (
                          <DropdownMenuItem
                            onClick={() =>
                              patchBooking(studioBooking!, { status: "annule" }, "Session annulée")
                            }
                            className="gap-2 text-zinc-400 focus:bg-white/10 focus:text-white"
                          >
                            <CalendarX className="size-3.5" /> Annuler la session
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => setRescheduling(studioBooking!)}
                          className="gap-2 text-zinc-300 focus:bg-white/10 focus:text-white"
                        >
                          <Pencil className="size-3.5" /> Reprogrammer…
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                          onClick={() => setConfirmDelete(studioBooking!)}
                          className="gap-2 text-red-400 focus:bg-red-950/60 focus:text-red-300"
                        >
                          <Trash2 className="size-3.5" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      <NewSessionDialog
        open={newOpen}
        onOpenChange={setNewOpen}
        onCreated={load}
      />
      <RescheduleDialog
        booking={rescheduling}
        onClose={() => setRescheduling(null)}
        onSaved={load}
      />

      {/* Confirmation de suppression */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
      >
        <DialogContent className="glass-strong rounded-2xl border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-white">
              <CircleAlert className="size-5 text-red-500" /> Supprimer la session ?
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-zinc-400">
              {confirmDelete?.clientName} — {confirmDelete?.formulaLabel} du{" "}
              {confirmDelete?.date} ({confirmDelete?.slot}). Cette action est
              définitive ; préférez « Annuler » pour garder la trace.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" className="rounded-lg" onClick={() => setConfirmDelete(null)}>
              Retour
            </Button>
            <Button
              onClick={() => confirmDelete && removeBooking(confirmDelete)}
              className="gap-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
            >
              <Trash2 className="size-4" /> Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
