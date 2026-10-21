"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Globe2,
  Laptop,
  Loader2,
  MonitorSmartphone,
  MousePointerClick,
  RefreshCw,
  Smartphone,
  Tablet,
  Target,
  Users,
} from "lucide-react";
import { GlassCard } from "@/components/podlab/shared";

/**
 * Panneau Analytics du back-office — mêmes agrégats que le dashboard WinAgro :
 * courbe d'audience 30 jours, pages les plus vues, canaux d'acquisition,
 * campagnes UTM, appareils, navigateurs, géographie, visiteurs en ligne et
 * tunnel de conversion first-party.
 */

interface DayPoint {
  date: string;
  views: number;
  visitors: number;
}
interface Slice {
  label: string;
  count: number;
}
interface AnalyticsPayload {
  days: DayPoint[];
  totals: {
    views: number;
    uniqueVisitors: number;
    live: number;
    subscribers30: number;
    leads30: number;
    bookings30: number;
    tickets30: number;
  };
  topPages: Slice[];
  channels: Slice[];
  campaigns: Slice[];
  devices: Slice[];
  browsers: Slice[];
  countries: Slice[];
  funnel: Array<{ label: string; value: number }>;
}

const EMPTY: AnalyticsPayload = {
  days: [],
  totals: {
    views: 0,
    uniqueVisitors: 0,
    live: 0,
    subscribers30: 0,
    leads30: 0,
    bookings30: 0,
    tickets30: 0,
  },
  topPages: [],
  channels: [],
  campaigns: [],
  devices: [],
  browsers: [],
  countries: [],
  funnel: [],
};

const DEVICE_ICONS: Record<string, typeof Smartphone> = {
  Mobile: Smartphone,
  Desktop: Laptop,
  Tablet: Tablet,
};

function fmtDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(d);
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}

/** Barre horizontale — remplace tout graphique externe (design monochrome). */
function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.max(2, Math.round((value / max) * 100)) : 0;
  return (
    <li className="flex items-center gap-3">
      <span className="w-40 shrink-0 truncate text-xs text-zinc-400" title={label}>
        {label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-zinc-500 to-white"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-14 shrink-0 text-right text-xs font-semibold tabular-nums text-zinc-300">
        {fmtNumber(value)}
      </span>
    </li>
  );
}

