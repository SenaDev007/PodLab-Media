"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarRange,
  Clapperboard,
  Crown,
  ExternalLink,
  KanbanSquare,
  Loader2,
  Lock,
  LogOut,
  Mail,
  SlidersHorizontal,
  Star,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountUp, GlassCard, SectionTag } from "@/components/podlab/shared";
import { EpisodesCms } from "./episodes-cms";
import { PlanningManager } from "./planning-manager";
import { CrmKanban } from "./crm-kanban";
import { AudienceManager } from "./audience-manager";
import { AnalyticsPanel } from "./analytics-panel";
import { SiteStatsManager } from "./site-stats-manager";
import { TicketsManager } from "./tickets-manager";
import { formatCFA } from "@/lib/data-mock";
import type { AdminStats } from "@/types/podlab";

/**
 * Back-office PodLab Media — architecture alignée sur WinAgro :
 * authentification dédiée (proxy → /admin/login), analytics d'audience 30 j
 * trackées depuis le site public, CRM sponsoring, CMS épisodes, planning
 * studios, billetterie & VIP, audience newsletter et chiffres clés du site
 * public pilotés en direct.
 *
 * Le contrôle d'accès est double : proxy.ts protège la route /admin, et cette
 * vue vérifie elle-même la session (le site utilise aussi un routeur hash
 * #/admin qui ne repasse pas par le proxy).
 */

const EMPTY_STATS: AdminStats = {
  subscribers: 0,
  leads: 0,
  leadsByStatus: { nouveau: 0, kit_envoye: 0, rdv_cale: 0, devis: 0, signe: 0 },
  highPriority: 0,
  bookings: 0,
  tickets: 0,
  revenueBookings: 0,
  revenueTickets: 0,
};

type Gate = "checking" | "locked" | "authed";

