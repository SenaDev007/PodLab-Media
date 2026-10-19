"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  Mic,
  Smartphone,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import {
  BOOKING_SLOTS,
  STUDIOS,
  STUDIO_FORMULAS,
  formatCFA,
  formatDateFR,
} from "@/lib/data-mock";
import { PRICES } from "@/lib/pricing";
import { toast } from "@/hooks/use-toast";
import type { Booking, StudioCity, StudioFormulaId } from "@/types/podlab";
import { cn } from "@/lib/utils";

const STEPS = ["Ville", "Formule", "Créneau", "Paiement", "Confirmation"];
const DAYS_AHEAD = 14;

function buildDays(): Array<{ iso: string; weekday: string; day: string; month: string }> {
  const out: Array<{ iso: string; weekday: string; day: string; month: string }> = [];
  const now = new Date();
  for (let i = 1; i <= DAYS_AHEAD; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("fr-FR", { weekday: "short" }),
      day: d.toLocaleDateString("fr-FR", { day: "2-digit" }),
      month: d.toLocaleDateString("fr-FR", { month: "short" }),
    });
  }
  return out;
}

export function StudiosView() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<StudioCity | null>(null);
  const [formula, setFormula] = useState<StudioFormulaId | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mobile-money" | "carte">("mobile-money");
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [occupiedSlugs, setOccupiedSlugs] = useState<Set<string>>(new Set());
  const days = useMemo(buildDays, []);

  // Chargement du planning réel pour bloquer les créneaux occupés
  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((d) => {
        const list: Booking[] = d.bookings ?? [];
        setBookings(list);
        setOccupiedSlugs(
          new Set(
            list
              .filter((b) => new Date(b.date) >= new Date())
              .map((b) => `${b.city}|${b.date}|${b.slot}`)
          )
        );
      })
      .catch(() => {});
  }, []);

  const isSlotTaken = (d: string, s: string) =>
    city ? occupiedSlugs.has(`${city}|${d}|${s}`) : false;

  const price = city && formula ? PRICES[city][formula] : 0;
  const formulaName = STUDIO_FORMULAS.find((f) => f.id === formula)?.name;
  const studio = STUDIOS.find((s) => s.id === city);

  const canNext =
    (step === 0 && city) ||
    (step === 1 && formula) ||
    (step === 2 && date && slot) ||
    step === 3;

  const submit = async () => {
    if (!clientName || !email.includes("@") || phone.length < 6) {
      toast({ title: "Formulaire incomplet", description: "Nom, email et téléphone sont requis." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          formula,
          date,
          slot,
          clientName,
          email,
          phone,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Créneau indisponible",
          description: data.error ?? "Choisissez un autre créneau.",
        });
        setStep(2);
        return;
      }
      setBookingRef(data.booking.id.slice(-6).toUpperCase());
      setStep(4);
      toast({
        title: "Réservation confirmée",
        description: "Un email de confirmation vient de vous être envoyé.",
      });
    } catch {
      toast({ title: "Erreur", description: "La réservation a échoué, réessayez." });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setCity(null);
    setFormula(null);
    setDate(null);
    setSlot(null);
    setClientName("");
    setEmail("");
    setPhone("");
    setBookingRef(null);
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-80 glow-top" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTag index="S" label="Portail de réservation" />
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            Réservez votre studio.
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-zinc-400">
            Cotonou ou Abidjan, audio ou 4K : choisissez votre ville, votre
            formule et votre créneau. Paiement Mobile Money ou carte bancaire.
          </p>
        </Reveal>

        {/* Indicateur d'étapes */}
        <Reveal delay={0.08}>
          <ol className="mt-10 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]">
            {STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 items-center gap-1.5 rounded-full border px-3 transition-colors",
                    i === step
                      ? "border-white bg-white text-black"
                      : i < step
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-white/10 text-zinc-600"
                  )}
                >
                  {i < step ? <Check className="size-3" /> : null}
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="hidden sm:block h-px w-4 bg-white/10" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* ─── Zone principale du tunnel ─────────────────────────────── */}
          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="card-shine min-h-[420px] rounded-2xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-md">
              {/* ÉTAPE 1 — Ville */}
              {step === 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="size-5" /> Dans quelle ville tournez-vous ?
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {STUDIOS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setCity(s.id)}
                        className={cn(
                          "group rounded-2xl border p-6 text-left transition-all",
                          city === s.id
                            ? "border-white bg-white/[0.07]"
                            : "border-white/10 hover:border-white/40 bg-black/50"
                        )}
                        aria-pressed={city === s.id}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-black font-mono text-sm font-bold text-white">
                            {s.flag}
                          </span>
                          <div>
                            <div className="text-lg font-bold text-white">{s.city}</div>
                            <div className="text-xs text-zinc-500">{s.country}</div>
                          </div>
                        </div>
                        <p className="mt-4 text-xs text-zinc-500">{s.address}</p>
                        <p className="mt-1 text-xs text-zinc-600">{s.capacity}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 — Formule */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-white">Choisissez votre formule</h2>
                  <div className="mt-6 space-y-4">
                    {STUDIO_FORMULAS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFormula(f.id)}
                        className={cn(
                          "w-full rounded-2xl border p-5 text-left transition-all",
                          formula === f.id
                            ? "border-white bg-white/[0.07]"
                            : "border-white/10 hover:border-white/40 bg-black/50"
                        )}
                        aria-pressed={formula === f.id}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            {f.id === "audio" ? (
                              <Mic className="mt-1 size-5 text-zinc-400" />
                            ) : f.id === "video4k" ? (
                              <Video className="mt-1 size-5 text-zinc-400" />
                            ) : (
                              <Check className="mt-1 size-5 text-zinc-400" />
                            )}
                            <div>
                              <div className="font-bold text-white">{f.name}</div>
                              <p className="mt-1 text-xs leading-relaxed text-zinc-400 max-w-md">
                                {f.description}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                {f.features.map((feat) => (
                                  <span key={feat} className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                                    <Check className="size-3" /> {feat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-lg font-bold text-white">
                              {formatCFA(PRICES[city ?? "cotonou"][f.id])}
                            </div>
                            <div className="text-[11px] text-zinc-500">/ {f.duration}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 — Créneau */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <CalendarDays className="size-5" /> Choisissez votre créneau
                  </h2>

                  {/* Jours */}
                  <div className="mt-6 flex gap-2.5 overflow-x-auto pb-2 scrollbar-dark">
                    {days.map((d) => (
                      <button
                        key={d.iso}
                        onClick={() => setDate(d.iso)}
                        className={cn(
                          "flex w-[76px] shrink-0 flex-col items-center rounded-xl border py-3 transition-all",
                          date === d.iso
                            ? "border-white bg-white text-black"
                            : "border-white/10 bg-black/50 text-zinc-400 hover:border-white/40"
                        )}
                        aria-pressed={date === d.iso}
                      >
                        <span className="text-[10px] uppercase tracking-wider opacity-70">
                          {d.weekday}
                        </span>
                        <span className="mt-0.5 text-lg font-bold">{d.day}</span>
                        <span className="text-[10px] uppercase opacity-70">{d.month}</span>
                      </button>
                    ))}
                  </div>

                  {/* Slots */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {BOOKING_SLOTS.map((s) => {
                      const taken = date ? isSlotTaken(date, s.slot) : false;
                      const allDayTaken =
                        date && BOOKING_SLOTS.every((x) => isSlotTaken(date, x.slot));
                      return (
                        <button
                          key={s.slot}
                          disabled={!date || taken}
                          onClick={() => setSlot(s.slot)}
                          className={cn(
                            "rounded-xl border p-4 text-left transition-all",
                            taken
                              ? "border-white/5 bg-black cursor-not-allowed opacity-40"
                              : slot === s.slot
                                ? "border-white bg-white/[0.07]"
                                : "border-white/10 bg-black/50 hover:border-white/40"
                          )}
                          aria-pressed={slot === s.slot}
                        >
                          <div className="flex items-center justify-between">
                            <Clock className="size-4 text-zinc-500" />
                            {taken ? (
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                                Complet
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-3 text-sm font-bold text-white">{s.slot}</div>
                          <div className="text-[11px] text-zinc-500">{s.label}</div>
                        </button>
                      );
                    })}
                  </div>
                  {date && (
                    <p className="mt-4 text-xs text-zinc-500">
                      Sélection du {formatDateFR(date)} — studio {studio?.city}.
                    </p>
                  )}
                </div>
              )}

              {/* ÉTAPE 4 — Coordonnées + paiement */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-white">Vos coordonnées &amp; paiement</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="bk-name" className="text-xs font-medium text-zinc-400">
                        Nom complet
                      </label>
                      <Input
                        id="bk-name"
                        placeholder="Ex. Serge Agbéto"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="h-11 rounded-xl bg-black/60 border-white/15"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="bk-email" className="text-xs font-medium text-zinc-400">
                        Email professionnel
                      </label>
                      <Input
                        id="bk-email"
                        type="email"
                        placeholder="vous@entreprise.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 rounded-xl bg-black/60 border-white/15"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="bk-phone" className="text-xs font-medium text-zinc-400">
                        Téléphone (Mobile Money)
                      </label>
                      <Input
                        id="bk-phone"
                        placeholder="+229 90 00 00 00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 rounded-xl bg-black/60 border-white/15"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs font-medium text-zinc-400">Méthode de paiement</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPaymentMethod("mobile-money")}
                          className={cn(
                            "flex h-11 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-all",
                            paymentMethod === "mobile-money"
                              ? "border-white bg-white/[0.07] text-white"
                              : "border-white/10 bg-black/50 text-zinc-500 hover:border-white/40"
                          )}
                          aria-pressed={paymentMethod === "mobile-money"}
                        >
                          <Smartphone className="size-4" /> Mobile Money
                        </button>
                        <button
                          onClick={() => setPaymentMethod("carte")}
                          className={cn(
                            "flex h-11 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-all",
                            paymentMethod === "carte"
                              ? "border-white bg-white/[0.07] text-white"
                              : "border-white/10 bg-black/50 text-zinc-500 hover:border-white/40"
                          )}
                          aria-pressed={paymentMethod === "carte"}
                        >
                          <CreditCard className="size-4" /> Carte
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[11px] leading-relaxed text-zinc-500">
                    {paymentMethod === "mobile-money"
                      ? "Vous recevrez une demande de paiement Mobile Money (MTN, Moov ou Wave) sur votre numéro."
                      : "Paiement sécurisé 3-D Secure : Visa, Mastercard, GIM-UEMOA acceptés."}
                  </p>
                </div>
              )}

              {/* ÉTAPE 5 — Confirmation */}
              {step === 4 && (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="size-14 text-white" />
                  <h2 className="mt-5 text-2xl font-bold text-white">
                    Studio réservé !
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                    Votre réservation <span className="font-mono text-zinc-200">PL-{bookingRef}</span>{" "}
                    est confirmée. Un email de confirmation avec les accès du
                    studio vient d&apos;être envoyé à {email}.
                  </p>
                  <div className="mt-6 grid w-full max-w-md gap-2 rounded-2xl border border-white/10 bg-black/60 p-5 text-left text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-500">Studio</span>
                      <span className="font-semibold text-white">{studio?.city}, {studio?.country}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-500">Formule</span>
                      <span className="font-semibold text-white">{formulaName}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-500">Date</span>
                      <span className="font-semibold text-white">{date ? formatDateFR(date) : ""}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-zinc-500">Créneau</span>
                      <span className="font-semibold text-white">{slot}</span>
                    </div>
                    <div className="mt-1 flex justify-between gap-2 border-t border-white/10 pt-3">
                      <span className="text-zinc-500">Montant payé</span>
                      <span className="font-bold text-white">{formatCFA(price)}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-6 rounded-xl" onClick={reset}>
                    Nouvelle réservation
                  </Button>
                </div>
              )}

              {/* Navigation du tunnel */}
              {step < 4 && (
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <Button
                    variant="ghost"
                    disabled={step === 0}
                    onClick={() => setStep((s) => s - 1)}
                    className="gap-2 text-zinc-400 hover:text-white"
                  >
                    <ArrowLeft className="size-4" /> Retour
                  </Button>
                  {step < 3 ? (
                    <Button
                      disabled={!canNext}
                      onClick={() => setStep((s) => s + 1)}
                      className="gap-2 rounded-xl font-semibold"
                    >
                      Continuer <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button disabled={loading} onClick={submit} className="gap-2 rounded-xl font-semibold">
                      {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                      Payer {formatCFA(price)}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Reveal>

          {/* ─── Récapitulatif latéral ─────────────────────────────────── */}
          <Reveal delay={0.18}>
            <aside className="card-shine sticky top-24 rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-md" aria-label="Récapitulatif de réservation">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Récapitulatif
              </h3>
              <dl className="mt-5 space-y-3.5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-zinc-500">Ville</dt>
                  <dd className="font-semibold text-white">
                    {studio ? `${studio.city}, ${studio.country}` : "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-zinc-500">Formule</dt>
                  <dd className="font-semibold text-white">{formulaName ?? "—"}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-zinc-500">Date</dt>
                  <dd className="font-semibold text-white">
                    {date ? formatDateFR(date) : "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-zinc-500">Créneau</dt>
                  <dd className="font-semibold text-white">{slot ?? "—"}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3.5">
                  <dt className="text-zinc-300 font-medium">Total</dt>
                  <dd className="text-lg font-bold text-white">
                    {price ? formatCFA(price) : "—"}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-[11px] leading-relaxed text-zinc-600">
                Annulation gratuite jusqu&apos;à 48h avant le tournage. Nos
                équipes techniques accueillent vos invités 30 minutes avant
                l&apos;enregistrement.
              </p>

              {/* Prochaines réservations (preuve sociale + créneaux occupés) */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                  Prochaines sessions
                </h4>
                <ul className="mt-3 max-h-44 space-y-2 overflow-y-auto scrollbar-dark pr-1">
                  {bookings.slice(0, 4).map((b) => (
                    <li
                      key={b.id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-black/60 px-3 py-2"
                    >
                      <div className="text-[11px]">
                        <div className="font-medium text-zinc-300">
                          {STUDIOS.find((s) => s.id === b.city)?.city} · {b.slot.split(" – ")[0]}
                        </div>
                        <div className="text-zinc-600">
                          {new Date(b.date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                        Occupé
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
