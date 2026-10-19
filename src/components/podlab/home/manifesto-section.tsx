"use client";

import { Quote, Youtube } from "lucide-react";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import { Button } from "@/components/ui/button";

// ─── Manifeste PodLab — copywriting §2.3 « Pourquoi YouTube ne suffit plus » ──
export function ManifestoSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTag index="01" label="Pourquoi YouTube ne suffit plus" />
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          {/* Citation éditoriale */}
          <Reveal delay={0.06} className="lg:col-span-6">
            <figure className="relative">
              <Quote
                className="absolute -left-2 -top-3 size-10 text-white/10"
                aria-hidden
              />
              <blockquote className="pl-6 border-l-2 border-white/20">
                <p className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-gradient">
                  L&apos;Afrique de l&apos;Ouest ne manque pas d&apos;idées,
                  elle manque de données d&apos;exécution réelles.
                </p>
              </blockquote>
              <figcaption className="mt-5 pl-6 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
                <span className="h-px w-8 bg-zinc-700" aria-hidden />
                Manifeste PodLab Media
              </figcaption>
            </figure>
          </Reveal>

          {/* Paragraphe manifeste */}
          <Reveal delay={0.12} className="lg:col-span-6">
            <div className="space-y-5 text-sm md:text-base leading-relaxed text-zinc-400">
              <p>
                Pendant des décennies, le récit économique africain a été
                écrit par des observateurs extérieurs. Chez PodLab Media,
                nous avons créé le{" "}
                <span className="font-semibold text-zinc-200">
                  premier sanctuaire
                </span>{" "}
                où les véritables acteurs — ceux qui gèrent des conseils
                d&apos;administration, qui introduisent des sociétés à la BRVM
                comme AS World Tech, ou qui structurent le crédit financier —
                partagent leurs chiffres, leurs échecs et leurs méthodes
                d&apos;arbitrage.
              </p>
              <p>
                Nous ne faisons pas des interviews :{" "}
                <span className="font-semibold text-zinc-200">
                  nous documentons l&apos;histoire industrielle et
                  commerciale de notre continent.
                </span>{" "}
                L&apos;émission phare « Discussion Informelle » — le podcast
                business le plus écouté au Bénin et le 2ᵉ d&apos;Afrique de
                l&apos;Ouest — reçoit chaque semaine ceux qui exécutent
                vraiment.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  size="sm"
                  onClick={() =>
                    document
                      .getElementById("newsletter")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }
                  className="rounded-lg gap-2 font-semibold"
                >
                  <Youtube className="size-4" />
                  Rejoindre le Cercle Privé
                </Button>
                <p className="text-xs text-zinc-600">
                  L&apos;analyse qui ne passe pas au montage · chaque dimanche
                  8h00
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
