"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  BadgeCheck,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CountUp, GlassCard, Reveal, SectionTag } from "@/components/podlab/shared";
import { CountryFlag } from "@/components/podlab/flag";
import { STUDIOS, BOOKING_SLOTS, formatDateFR } from "@/lib/data-mock";
import { CONTACT } from "@/lib/brand";
import {
  PRESTIGE_GUESTS,
  VIP_FAQ,
  VIP_FORMATS,
  VIP_IMPACT,
} from "@/lib/invitation-data";
import { toast } from "@/hooks/use-toast";
import type { InvitationBooking, InvitationFormat, StudioCity } from "@/types/podlab";
import { cn } from "@/lib/utils";

// ─── Page Invitation VIP (/invitation) ───────────────────────────────────────
// Destination des invités de prestige : chiffres d'impact, galerie des grands
// visages déjà reçus, calendrier de réservation privé (référence immédiate,
// sans échange d'e-mails) et guide de préparation rassurant.

const DAYS_AHEAD = 21;

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

export function InvitationView() {
  // ── Réservation privée ──
  const days = useMemo(buildDays, []);
  const [city, setCity] = useState<StudioCity | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState<InvitationFormat>("standard");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<InvitationBooking | null>(null);
  const [occupied, setOccupied] = useState<Set<string>>(new Set());

  // Chargement du planning VIP réel pour bloquer les créneaux pris
  useEffect(() => {
    fetch("/api/invitations")
      .then((r) => r.json())
      .then((d) => {
        const list: InvitationBooking[] = d.invitations ?? [];
        setOccupied(
          new Set(
            list
              .filter((b) => new Date(b.date) >= new Date())
              .map((b) => `${b.city}|${b.date}|${b.slot}`)
          )
        );
      })
      .catch(() => {});
  }, []);

  const isTaken = (d: string, s: string) =>
    city ? occupied.has(`${city}|${d}|${s}`) : false;

  const studio = STUDIOS.find((s) => s.id === city);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const submit = async () => {
    if (!city || !date || !slot) {
      toast({
        variant: "destructive",
        title: "Créneau manquant",
        description: "Choisissez votre studio, une date et un créneau.",
      });
      return;
    }
    if (!guestName.trim() || guestName.trim().length < 2) {
      toast({ variant: "destructive", title: "Nom requis", description: "Renseignez votre nom complet." });
      return;
    }
    if (!email.includes("@")) {
      toast({ variant: "destructive", title: "Email invalide", description: "Renseignez une adresse email valide." });
      return;
    }
    if (phone.trim().length < 6) {
      toast({ variant: "destructive", title: "Téléphone requis", description: "Pour vous rappeler sous 24 h." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          date,
          slot,
          guestName: guestName.trim(),
          role: role.trim() || null,
          email: email.trim(),
          phone: phone.trim(),
          topic: topic.trim() || null,
          format,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setOccupied((prev) => new Set(prev).add(`${city}|${date}|${slot}`));
          setSlot(null);
        }
        throw new Error(data.error ?? "Réservation impossible");
      }
      setDone(data.invitation as InvitationBooking);
      toast({
        title: "Créneau bloqué",
        description: `Référence ${data.invitation.ref} — notre rédaction vous appelle sous 24 h.`,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: e instanceof Error ? e.message : "Réessayez dans un instant.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setDone(null);
    setSlot(null);
    setDate(null);
    setCity(null);
  };

  return (
    <div className="relative">
      {/* ══════════════ HERO — ACCUEIL DE L'INVITÉ ══════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[460px] glow-top" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-14 md:pt-40 md:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-zinc-950/80 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur"
          >
            <Sparkles className="size-3.5" />
            <span className="font-semibold uppercase tracking-[0.18em]">
              Accès prioritaire — Invitation personnelle
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-gradient"
          >
            Vous êtes attendu(e)
            <br />
            sur le plateau PodLab.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-400"
          >
            Moins de 3 % des personnalités qui sollicitent un passage obtiennent
            une invitation. <span className="text-zinc-200">Votre segment d&apos;épisode est déjà réservé</span> — il ne reste qu&apos;à choisir votre créneau.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("calendrier")}
              className="w-full gap-2 rounded-xl px-8 h-12 text-sm font-semibold shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-6px_rgba(255,255,255,0.55)] transition-shadow sm:w-auto"
            >
              <CalendarCheck className="size-4" />
              Réserver mon passage
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("impact")}
              className="w-full gap-2 rounded-xl px-8 h-12 text-sm font-semibold border-white/20 hover:bg-white/10 sm:w-auto"
            >
              L&apos;audience que je toucherai <ArrowDown className="size-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="size-3.5" /> Référence de confirmation immédiate
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" /> Aucun échange d&apos;e-mails requis
            </span>
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="size-3.5" /> Vous validez la vidéo avant publication
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ 01 — CHIFFRES D'IMPACT ══════════════ */}
      <section id="impact" className="relative scroll-mt-20 border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTag index="01" label="Chiffres d'impact — pourquoi ce plateau" />
            <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white">
              Parler sur PodLab, c&apos;est s&apos;adresser{" "}
              <span className="text-zinc-500">à la salle des décideurs.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-zinc-400">
              Chaque épisode de « Discussion Informelle » est écouté jusqu&apos;au
              bout par une audience rare : cadres, fondateurs, investisseurs.
              Voici ce que vos 60 minutes de plateau deviennent entre nos mains.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <GlassCard className="p-5">
                <div className="text-3xl font-bold tracking-tight text-white tabular-nums">
                  <CountUp to={VIP_IMPACT.completionRate} suffix=" %" />
                </div>
                <div className="mt-2 text-sm font-medium text-zinc-300">de taux de complétion</div>
                <div className="mt-1 text-xs text-zinc-500">
                  Moyenne secteur des interviews longues : ~45 %. Votre message est écouté jusqu&apos;au bout.
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="text-3xl font-bold tracking-tight text-white tabular-nums">
                  <CountUp to={VIP_IMPACT.attentionMinutes} format="compact" suffix=" min" />
                </div>
                <div className="mt-2 text-sm font-medium text-zinc-300">d&apos;attention par épisode</div>
                <div className="mt-1 text-xs text-zinc-500">
                  Près de deux heures de temps de cerveau disponible, pas trois secondes de scroll.
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="text-3xl font-bold tracking-tight text-white tabular-nums">
                  <CountUp to={VIP_IMPACT.listenersPerQuarter} format="compact" prefix="+" />
                </div>
                <div className="mt-2 text-sm font-medium text-zinc-300">écoutes / trimestre</div>
                <div className="mt-1 text-xs text-zinc-500">
                  Podcast business n°1 au Bénin, 2ᵉ d&apos;Afrique de l&apos;Ouest.
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="text-3xl font-bold tracking-tight text-white tabular-nums">
                  <CountUp to={128_000} format="compact" />
                </div>
                <div className="mt-2 text-sm font-medium text-zinc-300">décideurs abonnés</div>
                <div className="mt-1 text-xs text-zinc-500">
                  Dirigeants, fondateurs, créatifs et investisseurs — 14 pays d&apos;écoute.
                </div>
              </GlassCard>
            </div>
          </Reveal>

          {/* Profil des auditeurs — barres monochromes */}
          <Reveal delay={0.12}>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <GlassCard className="p-6 md:p-7">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
                  Profil des auditeurs
                </h3>
                <div className="mt-5 space-y-4">
                  {VIP_IMPACT.audienceProfile.map((row, i) => (
                    <div key={row.label}>
                      <div className="flex items-baseline justify-between gap-3 text-xs">
                        <span className="text-zinc-300">{row.label}</span>
                        <span className="font-bold tabular-nums text-white">{row.pct} %</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                          className="h-full rounded-full bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] leading-relaxed text-zinc-500">
                  78 % de l&apos;audience cumule des postes de décision — la
                  communauté d&apos;affaires la plus concentrée du média
                  francophone africain. Moyennes internes 12 derniers mois.
                </p>
              </GlassCard>

              <GlassCard className="p-6 md:p-7">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-400">
                  Où votre épisode sera écouté
                </h3>
                <div className="mt-5 space-y-4">
                  {VIP_IMPACT.geographies.map((row, i) => (
                    <div key={row.label}>
                      <div className="flex items-baseline justify-between gap-3 text-xs">
                        <span className="text-zinc-300">{row.label}</span>
                        <span className="font-bold tabular-nums text-white">{row.pct} %</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                          className="h-full rounded-full bg-zinc-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] leading-relaxed text-zinc-500">
                  Deux studios d&apos;ancrage —{" "}
                  <span className="inline-flex translate-y-[2px] items-center gap-1.5 text-zinc-400">
                    Cotonou
                    <CountryFlag code="BJ" className="h-2.5 w-4 rounded-[2px]" /> et Abidjan
                    <CountryFlag code="CI" className="h-2.5 w-4 rounded-[2px]" />
                  </span>{" "}
                  — pour un rayonnement régional : Sénégal, Togo, Cameroun,
                  France et diaspora.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ 02 — GALERIE DE PRESTIGE ══════════════ */}
      <section id="prestige" className="scroll-mt-20 border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionTag index="02" label="Galerie de prestige — le plateau déjà trusté" />
            <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white">
              Les grands visages déjà passés{" "}
              <span className="text-zinc-500">sur le plateau.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Bâtisseurs d&apos;empires, stars du showbiz, sportifs
              internationaux : chaque saison, les personnalités qui comptent
              choisissent PodLab pour la conversation sans filtre.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRESTIGE_GUESTS.map((guest, i) => (
              <Reveal key={guest.videoId} delay={Math.min(i, 4) * 0.06}>
                <a
                  href={`https://www.youtube.com/watch?v=${guest.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group card-shine block overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md transition-colors hover:border-white/25"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={`https://i.ytimg.com/vi/${guest.videoId}/hqdefault.jpg`}
                      alt={`Passage de ${guest.name} sur PodLab`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover grayscale contrast-110 opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                    <span className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                      <ExternalLink className="size-3.5" />
                    </span>
                    <div className="absolute bottom-3 left-3.5 right-3.5">
                      <div className="text-sm font-bold tracking-tight text-white">
                        {guest.name}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] leading-relaxed text-zinc-500">
                      {guest.role}
                    </p>
                    <p className="mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors group-hover:text-white">
                      Voir l&apos;épisode
                      <ExternalLink className="size-3" />
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 03 — CALENDRIER DE RÉSERVATION PRIVÉ ══════════════ */}
      <section id="calendrier" className="scroll-mt-20 border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <SectionTag index="03" label="Calendrier de réservation privé" />
            <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white">
              Choisissez votre créneau.{" "}
              <span className="text-zinc-500">Il est bloqué à l&apos;instant.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Pas d&apos;allers-retours d&apos;e-mails : sélectionnez ville, date
              et créneau, laissez vos coordonnées — votre référence VIP est
              générée immédiatement et notre rédaction vous appelle sous 24 h
              pour affiner le déroulé.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="mt-10 p-6 md:p-8">
              {done ? (
                /* ── Confirmation immédiate — référence VIP ── */
                <div className="py-4 text-center">
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">
                    Votre créneau est bloqué, {done.guestName.split(" ")[0]}.
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                    Référence de confirmation générée à l&apos;instant — aucun
                    e-mail à échanger. Notre rédaction vous appelle sous 24 h
                    ouvrées pour affiner le déroulé de votre interview.
                  </p>

                  <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-black/60 p-5 text-left">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Référence VIP
                      </span>
                      <span className="rounded-md bg-white px-3 py-1 font-mono text-xs font-bold tracking-wider text-black">
                        {done.ref}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2.5 text-sm">
                      <div className="flex items-center gap-2.5 text-zinc-200">
                        <MapPin className="size-4 shrink-0 text-zinc-500" />
                        <span className="font-semibold">
                          {done.city === "cotonou" ? "Cotonou" : "Abidjan"}
                        </span>
                        <span className="text-zinc-500">
                          ·{" "}
                          {STUDIOS.find((s) => s.id === done.city)?.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-200">
                        <CalendarCheck className="size-4 shrink-0 text-zinc-500" />
                        <span className="font-semibold capitalize">
                          {formatDateFR(done.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-zinc-200">
                        <Clock className="size-4 shrink-0 text-zinc-500" />
                        <span className="font-semibold">{done.slot}</span>
                        <span className="text-zinc-500">
                          ·{" "}
                          {VIP_FORMATS.find((f) => f.id === done.format)?.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/20 hover:bg-white/10"
                      onClick={() =>
                        window.open(CONTACT.whatsapp, "_blank", "noreferrer")
                      }
                    >
                      <Phone className="size-4" /> Une urgence ? WhatsApp studio
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-zinc-400 hover:text-white"
                      onClick={resetAll}
                    >
                      Modifier mon créneau
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Étape A — Ville */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">1</span>
                      <h3 className="text-sm font-bold text-white">Dans quel studio souhaitez-vous venir ?</h3>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {STUDIOS.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setCity(s.id);
                            setSlot(null);
                          }}
                          aria-pressed={city === s.id}
                          className={cn(
                            "flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all",
                            city === s.id
                              ? "border-white bg-white/[0.07]"
                              : "border-white/10 bg-black/50 hover:border-white/40"
                          )}
                        >
                          <span className="block size-11 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black">
                            <CountryFlag code={s.flag} cover className="h-full w-full" />
                          </span>
                          <span>
                            <span className="block text-base font-bold text-white">
                              {s.city}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-zinc-500">
                              {s.country} — {s.address}
                            </span>
                          </span>
                          {city === s.id && (
                            <Check className="ml-auto size-4 shrink-0 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Étape B — Date */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">2</span>
                      <h3 className="text-sm font-bold text-white">Choisissez votre date</h3>
                    </div>
                    <div className="mt-4 flex gap-2.5 overflow-x-auto pb-2 scrollbar-dark">
                      {days.map((d) => (
                        <button
                          key={d.iso}
                          onClick={() => {
                            setDate(d.iso);
                            setSlot(null);
                          }}
                          disabled={!city}
                          aria-pressed={date === d.iso}
                          className={cn(
                            "flex w-[64px] shrink-0 flex-col items-center rounded-xl border px-2 py-3 transition-all",
                            !city && "cursor-not-allowed opacity-30",
                            date === d.iso
                              ? "border-white bg-white text-black"
                              : "border-white/10 bg-black/50 text-zinc-300 hover:border-white/40"
                          )}
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                            {d.weekday}
                          </span>
                          <span className="mt-1 text-lg font-bold leading-none">{d.day}</span>
                          <span className="mt-1 text-[10px] uppercase opacity-70">{d.month}</span>
                        </button>
                      ))}
                    </div>
                    {!city && (
                      <p className="mt-2 text-[11px] text-zinc-600">
                        Sélectionnez d&apos;abord un studio ci-dessus.
                      </p>
                    )}
                  </div>

                  {/* Étape C — Créneau */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">3</span>
                      <h3 className="text-sm font-bold text-white">Choisissez votre créneau</h3>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {BOOKING_SLOTS.map((s) => {
                        const taken = date ? isTaken(date, s.slot) : false;
                        return (
                          <button
                            key={s.slot}
                            onClick={() => setSlot(s.slot)}
                            disabled={!date || taken}
                            aria-pressed={slot === s.slot}
                            className={cn(
                              "rounded-xl border p-4 text-left transition-all",
                              (!date || taken) && "cursor-not-allowed opacity-30",
                              slot === s.slot
                                ? "border-white bg-white/[0.07]"
                                : "border-white/10 bg-black/50 hover:border-white/40"
                            )}
                          >
                            <div className="text-sm font-bold text-white">{s.label}</div>
                            <div className="mt-1 text-xs tabular-nums text-zinc-500">{s.slot}</div>
                            {taken && (
                              <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                                Créneau pris
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Étape D — Coordonnées invité */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">4</span>
                      <h3 className="text-sm font-bold text-white">Vos coordonnées d&apos;invité</h3>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Input
                        placeholder="Nom complet *"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                      />
                      <Input
                        placeholder="Fonction / entreprise"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                      />
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                      />
                      <Input
                        type="tel"
                        placeholder="Téléphone (WhatsApp) *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 rounded-lg border-white/15 bg-black/60 text-sm"
                      />
                      <div className="sm:col-span-2">
                        <Textarea
                          placeholder="Sujet que vous souhaitez aborder (libre — nos questions restent surprises)"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="min-h-[76px] rounded-lg border-white/15 bg-black/60 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Étape E — Format d'interview */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">5</span>
                      <h3 className="text-sm font-bold text-white">Format d&apos;interview souhaité</h3>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {VIP_FORMATS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setFormat(f.id)}
                          aria-pressed={format === f.id}
                          className={cn(
                            "rounded-2xl border p-4 text-left transition-all",
                            format === f.id
                              ? "border-white bg-white/[0.07]"
                              : "border-white/10 bg-black/50 hover:border-white/40"
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-white">{f.label}</span>
                            {format === f.id && <Check className="size-4 shrink-0 text-white" />}
                          </div>
                          <div className="mt-1 text-[11px] font-medium text-zinc-400">{f.duration}</div>
                          <div className="mt-2 text-[11px] leading-relaxed text-zinc-500">{f.detail}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA final */}
                  <div className="border-t border-white/10 pt-6">
                    <Button
                      size="lg"
                      onClick={submit}
                      disabled={loading}
                      className="h-12 w-full gap-2 rounded-xl text-sm font-semibold shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)]"
                    >
                      {loading ? (
                        "Blocage du créneau en cours…"
                      ) : (
                        <>
                          <Zap className="size-4" />
                          Confirmer mon passage — référence immédiate
                        </>
                      )}
                    </Button>
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-500">
                      <ShieldCheck className="size-3.5" />
                      Coordonnées chiffrées, jamais revendues — appel de la rédaction sous 24 h.
                    </p>
                  </div>
                </div>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ 04 — GUIDE DE PRÉPARATION (FAQ) ══════════════ */}
      <section id="guide" className="scroll-mt-20 border-t border-white/10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <SectionTag index="04" label="Guide de préparation — l'essentiel avant le plateau" />
            <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl font-bold tracking-tight text-white">
              Tout ce qu&apos;il faut savoir,{" "}
              <span className="text-zinc-500">en 2 minutes.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              Durée, ton, maquillage, sécurité de vos données : les réponses
              courtes pour arriver serein(e). Le reste, on s&apos;en occupe.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="mt-8">
              {VIP_FAQ.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${i}`}
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-white hover:no-underline hover:text-zinc-300 [&>svg]:text-zinc-500">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-zinc-400">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ BANDE CONTACT DIRECT ══════════════ */}
      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <GlassCard className="flex flex-col items-center justify-between gap-6 p-6 text-center md:flex-row md:p-8 md:text-left">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Une question avant de réserver ?
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500">
                  La rédaction répond directement — sans standard, sans
                  secrétaire, sans attente.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl border-white/20 hover:bg-white/10"
                  onClick={() => window.open(CONTACT.whatsapp, "_blank", "noreferrer")}
                >
                  <Phone className="size-4" /> {CONTACT.phoneDisplay}
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl border-white/20 hover:bg-white/10"
                  onClick={() => (window.location.href = CONTACT.mailto)}
                >
                  <Mail className="size-4" /> {CONTACT.email}
                </Button>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
