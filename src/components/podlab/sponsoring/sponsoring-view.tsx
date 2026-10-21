"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Download,
  Loader2,
  Megaphone,
  Sparkles,
  Target,
  Users,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import { BUDGET_OPTIONS, formatCFA } from "@/lib/data-mock";
import { CONTACT } from "@/lib/brand";
import { downloadPdf } from "@/lib/pdf";
import { downloadBackendPdf } from "@/lib/download";
import { toast } from "@/hooks/use-toast";
import type { BudgetRange } from "@/types/podlab";
import { cn } from "@/lib/utils";

const CPM_PODLAB = 2500; // F CFA pour 1000 écoutes qualifiées
const CPM_TV = 10000; // équivalent télévision/presse (4x)

// Objectifs ROI — copywriting §3.1 étape 2
const GOALS = [
  {
    id: "branding",
    label: "Branding & Notoriété Institutionnelle",
    description: "Aligner votre image sur les figures de haut niveau de PodLab.",
  },
  {
    id: "acquisition",
    label: "Acquisition de Clients B2B",
    description: "Générer des prises de contact qualifiées auprès des décideurs.",
  },
  {
    id: "lancement",
    label: "Lancement de Produit",
    description: "Dévoiler votre offre au cœur du temps d'attention de l'audience.",
  },
] as const;

