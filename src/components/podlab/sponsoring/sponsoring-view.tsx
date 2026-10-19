"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Download,
  Loader2,
  Megaphone,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import { BUDGET_OPTIONS, formatCFA } from "@/lib/data-mock";
import { CONTACT } from "@/lib/brand";
import { downloadPdf } from "@/lib/pdf";
import { toast } from "@/hooks/use-toast";
import type { BudgetRange } from "@/types/podlab";
import { cn } from "@/lib/utils";

const CPM_PODLAB = 2500; // F CFA pour 1000 écoutes qualifiées
const CPM_TV = 10000; // équivalent télévision/presse (4x)

// ─── Tunnel de qualification B2B ─────────────────────────────────────────────
function SponsoringTunnel() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState<BudgetRange | null>(null);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [highPriority, setHighPriority] = useState(false);

  const submit = async () => {
    if (!company || !contactName || !email.includes("@")) {
      toast({ title: "Formulaire incomplet", description: "Société, contact et email requis." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          contactName,
          email,
          phone: phone || null,
          budgetRange: budget,
          message: message || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setHighPriority(data.highPriority);
      setStep(2);
      toast({
        title: "Demande envoyée",
        description: data.message,
      });
    } catch {
      toast({ title: "Erreur", description: "Envoi impossible pour le moment, réessayez." });
    } finally {
      setLoading(false);
    }
  };

  const downloadMediaKit = () => {
    downloadPdf(
      {
        brand: "PodLab Media — Kit Média 2026",
        title: "Kit Média & Offres de Sponsoring",
        subtitle: "1er Média Business d'Afrique francophone · 128 000 abonnés YouTube · 18,2 M de vues cumulées · 894 vidéos",
        sections: [
          {
            heading: "L'audience PodLab en bref",
            lines: [
              "• 128 000 abonnés YouTube · 18,2 M de vues cumulées · 894 vidéos publiées",
              "• Dirigeants, investisseurs, cadres et entrepreneurs : 78% de l'audience",
              "• 14 pays : Côte d'Ivoire, Bénin, Sénégal, Togo, Cameroun en tête",
              "• Studios physiques à Cotonou (Bénin) et Abidjan (Côte d'Ivoire)",
            ],
          },
          {
            heading: "Nos formats pour annonceurs",
            lines: [
              "• Mentions sponsorisées dans les formats Entrepreneuriat, Finance, Success Stories, Showbiz",
              "• Sponsoring du PodLab Business Brief (newsletter hebdo, 2 400+ dirigeants)",
              "• Masterclass & enregistrements publics : speaking, stand, billetterie partenaire",
              "• Épisodes dédiés « Marque Story » produits en studio clé en main",
            ],
          },
          {
            heading: "Simulation de visibilité (calculateur)",
            lines: [
              "• CPM PodLab : 2 500 F CFA pour 1 000 écoutes qualifiées",
              "• Équivalent TV / presse : ~10 000 F CFA le CPM (4x plus cher)",
              "• Taux d'engagement newsletter : 34% (vs 2% display classique)",
            ],
          },
        ],
        footer: `PodLab Media · ${CONTACT.email} · ${CONTACT.phoneDisplay} · Cotonou — Abidjan · Devis détaillé sur demande`,
      },
      "podlab-kit-media-2026.pdf"
    );
  };

  return (
    <div className="card-shine rounded-2xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-md">
      {/* ÉTAPE 1 — Qualificateur de budget */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Megaphone className="size-5" /> Quel budget mensuel envisagez-vous ?
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            3 niveaux d&apos;engagement, un dispositif sur mesure pour chacun.
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

      {/* ÉTAPE 2 — Coordonnées entreprise */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-white">Parlez-nous de votre marque</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Votre Kit Média est envoyé automatiquement après validation.
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

      {/* ÉTAPE 3 — Validation + déblocage Kit Média */}
      {step === 2 && (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <CheckCircle2 className="size-14 text-white" />
          <h2 className="mt-5 text-2xl font-bold text-white">Demande enregistrée !</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
            {highPriority
              ? "Votre budget vous place en priorité commerciale haute : un conseiller senior PodLab vous rappelle sous 24h avec une proposition dédiée."
              : "Merci pour votre confiance. Un membre de l'équipe partenariats vous recontacte sous 48h ouvrées."}
          </p>
          {highPriority && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
              <Sparkles className="size-3.5" /> Profil qualifié — priorité commerciale haute
            </div>
          )}
          {/* Kit Média débloqué automatiquement après validation */}
          <Button onClick={downloadMediaKit} className="mt-6 gap-2 rounded-xl h-12 px-6 font-semibold">
            <Download className="size-4" /> Télécharger le Kit Média PDF
          </Button>
          <p className="mt-3 text-[11px] text-zinc-600">
            Kit débloqué automatiquement · Audience, formats, tarifs 2026
          </p>
        </div>
      )}

      {step < 2 && (
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="gap-2 text-zinc-400 hover:text-white">
            <ArrowLeft className="size-4" /> Retour
          </Button>
          {step === 0 ? (
            <Button disabled={!budget} onClick={() => setStep(1)} className="gap-2 rounded-xl font-semibold">
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

// ─── Vue Sponsoring ──────────────────────────────────────────────────────────
export function SponsoringView() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-80 glow-top" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTag index="P" label="Sponsoring &amp; Partenariats B2B" />
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            Parlez aux décideurs<br />
            de demain.
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-zinc-400">
            Votre marque devant 78% de cadres, investisseurs et entrepreneurs
            d&apos;Afrique francophone. Qualifiez votre budget en 2 minutes —
            le Kit Média se débloque automatiquement.
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

        {/* Preuves sociales */}
        <Reveal delay={0.18}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { k: "78%", v: "de l'audience : cadres, dirigeants & investisseurs" },
              { k: "34%", v: "de taux d'engagement sur le Business Brief" },
              { k: "14", v: "pays couverts en Afrique francophone" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur"
              >
                <div className="text-3xl font-bold text-white">{item.k}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{item.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
