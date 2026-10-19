"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  Smartphone,
  Ticket,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import { EVENTS, formatCFA, formatDateFR } from "@/lib/data-mock";
import { toast } from "@/hooks/use-toast";
import type { PodLabEvent } from "@/types/podlab";
import { cn } from "@/lib/utils";

// ─── Modale d'achat de billets ───────────────────────────────────────────────
function TicketDialog({
  event,
  open,
  onOpenChange,
}: {
  event: PodLabEvent | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mobile-money" | "carte">("mobile-money");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const total = event ? event.price * quantity : 0;

  const submit = async () => {
    if (!event || !buyerName || !email.includes("@")) {
      toast({ title: "Formulaire incomplet", description: "Nom et email requis." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          quantity,
          buyerName,
          email,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Réservation impossible", description: data.error });
        return;
      }
      setDone(true);
      toast({
        title: "Billets réservés !",
        description: `${quantity} place(s) — confirmation envoyée à ${email}.`,
      });
    } catch {
      toast({ title: "Erreur", description: "Achat impossible pour le moment." });
    } finally {
      setLoading(false);
    }
  };

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setQuantity(1);
        setBuyerName("");
        setEmail("");
        setDone(false);
      }, 250);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="glass-strong rounded-2xl border-white/10 sm:max-w-md">
        {done ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="size-12 mx-auto text-white" />
            <div>
              <DialogTitle className="text-lg font-bold text-white">
                Vos billets sont réservés !
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-zinc-400">
                {quantity} billet(s) pour «&nbsp;{event?.title}&nbsp;». Les e-billets
                arrivent par email — présentez-les à l&apos;entrée.
              </DialogDescription>
            </div>
            <Button variant="outline" className="rounded-lg" onClick={() => close(false)}>
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="mb-1 w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {event?.tag} · {event?.city}
              </div>
              <DialogTitle className="text-lg font-bold leading-snug text-white">
                {event?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-500">
                {event ? formatDateFR(event.date) : ""} · {event?.time} · {event?.venue}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Quantité */}
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/60 p-3.5">
                <div className="text-sm text-zinc-300">
                  <div className="font-semibold text-white">Quantité</div>
                  <div className="text-[11px] text-zinc-500">
                    {event?.seatsLeft} places restantes
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-lg"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Retirer un billet"
                  >
                    −
                  </Button>
                  <span className="w-6 text-center text-lg font-bold tabular-nums text-white">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-lg"
                    onClick={() =>
                      setQuantity((q) => Math.min(event?.seatsLeft ?? 1, q + 1))
                    }
                    aria-label="Ajouter un billet"
                  >
                    +
                  </Button>
                </div>
              </div>

              <Input
                placeholder="Nom complet"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="h-11 rounded-xl bg-black/60 border-white/15 text-sm"
              />
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl bg-black/60 border-white/15 text-sm"
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMethod("mobile-money")}
                  className={cn(
                    "flex h-10 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-all",
                    paymentMethod === "mobile-money"
                      ? "border-white bg-white/[0.07] text-white"
                      : "border-white/10 bg-black/50 text-zinc-500 hover:border-white/40"
                  )}
                >
                  <Smartphone className="size-3.5" /> Mobile Money
                </button>
                <button
                  onClick={() => setPaymentMethod("carte")}
                  className={cn(
                    "flex h-10 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-all",
                    paymentMethod === "carte"
                      ? "border-white bg-white/[0.07] text-white"
                      : "border-white/10 bg-black/50 text-zinc-500 hover:border-white/40"
                  )}
                >
                  <CreditCard className="size-3.5" /> Carte
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
                <span className="text-sm text-zinc-300">Total à payer</span>
                <span className="text-lg font-bold tabular-nums text-white">
                  {formatCFA(total)}
                </span>
              </div>

              <Button
                onClick={submit}
                disabled={loading}
                className="w-full h-12 rounded-xl gap-2 font-semibold"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Ticket className="size-4" />}
                Acheter mes billets
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Vue Événements & Billetterie ──────────────────────────────────────────
export function EvenementsView() {
  const [selected, setSelected] = useState<PodLabEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const buy = (evt: PodLabEvent) => {
    setSelected(evt);
    setDialogOpen(true);
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-80 glow-top" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTag index="E" label="Événements &amp; Billetterie" />
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            Vivez PodLab<br />en personne.
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-zinc-400">
            Masterclasses investissement, enregistrements publics avec
            illustration en plateau, networking business. Places limitées.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {EVENTS.map((evt, i) => (
            <Reveal key={evt.id} delay={i * 0.08}>
              <article className="card-shine group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md transition-colors hover:border-white/25">
                {/* En-tête visuel */}
                <div className="relative h-36 overflow-hidden bg-black bg-grid-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-xl border border-white/15 bg-black/80 px-3.5 py-2.5 backdrop-blur">
                    <div className="text-center">
                      <div className="text-2xl font-bold leading-none text-white">
                        {new Date(evt.date).toLocaleDateString("fr-FR", { day: "2-digit" })}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
                        {new Date(evt.date).toLocaleDateString("fr-FR", { month: "short" })}
                      </div>
                    </div>
                  </div>
                  <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
                    {evt.tag}
                  </span>
                  <div className="absolute bottom-4 left-5 flex items-center gap-1.5 text-xs text-zinc-400">
                    <MapPin className="size-3.5" /> {evt.venue}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h2 className="text-lg font-bold leading-snug text-white">
                    {evt.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" /> {formatDateFR(evt.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" /> {evt.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5" /> {evt.seatsLeft} places restantes
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                    {evt.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <div>
                      <div className="text-xl font-bold text-white">
                        {formatCFA(evt.price)}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-600">
                        par place
                      </div>
                    </div>
                    <Button
                      onClick={() => buy(evt)}
                      className="rounded-xl gap-2 font-semibold"
                    >
                      <Ticket className="size-4" /> Acheter
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <TicketDialog
        event={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
}
