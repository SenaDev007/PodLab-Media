"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BarChart3,
  Clapperboard,
  CalendarRange,
  KanbanSquare,
  Mail,
  Star,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountUp, GlassCard, SectionTag } from "@/components/podlab/shared";
import { EpisodesCms } from "./episodes-cms";
import { PlanningManager } from "./planning-manager";
import { CrmKanban } from "./crm-kanban";
import { AudienceManager } from "./audience-manager";
import { formatCFA } from "@/lib/data-mock";
import type { AdminStats } from "@/types/podlab";

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

export function AdminView() {
  const [stats, setStats] = useState<AdminStats>(EMPTY_STATS);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.stats) setStats(data.stats);
    } catch {
      // silencieux — l'admin affiche les valeurs par défaut
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        if (active && d.stats) setStats(d.stats);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const kpis = [
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
        <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Espace Admin
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
              CMS médias, planning des studios Cotonou &amp; Abidjan, pipeline
              sponsoring B2B et base audience — pilotés depuis un seul endroit.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Star className="size-3.5 text-zinc-300" />
            Budgets &gt; 1 000 000 F CFA marqués automatiquement
          </div>
        </div>

        {/* KPI */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <GlassCard key={kpi.label} className="p-5">
              <div className="flex items-center justify-between">
                <kpi.icon className="size-4 text-zinc-500" />
                {kpi.highlight ? (
                  <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                    Hot
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

        {/* Onglets back-office */}
        <div className="mt-8">
          <Tabs defaultValue="crm" className="w-full">
            <TabsList className="glass h-11 w-full justify-start gap-1 overflow-x-auto rounded-xl p-1">
              <TabsTrigger
                value="crm"
                className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-semibold px-4"
              >
                <KanbanSquare className="size-3.5" /> CRM Sponsoring
              </TabsTrigger>
              <TabsTrigger
                value="episodes"
                className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-semibold px-4"
              >
                <Clapperboard className="size-3.5" /> CMS Épisodes
              </TabsTrigger>
              <TabsTrigger
                value="planning"
                className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-semibold px-4"
              >
                <CalendarRange className="size-3.5" /> Planning Studios
              </TabsTrigger>
              <TabsTrigger
                value="audience"
                className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400 text-xs font-semibold px-4"
              >
                <Mail className="size-3.5" /> Audience
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crm" className="mt-5">
              <CrmKanban onChanged={load} />
            </TabsContent>
            <TabsContent value="episodes" className="mt-5">
              <EpisodesCms />
            </TabsContent>
            <TabsContent value="planning" className="mt-5">
              <PlanningManager onChanged={load} />
            </TabsContent>
            <TabsContent value="audience" className="mt-5">
              <AudienceManager onChanged={load} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