export function AnalyticsPanel() {
  const [data, setData] = useState<AnalyticsPayload>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (withSpin = false) => {
    if (withSpin) setRefreshing(true);
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const d = await res.json();
        setData(d);
      }
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

  const maxDay = Math.max(1, ...data.days.map((d) => d.views));
  const funnelMax = Math.max(1, ...data.funnel.map((f) => f.value));

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 py-20 text-sm text-zinc-400">
        <Loader2 className="size-4 animate-spin" /> Chargement des analytics…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Résumé 30 jours */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <GlassCard className="p-5">
          <MousePointerClick className="size-4 text-zinc-500" />
          <div className="mt-3 text-2xl font-bold tabular-nums text-white">
            {fmtNumber(data.totals.views)}
          </div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Pages vues (30 j)</div>
          <div className="text-[11px] text-zinc-600">Toutes sections confondues</div>
        </GlassCard>
        <GlassCard className="p-5">
          <Users className="size-4 text-zinc-500" />
          <div className="mt-3 text-2xl font-bold tabular-nums text-white">
            {fmtNumber(data.totals.uniqueVisitors)}
          </div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Visiteurs uniques</div>
          <div className="text-[11px] text-zinc-600">Sessions distinctes</div>
        </GlassCard>
        <GlassCard className="p-5">
          <Activity className="size-4 text-zinc-300" />
          <div className="mt-3 flex items-baseline gap-2 text-2xl font-bold tabular-nums text-white">
            {fmtNumber(data.totals.live)}
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
          </div>
          <div className="mt-1 text-xs font-medium text-zinc-300">En ligne maintenant</div>
          <div className="text-[11px] text-zinc-600">Heartbeat &lt; 5 min</div>
        </GlassCard>
        <GlassCard className="p-5">
          <Target className="size-4 text-zinc-500" />
          <div className="mt-3 text-2xl font-bold tabular-nums text-white">
            {data.totals.subscribers30 > 0 ? "1" : "0"}
            <span className="text-base text-zinc-500"> / 3</span>
          </div>
          <div className="mt-1 text-xs font-medium text-zinc-300">Conversion site</div>
          <div className="text-[11px] text-zinc-600">
            Abonnés · leads · résa. sur 30 j
          </div>
        </GlassCard>
      </div>

      {/* Courbe 30 jours (barres natives — zéro dépendance) */}
      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <BarChart3 className="size-4" /> Courbe d&apos;audience — 30 derniers jours
          </h3>
          <button
            onClick={() => load(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className={`size-3 ${refreshing ? "animate-spin" : ""}`} />
            Actualiser
          </button>
        </div>
        <div className="mt-5 flex h-36 items-end gap-[3px]">
          {data.days.map((d) => (
            <div key={d.date} className="group relative flex-1">
              <div
                className="w-full rounded-t-sm bg-gradient-to-t from-zinc-700 to-white/90 transition-all group-hover:from-white group-hover:to-white"
                style={{ height: `${Math.max(3, (d.views / maxDay) * 132)}px` }}
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black px-2 py-1 text-[10px] text-zinc-300 group-hover:block">
                {fmtDate(d.date)} · {fmtNumber(d.views)} vues
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
          <span>{data.days[0] ? fmtDate(data.days[0].date) : ""}</span>
          <span>Aujourd&apos;hui</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pages les plus vues */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <MousePointerClick className="size-4" /> Pages les plus vues
          </h3>
          <ul className="mt-4 space-y-2.5">
            {data.topPages.map((p) => (
              <BarRow key={p.label} label={p.label} value={p.count} max={data.topPages[0]?.count ?? 1} />
            ))}
          </ul>
        </div>

        {/* Canaux d'acquisition */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Globe2 className="size-4" /> Canaux d&apos;acquisition
          </h3>
          <ul className="mt-4 space-y-2.5">
            {data.channels.map((c) => (
              <BarRow key={c.label} label={c.label} value={c.count} max={data.channels[0]?.count ?? 1} />
            ))}
          </ul>
        </div>

        {/* Campagnes UTM */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Target className="size-4" /> Campagnes marketing (UTM)
          </h3>
          {data.campaigns.length === 0 ? (
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              Aucune campagne trackée pour l&apos;instant — partagez des liens avec
              <code className="mx-1 rounded bg-white/5 px-1 py-0.5 text-[11px]">?utm_source=…&amp;utm_campaign=…</code>
              pour les mesurer.
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {data.campaigns.map((c) => (
                <BarRow key={c.label} label={c.label} value={c.count} max={data.campaigns[0]?.count ?? 1} />
              ))}
            </ul>
          )}
        </div>

        {/* Tunnel de conversion first-party */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Target className="size-4" /> Tunnel de conversion (30 j)
          </h3>
          <ul className="mt-4 space-y-2.5">
            {data.funnel.map((f) => (
              <BarRow key={f.label} label={f.label} value={f.value} max={funnelMax} />
            ))}
          </ul>
          <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
            Chaque étape est une donnée first-party réelle : visiteurs trackés,
            abonnés Business Brief, leads sponsoring, réservations studio et
            billets achetés.
          </p>
        </div>

        {/* Appareils + navigateurs */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <MonitorSmartphone className="size-4" /> Appareils &amp; navigateurs
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ul className="space-y-2.5">
              {data.devices.map((d) => {
                const Icon = DEVICE_ICONS[d.label] ?? MonitorSmartphone;
                return (
                  <li key={d.label} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-xs">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <Icon className="size-3.5 text-zinc-500" /> {d.label}
                    </span>
                    <span className="font-semibold tabular-nums text-white">{fmtNumber(d.count)}</span>
                  </li>
                );
              })}
            </ul>
            <ul className="space-y-2.5">
              {data.browsers.map((b) => (
                <li key={b.label} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-xs">
                  <span className="text-zinc-300">{b.label}</span>
                  <span className="font-semibold tabular-nums text-white">{fmtNumber(b.count)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Géographie */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur">
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Globe2 className="size-4" /> Villes &amp; pays d&apos;origine
          </h3>
          <ul className="mt-4 space-y-2.5">
            {data.countries.map((c) => (
              <BarRow key={c.label} label={c.label} value={c.count} max={data.countries[0]?.count ?? 1} />
            ))}
          </ul>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-zinc-600">
        Télémétrie collectée par le tracker PodLab posé sur toutes les pages du
        site public (pageviews + sessions actives + UTM), comme sur WinAgro.
        Aucune donnée revendue — mesure d&apos;audience first-party uniquement,
        hébergée dans la base PodLab. Les recettes réelles se lisent dans les
        onglets Planning Studios et Billetterie &amp; VIP.
      </p>
    </div>
  );
}
