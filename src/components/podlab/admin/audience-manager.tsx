"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Mail, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlassCard } from "@/components/podlab/shared";
import { toast } from "@/hooks/use-toast";
import type { Subscriber } from "@/types/podlab";
import { cn } from "@/lib/utils";

const SEGMENTS: Array<{ id: string; label: string }> = [
  { id: "all", label: "Tous" },
  { id: "entrepreneuriat", label: "Entrepreneuriat & Business" },
  { id: "finance", label: "Finance & Investissement" },
  { id: "success-stories", label: "Success Stories" },
  { id: "showbiz", label: "Musique & Showbiz" },
  { id: "societe", label: "Société & Révélations" },
  { id: "general", label: "Général" },
];

export function AudienceManager({ onChanged }: { onChanged?: () => void }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [segment, setSegment] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscribers");
      const data = await res.json();
      setSubscribers(data.subscribers ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () =>
      subscribers.filter((s) => {
        const matchSegment = segment === "all" || s.segment === segment;
        const q = query.trim().toLowerCase();
        const matchQuery =
          !q ||
          s.email.toLowerCase().includes(q) ||
          (s.name ?? "").toLowerCase().includes(q);
        return matchSegment && matchQuery;
      }),
    [subscribers, segment, query]
  );

  const exportCsv = () => {
    // Export serveur (CSV avec BOM Excel)
    window.location.href = "/api/subscribers/export";
    toast({
      title: "Export CSV lancé",
      description: `${filtered.length} contacts — téléchargement en cours.`,
    });
  };

  const segCount = (id: string) =>
    id === "all"
      ? subscribers.length
      : subscribers.filter((s) => s.segment === id).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">
            Base audience — Cercle Privé PodLab
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {subscribers.length} abonnés · segmentation par centres
            d&apos;intérêt et par source de capture
          </p>
        </div>
        <Button onClick={exportCsv} className="gap-2 rounded-xl font-semibold">
          <Download className="size-4" /> Export CSV
        </Button>
      </div>

      {/* Filtres de segmentation */}
      <div className="flex flex-wrap items-center gap-2">
        {SEGMENTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSegment(s.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all border",
              segment === s.id
                ? "bg-white text-black border-white"
                : "border-white/15 text-zinc-400 hover:text-white hover:border-white/40 bg-zinc-950/60"
            )}
            aria-pressed={segment === s.id}
          >
            {s.label} ({segCount(s.id)})
          </button>
        ))}
        <div className="relative ml-auto w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-600" />
          <Input
            placeholder="Rechercher un email ou nom…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 rounded-full bg-black/60 border-white/15 pl-9 text-xs"
            aria-label="Rechercher dans la base audience"
          />
        </div>
      </div>

      {/* Table des abonnés */}
      <GlassCard className="overflow-hidden">
        <div className="max-h-[480px] overflow-y-auto scrollbar-dark">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-zinc-400 text-[11px] uppercase tracking-wider">
                  Email
                </TableHead>
                <TableHead className="hidden md:table-cell text-zinc-400 text-[11px] uppercase tracking-wider">
                  Nom
                </TableHead>
                <TableHead className="text-zinc-400 text-[11px] uppercase tracking-wider">
                  Segment
                </TableHead>
                <TableHead className="hidden sm:table-cell text-zinc-400 text-[11px] uppercase tracking-wider">
                  Source
                </TableHead>
                <TableHead className="text-right text-zinc-400 text-[11px] uppercase tracking-wider">
                  Inscrit le
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i} className="border-white/5">
                    <TableCell colSpan={5} className="py-3.5">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-zinc-600">
                    Aucun abonné pour ce filtre.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => (
                  <TableRow
                    key={s.id}
                    className="border-white/5 hover:bg-white/[0.03]"
                  >
                    <TableCell className="py-3 text-xs font-medium text-zinc-200">
                      <span className="flex items-center gap-2">
                        <Mail className="size-3 shrink-0 text-zinc-600" />
                        {s.email}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell py-3 text-xs text-zinc-500">
                      {s.name ?? "—"}
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                        {SEGMENTS.find((x) => x.id === s.segment)?.label ?? s.segment}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell py-3 text-[11px] text-zinc-500">
                      {s.source === "episode-pdf" ? "Résumé PDF" : "Newsletter"}
                    </TableCell>
                    <TableCell className="py-3 text-right text-[11px] tabular-nums text-zinc-600">
                      {new Date(s.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" /> {filtered.length} contact(s) affiché(s)
          </span>
          <span>Export CSV prêt pour Mailchimp / Brevo</span>
        </div>
      </GlassCard>
    </div>
  );
}
