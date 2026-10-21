"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Crown,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Ticket,
} from "lucide-react";
import { GlassCard } from "@/components/podlab/shared";
import { formatCFA } from "@/lib/data-mock";
import { CountryFlag } from "@/components/podlab/flag";
import type { TicketPurchase } from "@/types/podlab";

/**
 * Billetterie & Passages VIP — vue back-office pour les achats de billets
 * (TicketPurchase) et les invités de prestige venus passer à l'antenne
 * (InvitationBooking, page /invitation). Complète le planning studios.
 */

interface InvitationRow {
  id: string;
  city: "cotonou" | "abidjan";
  date: string;
  slot: string;
  guestName: string;
  role?: string | null;
  email: string;
  phone: string;
  topic?: string | null;
  format: string;
  ref: string;
  status: string;
  createdAt: string;
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function TicketsManager() {
  const [tickets, setTickets] = useState<TicketPurchase[]>([]);
  const [invitations, setInvitations] = useState<InvitationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (withSpin = false) => {
    if (withSpin) setRefreshing(true);
    try {
      const [rt, ri] = await Promise.all([
        fetch("/api/tickets"),
        fetch("/api/invitations"),
      ]);
      if (rt.ok) setTickets((await rt.json()).tickets ?? []);
      if (ri.ok) setInvitations((await ri.json()).invitations ?? []);
    } catch {
      // silencieux
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const ticketRevenue = useMemo(
    () => tickets.reduce((s, t) => s + t.amount, 0),
    [tickets]
  );
  const ticketCount = useMemo(
    () => tickets.reduce((s, t) => s + t.quantity, 0),
    [tickets]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 py-20 text-sm text-zinc-400">
        <Loader2 className="size-4 animate-spin" /> Chargement de la billetterie…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI billetterie */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <GlassCard className="p-5">
          <Ticket className="size-4 text-zinc-500" />
          <div className="mt-3 text-2xl font-bold tabular-nums text-white">{tickets.length}</div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Commandes de billets</div>
        </GlassCard>
        <GlassCard className="p-5">
          <Ticket className="size-4 text-zinc-500" />
          <div className="mt-3 text-2xl font-bold tabular-nums text-white">{ticketCount}</div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Billets vendus</div>
        </GlassCard>
        <GlassCard className="p-5">
          <Crown className="size-4 text-zinc-500" />
          <div className="mt-3 text-2xl font-bold tabular-nums text-white">{invitations.length}</div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Passages VIP à l&apos;antenne</div>
        </GlassCard>
        <GlassCard className="p-5">
          <Ticket className="size-4 text-zinc-300" />
          <div className="mt-3 text-lg font-bold tabular-nums text-white md:text-2xl">
            {formatCFA(ticketRevenue)}
          </div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Recettes billetterie</div>
        </GlassCard>
      </div>

      {/* Ventes de billets */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Ticket className="size-4" /> Ventes de billets — masterclasses &amp; enregistrements publics
          </h3>
          <button
            onClick={() => load(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className={`size-3 ${refreshing ? "animate-spin" : ""}`} /> Actualiser
          </button>
        </div>

        {tickets.length === 0 ? (
          <p className="mt-4 text-xs text-zinc-500">Aucune vente enregistrée.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  <th className="pb-3 pr-4 font-semibold">Événement</th>
                  <th className="pb-3 pr-4 font-semibold">Acheteur</th>
                  <th className="pb-3 pr-4 font-semibold">Contact</th>
                  <th className="pb-3 pr-4 font-semibold">Qté</th>
                  <th className="pb-3 pr-4 font-semibold">Montant</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 text-zinc-300">
                    <td className="py-3 pr-4 font-semibold text-white">{t.eventName}</td>
                    <td className="py-3 pr-4">{t.buyerName}</td>
                    <td className="py-3 pr-4 text-zinc-500">
                      <a href={`mailto:${t.email}`} className="hover:text-white">{t.email}</a>
                    </td>
                    <td className="py-3 pr-4 tabular-nums">{t.quantity}</td>
                    <td className="py-3 pr-4 font-semibold tabular-nums text-white">{formatCFA(t.amount)}</td>
                    <td className="py-3 text-zinc-500">{formatDate(t.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Passages VIP */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
        <h3 className="flex items-center gap-2 text-sm font-bold text-white">
          <Crown className="size-4" /> Passages VIP à l&apos;antenne — page /invitation
        </h3>
        {invitations.length === 0 ? (
          <p className="mt-4 text-xs text-zinc-500">Aucun passage VIP planifié.</p>
        ) : (
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {invitations.map((inv) => (
              <div
                key={inv.id}
                className="rounded-xl border border-white/10 bg-black/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-white">{inv.guestName}</p>
                    <p className="mt-0.5 text-[11px] text-zinc-500">{inv.role}</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                    <CountryFlag code={inv.city === "cotonou" ? "BJ" : "CI"} className="size-3" cover />
                    {inv.city === "cotonou" ? "Cotonou" : "Abidjan"}
                  </span>
                </div>
                <div className="mt-3 grid gap-1.5 text-[11px] text-zinc-500">
                  <span>
                    {formatDate(inv.date)} · {inv.slot} · format {inv.format}
                  </span>
                  {inv.topic && <span className="italic">« {inv.topic} »</span>}
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <a href={`mailto:${inv.email}`} className="inline-flex items-center gap-1 hover:text-white">
                      <Mail className="size-3" /> {inv.email}
                    </a>
                    <a href={`tel:${inv.phone}`} className="inline-flex items-center gap-1 hover:text-white">
                      <Phone className="size-3" /> {inv.phone}
                    </a>
                  </span>
                </div>
                <p className="mt-3 inline-block rounded-md border border-white/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-zinc-400">
                  RÉF. {inv.ref}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