// ─── Tunnel de qualification B2B — copywriting §3.1 (3 étapes) ───────────────
function SponsoringTunnel() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState<BudgetRange | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [highPriority, setHighPriority] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [rdvDay, setRdvDay] = useState<string | null>(null);
  const [rdvSlot, setRdvSlot] = useState<string | null>(null);
  const [rdvConfirmed, setRdvConfirmed] = useState(false);
  const [rdvLoading, setRdvLoading] = useState(false);

  const submit = async () => {
    if (!company || !contactName || !email.includes("@")) {
      toast({ variant: "destructive", title: "Formulaire incomplet", description: "Société, contact et email requis." });
      return;
    }
    setLoading(true);
    try {
      const goalLabel = GOALS.find((g) => g.id === goal)?.label;
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          contactName,
          email,
          phone: phone || null,
          budgetRange: budget,
          message: [goalLabel && `Objectif prioritaire : ${goalLabel}`, message]
            .filter(Boolean)
            .join(" — ") || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setHighPriority(data.highPriority);
      setLeadId(data.lead?.id ?? null);
      setStep(3);
      toast({
        title: "Demande envoyée",
        description: data.message,
      });
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Envoi impossible pour le moment, réessayez." });
    } finally {
      setLoading(false);
    }
  };

  // Prise de RDV directe avec la régie commerciale — cahier des charges §3.3
  // (« intégration directe de calendrier »). 6 prochains jours ouvrés,
  // 2 créneaux d'appel ; le lead passe automatiquement en « RDV Calé » CRM.
  const rdvDays = useMemo(() => {
    const days: Array<{ id: string; label: string }> = [];
    const d = new Date();
    while (days.length < 6) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0) continue; // dimanche : studio fermé
      const label = new Intl.DateTimeFormat("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(d);
      days.push({ id: label, label });
    }
    return days;
  }, []);
  const RDV_HOURS = ["10h00", "15h30"];

  const confirmRdv = async () => {
    if (!leadId || !rdvSlot) return;
    setRdvLoading(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rdvSlot }),
      });
      if (!res.ok) throw new Error();
      setRdvConfirmed(true);
      toast({
        title: "Rendez-vous calé !",
        description: `Appel de 30 min ${rdvSlot} — votre contact régie : ${CONTACT.phoneDisplay}.`,
      });
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de caler le RDV, réessayez." });
    } finally {
      setRdvLoading(false);
    }
  };

  const downloadMediaKit = async () => {
    // Kit Média généré par le backend — logo officiel embarqué, mise en page
    // professionnelle A4 (grille tarifaire incluse). Repli client si besoin.
    const delivered = await downloadBackendPdf(
      "/api/pdf/kit-media",
      "podlab-kit-media-2026.pdf"
    );
    if (delivered) return;
    downloadPdf(
      {
        brand: "PodLab Media — Kit Média 2026",
        title: "Kit Média & Grille Tarifaire 2026",
        subtitle: "1er Média Business d'Afrique francophone · 128 000 décideurs · 1 million d'écoutes par trimestre · 894 vidéos",
        sections: [
          {
            heading: "L'audience PodLab en bref",
            lines: [
              "• 128 000 décideurs abonnés · 1 million d'écoutes par trimestre",
              "• Dirigeants, investisseurs, cadres et entrepreneurs : 78% de l'audience",
              "• 14 pays : Côte d'Ivoire, Bénin, Sénégal, Togo, Cameroun en tête",
              "• 2 studios internationaux 4K Broadcast — Cotonou (Bénin) & Abidjan (Côte d'Ivoire)",
            ],
          },
          {
            heading: "Nos formats pour annonceurs",
            lines: [
              "• Mentions orales naturelles dans les épisodes (Finance, Success Stories, Entrepreneuriat, Showbiz)",
              "• Intégration vidéo 4K + extraits Shorts / Reels",
              "• Relais Newsletter B2B — PodLab Business Brief",
              "• Masterclass & enregistrements publics : speaking, stand, billetterie partenaire",
              "• Épisodes dédiés « Marque Story » produits en studio clé en main",
            ],
          },
          {
            heading: "Simulation de visibilité (calculateur)",
            lines: [
              "• CPM PodLab : 2 500 F CFA pour 1 000 écoutes qualifiées",
              "• Équivalent TV / presse : ~10 000 F CFA le CPM (4x plus cher)",
              "• 2 heures de temps d'attention moyen par épisode",
            ],
          },
        ],
        footer: `PodLab Media · ${CONTACT.email} · ${CONTACT.phoneDisplay} · Cotonou — Abidjan · Devis détaillé sur demande`,
      },
      "podlab-kit-media-2026.pdf"
    );
  };

  const canContinue =
    (step === 0 && budget !== null) ||
    (step === 1 && goal !== null) ||
    step === 2;

  return (
    <div className="card-shine rounded-2xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-md">
      {/* Progression du tunnel */}
      <div className="mb-6 flex items-center gap-2" aria-hidden>
        {["Budget", "Objectif ROI", "Coordonnées"].map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                step >= i ? "bg-white text-black" : "border border-white/15 text-zinc-500"
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider hidden sm:block",
                step >= i ? "text-zinc-200" : "text-zinc-600"
              )}
            >
              {label}
            </span>
            {i < 2 && (
              <span className={cn("h-px flex-1", step > i ? "bg-white/60" : "bg-white/10")} />
            )}
          </div>
        ))}
      </div>

      {/* ÉTAPE 1 — Qualification budgétaire (copywriting §3.1) */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Megaphone className="size-5" /> Quel est le budget mensuel
            alloué à votre visibilité ?
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            3 niveaux d&apos;engagement — un dispositif calibré pour chacun.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setBudget(opt.id)}
                className={cn(
                  "relative rounded-2xl border p-5 text-left transition-all",
                  budget === opt.id
                    ? "border-white bg-white/[0.07]"
                    : "border-white/10 hover:border-white/40 bg-black/50"
                )}
                aria-pressed={budget === opt.id}
              >
                {opt.id === "C" && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-white px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                    Priorité haute
                  </span>
                )}
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {opt.label}
                </div>
                <div className="mt-3 text-base font-bold text-white">{opt.range}</div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ÉTAPE 2 — Objectif ROI (copywriting §3.1) */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="size-5" /> Quel est votre objectif prioritaire ?
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Nous calibrons le dispositif (formats, épisodes, canaux) sur cet
            objectif.
          </p>
          <div className="mt-6 grid gap-4">
            {GOALS.map((g) => (
              <button
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all flex items-center gap-4",
                  goal === g.id
                    ? "border-white bg-white/[0.07]"
                    : "border-white/10 hover:border-white/40 bg-black/50"
                )}
                aria-pressed={goal === g.id}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl border",
                    goal === g.id
                      ? "border-white bg-white text-black"
                      : "border-white/15 text-zinc-400"
                  )}
                >
                  <Target className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">{g.label}</span>
                  <span className="mt-0.5 block text-xs text-zinc-500">{g.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ÉTAPE 3 — Coordonnées entreprise + déblocage Kit Média */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-white">Parlez-nous de votre marque</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Téléchargez immédiatement notre Kit Média &amp; Grille Tarifaire
            2026. Un responsable partenariats vous recontacte sous 24h ouvrées.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="sp-company" className="text-xs font-medium text-zinc-400">Société</label>
              <Input id="sp-company" placeholder="Ex. NSIA Banque" value={company} onChange={(e) => setCompany(e.target.value)} className="h-11 rounded-xl bg-black/60 border-white/15" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sp-contact" className="text-xs font-medium text-zinc-400">Contact référent</label>
              <Input id="sp-contact" placeholder="Ex. Linda Ekwa" value={contactName} onChange={(e) => setContactName(e.target.value)} className="h-11 rounded-xl bg-black/60 border-white/15" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sp-email" className="text-xs font-medium text-zinc-400">Email professionnel</label>
              <Input id="sp-email" type="email" placeholder="vous@societe.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl bg-black/60 border-white/15" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="sp-phone" className="text-xs font-medium text-zinc-400">Téléphone (optionnel)</label>
              <Input id="sp-phone" placeholder="+225 00 00 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl bg-black/60 border-white/15" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="sp-msg" className="text-xs font-medium text-zinc-400">Votre besoin (optionnel)</label>
              <Textarea id="sp-msg" placeholder="Objectif de campagne, cible, timing souhaité…" value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-24 rounded-xl bg-black/60 border-white/15 text-sm resize-none" />
            </div>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 — Confirmation + Kit Média débloqué */}
      {step === 3 && (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <CheckCircle2 className="size-14 text-white" />
          <h2 className="mt-5 text-2xl font-bold text-white">Demande enregistrée !</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
            {highPriority
              ? "Votre budget vous place en priorité commerciale haute : un conseiller senior PodLab vous rappelle sous 24h avec une proposition dédiée."
              : "Merci pour votre confiance. Un responsable partenariats vous recontacte sous 24h ouvrées."}
          </p>
          {highPriority && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
              <Sparkles className="size-3.5" /> Profil qualifié — priorité commerciale haute
            </div>
          )}
          {/* Kit Média débloqué automatiquement après validation */}
          <Button onClick={downloadMediaKit} className="mt-6 gap-2 rounded-xl h-12 px-6 font-semibold">
            <Download className="size-4" /> Télécharger le Kit Média 2026
          </Button>
          <p className="mt-3 text-[11px] text-zinc-600">
            Kit &amp; grille tarifaire débloqués immédiatement · créneaux de
            sponsoring strictement limités par saison
          </p>

          {/* ─── Calendrier de RDV direct avec la régie (§3.3) ─────────────── */}
          <div className="mt-10 w-full max-w-xl rounded-2xl border border-white/10 bg-black/60 p-6 text-left backdrop-blur">
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="size-4 text-white" />
              <h3 className="text-sm font-bold text-white">
                {rdvConfirmed ? "Rendez-vous confirmé" : "Planifier votre appel avec la régie commerciale"}
              </h3>
            </div>
            {rdvConfirmed ? (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-white" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {rdvSlot} — appel de 30 minutes
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                    Votre créneau est calé dans notre CRM. Un e-mail de
                    confirmation avec le lien visio arrive à l&apos;adresse
                    <span className="text-zinc-200"> {email || "renseignée"}</span>.
                    Urgence : {CONTACT.phoneDisplay}.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  Choisissez un jour ouvré et une heure d&apos;appel — votre
                  demande passe automatiquement en « RDV Calé » auprès de notre
                  régie. Priorité {highPriority ? "haute : conseiller senior dédié." : "standard : responsable partenariats."}
                </p>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Choisir le jour du rendez-vous">
                  {rdvDays.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => {
                        setRdvDay(day.id);
                        setRdvSlot(null);
                      }}
                      aria-pressed={rdvDay === day.id}
                      className={cn(
                        "min-w-[72px] shrink-0 rounded-xl border bg-black/60 px-3 py-2 text-center transition-colors",
                        rdvDay === day.id
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/30"
                      )}
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                        {day.label.split(" ")[0]}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-sm font-bold",
                          rdvDay === day.id ? "text-black bg-white rounded px-1" : "text-white"
                        )}
                      >
                        {day.label.split(" ")[1]}
                      </span>
                      <span className="block text-[10px] text-zinc-500">
                        {day.label.split(" ").slice(2).join(" ")}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {RDV_HOURS.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => {
                        if (!rdvDay) {
                          toast({
                            variant: "destructive",
                            title: "Choisissez d'abord un jour",
                            description: "Cliquez sur un jour ouvré ci-dessus.",
                          });
                          return;
                        }
                        setRdvSlot(`${rdvDay} · ${hour}`);
                      }}
                      className="rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                    >
                      <Clock3 className="mr-1.5 inline size-3.5" /> {hour}
                    </button>
                  ))}
                </div>
                {rdvSlot && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/80 p-3 text-center text-xs text-zinc-400">
                    Créneau sélectionné :{" "}
                    <span className="font-semibold text-white">{rdvSlot}</span>
                  </div>
                )}
                <Button
                  onClick={confirmRdv}
                  disabled={!rdvSlot || rdvLoading || !leadId}
                  className="mt-4 w-full gap-2 rounded-xl font-semibold"
                >
                  {rdvLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <CalendarCheck className="size-4" />
                  )}
                  Confirmer ce rendez-vous
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {step < 3 && (
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="gap-2 text-zinc-400 hover:text-white">
            <ArrowLeft className="size-4" /> Retour
          </Button>
          {step < 2 ? (
            <Button disabled={!canContinue} onClick={() => setStep((s) => s + 1)} className="gap-2 rounded-xl font-semibold">
              Continuer <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button disabled={loading} onClick={submit} className="gap-2 rounded-xl font-semibold">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <BadgeCheck className="size-4" />}
              Valider &amp; débloquer le Kit Média
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Calculateur de ROI de visibilité ────────────────────────────────────────
function RoiCalculator() {
  const [budget, setBudget] = useState(600_000);

  const reach = useMemo(
    () => Math.round((budget / CPM_PODLAB) * 1000),
    [budget]
  );
  const equivalentTvCost = useMemo(() => reach * (CPM_TV / 1000), [reach]);
  const savings = Math.max(0, equivalentTvCost - budget);

  return (
    <div className="card-shine rounded-2xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-md">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Users className="size-5" /> Simulez votre visibilité
      </h2>
      <p className="mt-2 text-sm text-zinc-500">
        Ajustez votre budget mensuel et comparez le coût réel pour 1 000
        écoutes qualifiées.
      </p>

      <div className="mt-8">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="roi-slider" className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Budget mensuel
          </label>
          <span className="text-2xl font-bold tabular-nums text-white">
            {formatCFA(budget)}
          </span>
        </div>
        <Slider
          id="roi-slider"
          value={[budget]}
          min={200_000}
          max={3_000_000}
          step={50_000}
          onValueChange={(v) => setBudget(v[0])}
          className="mt-5 [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-white"
        />
        <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
          <span>200 000 F CFA</span>
          <span>3 000 000 F CFA</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/60 p-5 text-center">
          <div className="text-2xl font-bold tabular-nums text-white">
            {new Intl.NumberFormat("fr-FR").format(reach)}
          </div>
          <div className="mt-1 text-[11px] leading-snug text-zinc-500">
            Écoutes qualifiées<br />estimées / mois
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/60 p-5 text-center">
          <div className="text-2xl font-bold tabular-nums text-white">2 500 F</div>
          <div className="mt-1 text-[11px] leading-snug text-zinc-500">
            Coût pour 1 000 écoutes<br />(CPM PodLab)
          </div>
        </div>
        <div className="rounded-xl border border-white/20 bg-white/[0.06] p-5 text-center">
          <div className="text-2xl font-bold tabular-nums text-white">
            -{formatCFA(savings)}
          </div>
          <div className="mt-1 text-[11px] leading-snug text-zinc-400">
            vs équivalent TV / presse<br />(~{formatCFA(Math.round(equivalentTvCost))})
          </div>
        </div>
      </div>

      <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
        Estimations basées sur les performances moyennes des campagnes PodLab
        2025-2026 (audience xUOA, 34% d&apos;engagement newsletter). Les
        dispositifs premium incluent également la présence événementielle
        (masterclass, enregistrements publics).
      </p>
    </div>
  );
}

// ─── Avantages annonceurs — copywriting §3 (3 bullets convertis) ────────────
const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Crédibilité Immédiate",
    text: "Alignez votre image sur des figures de haut niveau : Stanislas Zézé, Claudy Siar, Richard Odjrado.",
  },
  {
    icon: Clock3,
    title: "Engagement Maximisé",
    text: "2 heures de temps d'attention moyen par épisode, loin de la volatilité des réseaux sociaux.",
  },
  {
    icon: Share2,
    title: "Diffusion Multi-Canal",
    text: "Intégration vidéo 4K, mentions orales naturelles, extraits Shorts/Reels et relais Newsletter B2B.",
  },
];

// ─── Vue Sponsoring — copywriting §3 ─────────────────────────────────────────
export function SponsoringView() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-80 glow-top" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTag index="P" label="Sponsoring &amp; Partenariats B2B" />
          <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            Associez Votre Marque au Média d&apos;Affaires
            le Plus Influent de la Région.
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-zinc-400">
            Touchez 1 million de décideurs, chefs d&apos;entreprises, cadres
            supérieurs et investisseurs chaque trimestre.{" "}
            <span className="text-zinc-300">
              Sans intermédiaire, au cœur de leur temps d&apos;attention.
            </span>
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          <Reveal delay={0.08}>
            <SponsoringTunnel />
          </Reveal>
          <Reveal delay={0.14}>
            <RoiCalculator />
          </Reveal>
        </div>

        {/* Avantages annonceurs — copywriting §3 */}
        <Reveal delay={0.18}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur"
              >
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-black/60 text-white">
                  <Icon className="size-5" />
                </div>
                <div className="mt-4 text-sm font-bold text-white">{title}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Rareté des créneaux + stats complémentaires */}
        <Reveal delay={0.22}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-zinc-500">
            Avec 1 million d&apos;écoutes trimestrielles auprès de décideurs à
            haut pouvoir d&apos;achat, nos créneaux de sponsoring pour la
            saison en cours sont{" "}
            <span className="text-zinc-300">
              strictement limités afin de garantir un impact maximal
            </span>{" "}
            à nos marques partenaires.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
