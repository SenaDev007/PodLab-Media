"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/podlab/shared";
import { toast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) {
      toast({
        title: "Email invalide",
        description: "Renseignez une adresse email valide.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, segment: "general", source: "newsletter" }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      toast({
        title: "Bienvenue dans le Business Brief !",
        description: "Premier numéro lundi matin, 6h GMT.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Inscription impossible pour le moment, réessayez.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="relative py-16 md:py-24 border-t border-white/10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="card-shine relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
            {/* Halo intérieur */}
            <div className="absolute inset-0 bg-grid-sm opacity-60" aria-hidden />
            <div
              className="absolute inset-x-0 top-0 h-52 glow-top"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl px-6 py-16 md:py-20 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
                <Sparkles className="size-3.5" />
                PodLab Business Brief
              </div>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-white">
                Chaque lundi, les 5 signaux
                <br />
                <span className="text-zinc-500">que les décideurs lisent.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                Marchés BRVM, mobil money, success stories regionales : la
                veuve économique de la semaine, condensée en 5 minutes de
                lecture. Déjà 2 400+ dirigeants abonnés.
              </p>

              {done ? (
                <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/15 bg-black/70 p-6">
                  <CheckCircle2 className="size-10 text-white" />
                  <p className="text-sm font-semibold text-white">
                    Inscription confirmée
                  </p>
                  <p className="text-xs text-zinc-500">
                    Rendez-vous lundi matin, 6h GMT, dans votre boîte mail.
                  </p>
                </div>
              ) : (
                <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    className="h-12 flex-1 rounded-xl bg-black/60 border-white/15 text-sm"
                    aria-label="Votre adresse email"
                  />
                  <Button
                    onClick={submit}
                    disabled={loading}
                    className="h-12 rounded-xl px-6 gap-2 font-semibold"
                  >
                    {loading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <ArrowRight className="size-4" />
                    )}
                    S&apos;abonner
                  </Button>
                </div>
              )}

              <p className="mt-4 text-[11px] text-zinc-600">
                100% gratuit · Aucune publicité · Désinscription en un clic
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
