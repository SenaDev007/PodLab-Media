"use client";

import { useCallback, useEffect, useState } from "react";
import { CalendarRange, Clock, CreditCard, Mic, Smartphone } from "lucide-react";
import { GlassCard } from "@/components/podlab/shared";
import { CountryFlag } from "@/components/podlab/flag";
import { STUDIOS, formatCFA } from "@/lib/data-mock";
import type { Booking, InvitationBooking, StudioCity } from "@/types/podlab";
import { cn } from "@/lib/utils";

type CityFilter = "all" | StudioCity;

const CITY_FILTERS: Array<{ id: CityFilter; label: string }> = [
  { id: "all", label: "Tous les studios" },
  { id: "cotonou", label: "Cotonou" },
  { id: "abidjan", label: "Abidjan" },
];

type PlanningItem =
  | { kind: "studio"; key: string; b: Booking }
  | { kind: "vip"; key: string; b: InvitationBooking };

export function PlanningManager({ onChanged }: { onChanged?: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invitations, setInvitations] = useState<InvitationBooking[]>([]);
  const [filter, setFilter] = useState<CityFilter>("all");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [resB, resI] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/invitations"),
      ]);
      const [dataB, dataI] = await Promise.all([resB.json(), resI.json()]);
      setBookings(dataB.bookings ?? []);
      setInvitations(dataI.invitations ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const all: PlanningItem[] = [
    ...bookings.map((b) => ({ kind: "studio" as const, key: b.id, b })),
    ...invitations.map((b) => ({ kind: "vip" as const, key: b.id, b })),
  ].filter((item) => filter === "all" || item.b.city === filter)
    .sort((a, b) => a.b.date.localeCompare(b.b.date));

  const upcoming = all.filter(
    ({ b }) => new Date(b.date) >= new Date(new Date().toDateString())
  );
  const revenue = bookings
    .filter((b) => filter === "all" || b.city === filter)
    .reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            <CalendarRange className="size-5" /> Planning des studios
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {upcoming.length} sessions à venir · {invitations.length} passage
            {invitations.length > 1 ? "s" : ""} VIP ·{" "}
            {formatCFA(revenue)} de CA studios cumulé
          </p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Filtrer par ville">
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
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl border border-white/5 bg-zinc-950/60"
            />
          ))}
        </div>
      ) : all.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <CalendarRange className="size-8 mx-auto text-zinc-600" />
          <p className="mt-3 text-sm text-zinc-500">
            Aucune réservation pour ce filtre.
          </p>
        </GlassCard>
      ) : (
        <div className="max-h-[520px] space-y-3 overflow-y-auto scrollbar-dark pr-1">
          {all.map((item) => {
            const studio = STUDIOS.find((s) => s.id === item.b.city);
            const isPast =
              new Date(item.b.date) < new Date(new Date().toDateString());
            const isVip = item.kind === "vip";
            const vip = isVip ? (item.b as InvitationBooking) : null;
            const studioBooking = !isVip ? (item.b as Booking) : null;
            const title = isVip
              ? vip!.guestName
              : studioBooking!.clientName;
            const subLabel = isVip
              ? `${vip!.role ? vip!.role + " · " : ""}${vip!.topic ? "« " + vip!.topic + " »" : "Sujet à définir"}`
              : studioBooking!.formulaLabel;

            return (
              <GlassCard
                key={item.key}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-4 p-4 md:p-5",
                  isPast && "opacity-50",
                  isVip && "border-white/20"
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
                <div className="text-right">
                  <div className="text-base font-bold text-white">
                    {isVip ? "Passage offert" : formatCFA(studioBooking!.amount)}
                  </div>
                  <div
                    className={cn(
                      "mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                      isPast
                        ? "border border-white/10 text-zinc-500"
                        : isVip
                          ? "border border-white/40 text-white"
                          : "bg-white text-black"
                    )}
                  >
                    {isPast ? "Passé" : isVip ? "Invitation VIP" : "Confirmé"}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