export function AdminView() {
  const [gate, setGate] = useState<Gate>("checking");
  const [stats, setStats] = useState<AdminStats>(EMPTY_STATS);
  const [liveNow, setLiveNow] = useState(0);

  // Vérification de session (route hash #/admin hors proxy)
  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then((d) => setGate(d.authenticated ? "authed" : "locked"))
      .catch(() => setGate("locked"));
  }, []);

  const load = useCallback(async () => {
    try {
      const [rs, ra] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/analytics"),
      ]);
      if (rs.ok) {
        const d = await rs.json();
        if (d.stats) setStats(d.stats);
      }
      if (ra.ok) {
        const a = await ra.json();
        setLiveNow(a?.totals?.live ?? 0);
      }
    } catch {
      // silencieux — l'admin affiche les valeurs par défaut
    }
  }, []);

  useEffect(() => {
    if (gate !== "authed") return;
    let active = true;
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        if (active && d.stats) setStats(d.stats);
      })
      .catch(() => {});
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        if (active) setLiveNow(d?.totals?.live ?? 0);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [gate]);

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" }).catch(() => {});
    window.location.href = "/admin/login";
  };

  // ─── Portail : session requise (route hash) ─────────────────────────────
  if (gate === "checking") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center pt-28">
        <p className="flex items-center gap-3 text-sm text-zinc-400">
          <Loader2 className="size-4 animate-spin" /> Vérification de la session…
        </p>
      </section>
    );
  }

  if (gate === "locked") {
    return (
      <section className="relative pt-28 pb-20 md:pt-36">
        <div className="absolute inset-0 bg-grid-sm" aria-hidden />
        <div className="relative mx-auto max-w-md px-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/80">
            <Lock className="size-6 text-zinc-300" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
            Espace Admin — connexion requise
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Le back-office PodLab est protégé : analytics d&apos;audience, CRM
            sponsoring, planning studios, billetterie et chiffres clés du site
            public. Identifiez-vous pour continuer.
          </p>
          <button
            onClick={() => {
              window.location.href = "/admin/login";
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
          >
            <Lock className="size-4" /> Accéder à la connexion sécurisée
          </button>
        </div>
      </section>
    );
  }

  // ─── Session authentifiée : tableau de bord complet ─────────────────────
  const kpis = [
    {
      icon: Activity,
      label: "Visiteurs en ligne",
      value: <CountUp to={liveNow} format="full" />,
      sub: "Heartbeat temps réel < 5 min",
      highlight: liveNow > 0,
    },
    {
      icon: Mail,
      label: "Abonnés Newsletter",
      value: <CountUp to={stats.subscribers} format="full" />,
      sub: "Base du PodLab Business Brief",
    },
    {
      icon: Users,
      label: "Leads Sponsoring",
      value: <CountUp to={stats.leads} format="full" />,
      sub: `${stats.highPriority} en priorité haute`,
      highlight: stats.highPriority > 0,
    },
    {
      icon: Clapperboard,
      label: "Sessions Studios",
      value: <CountUp to={stats.bookings} format="full" />,
      sub: `${formatCFA(stats.revenueBookings)} encaissés`,
    },
    {
      icon: BarChart3,
      label: "Billets Vendus",
      value: <CountUp to={stats.tickets} format="full" />,
      sub: `${formatCFA(stats.revenueTickets)} encaissés`,
    },
  ];

  return (
    <section className="relative pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 bg-grid-sm" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTag index="A" label="Back-office &amp; pipeline CRM" />
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Espace Admin
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
              Analytics d&apos;audience, CRM sponsoring B2B, CMS médias,
              planning des studios Cotonou &amp; Abidjan, billetterie et
              chiffres clés du site public — pilotés depuis un seul endroit.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1.5 text-[11px] text-zinc-400">
              <Star className="size-3 text-zinc-300" />
              Budgets &gt; 1 000 000 F CFA marqués automatiquement
            </span>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[11px] font-semibold text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="size-3" /> Voir le site public
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[11px] font-bold text-black transition-colors hover:bg-zinc-200"
            >
              <LogOut className="size-3" /> Déconnexion
            </button>
          </div>
        </div>

        {/* KPI */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
          {kpis.map((kpi) => (
            <GlassCard key={kpi.label} className="p-5">
              <div className="flex items-center justify-between">
                <kpi.icon className="size-4 text-zinc-500" />
                {kpi.highlight ? (
                  <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                    Live
                  </span>
                ) : null}
              </div>
              <div className="mt-3 text-2xl md:text-3xl font-bold tabular-nums text-white">
                {kpi.value}
              </div>
              <div className="mt-1 text-xs font-medium text-zinc-300">{kpi.label}</div>
              <div className="text-[11px] text-zinc-600">{kpi.sub}</div>
            </GlassCard>
          ))}
        </div>

        {/* Onglets back-office — 7 modules (structure WinAgro) */}
        <div className="mt-8">
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="glass h-11 w-full justify-start gap-1 overflow-x-auto rounded-xl p-1">
              {[
                { value: "analytics", icon: Activity, label: "Analytics" },
                { value: "crm", icon: KanbanSquare, label: "CRM Sponsoring" },
                { value: "episodes", icon: Clapperboard, label: "CMS Épisodes" },
                { value: "planning", icon: CalendarRange, label: "Planning Studios" },
                { value: "billetterie", icon: Crown, label: "Billetterie & VIP" },
                { value: "audience", icon: Mail, label: "Audience" },
                { value: "chiffres", icon: SlidersHorizontal, label: "Chiffres clés" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-semibold px-4"
                >
                  <Icon className="size-3.5" /> {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="analytics" className="mt-5">
              <AnalyticsPanel />
            </TabsContent>
            <TabsContent value="crm" className="mt-5">
              <CrmKanban onChanged={load} />
            </TabsContent>
            <TabsContent value="episodes" className="mt-5">
              <EpisodesCms />
            </TabsContent>
            <TabsContent value="planning" className="mt-5">
              <PlanningManager onChanged={load} />
            </TabsContent>
            <TabsContent value="billetterie" className="mt-5">
              <TicketsManager />
            </TabsContent>
            <TabsContent value="audience" className="mt-5">
              <AudienceManager onChanged={load} />
            </TabsContent>
            <TabsContent value="chiffres" className="mt-5">
              <SiteStatsManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
