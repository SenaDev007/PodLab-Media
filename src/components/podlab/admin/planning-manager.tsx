"use client";

import { useCallback, useEffect, useState } from "react";
import { CalendarRange, Clock, CreditCard, Smartphone } from "lucide-react";
import { GlassCard } from "@/components/podlab/shared";
import { STUDIOS, formatCFA } from "@/lib/data-mock";
import type { Booking, StudioCity } from "@/types/podlab";
import { cn } from "@/lib/utils";

type CityFilter = "all" | StudioCity;

const CITY_FILTERS: Array<{ id: CityFilter; label: string }> = [
  { id: "all", label: "Tous les studios" },
  { id: "cotonou", label: "Cotonou" },
  { id: "abidjan", label: "Abidjan" },
];

export function PlanningManager({ onChanged }: { onChanged?: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<CityFilter>("all");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = bookings
    .filter((b) => filter === "all" || b.city === filter)
    .sort((a, b) => a.date.localeCompare(b.date));

  const upcoming = filtered.filter((b) => new Date(b.date) >= new Date(new Date().toDateString()));
  const revenue = filtered.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            <CalendarRange className="size-5" /> Planning des studios
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {upcoming.length} sessions à venir · {formatCFA(revenue)} de
            chiffre d&apos;affaires cumulé
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
      ) : filtered.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <CalendarRange className="size-8 mx-auto text-zinc-600" />
          <p className="mt-3 text-sm text-zinc-500">
            Aucune réservation pour ce filtre.
          </p>
        </GlassCard>
      ) : (
        <div className="max-h-[520px] space-y-3 overflow-y-auto scrollbar-dark pr-1">
          {filtered.map((b) => {
            const studio = STUDIOS.find((s) => s.id === b.city);
            const isPast = new Date(b.date) < new Date(new Date().toDateString());
            return (
              <GlassCard
                key={b.id}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-4 p-4 md:p-5",
                  isPast && "opacity-50"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Bloc date */}
                  <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-white/10 bg-black py-2">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                      {new Date(b.date).toLocaleDateString("fr-FR", { month: "short" })}
                    </span>
                    <span className="text-xl font-bold leading-none text-white">
                      {new Date(b.date).toLocaleDateString("fr-FR", { day: "2-digit" })}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-white">{b.clientName}</span>
                      <span className="rounded-md border border-white/10 bg-black px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                        {studio?.flag} {b.city}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">{b.formulaLabel}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> {b.slot}
                      </span>
                      <span className="flex items-center gap-1">
                        {b.paymentMethod === "mobile-money" ? (
                          <Smartphone className="size-3" />
                        ) : (
                          <CreditCard className="size-3" />
                        )}
                        {b.paymentMethod === "mobile-money" ? "Mobile Money" : "Carte"}
                      </span>
                      <span>{b.email}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-white">{formatCFA(b.amount)}</div>
                  <div
                    className={cn(
                      "mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                      isPast
                        ? "border border-white/10 text-zinc-500"
                        : "bg-white text-black"
                    )}
                  >
                    {isPast ? "Passé" : "Confirmé"}
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
