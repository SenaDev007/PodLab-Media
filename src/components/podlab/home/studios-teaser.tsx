"use client";

import { ArrowRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionTag } from "@/components/podlab/shared";
import { CountryFlag } from "@/components/podlab/flag";
import { STUDIOS } from "@/lib/data-mock";
import { navigate } from "@/lib/router";

export function StudiosTeaser() {
  return (
    <section className="relative py-16 md:py-24 border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-64 glow-center" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionTag index="03" label="Studios physiques — Cotonou &amp; Abidjan" />
          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="max-w-xl text-3xl md:text-5xl font-bold tracking-tight text-white">
              Tournez comme{" "}
              <span className="text-zinc-500">les grands médias.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Deux plateaux professionnels — acoustique traitée, caméras 4K,
              régies lumière — opérés par nos équipes.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {STUDIOS.map((studio, i) => (
            <Reveal key={studio.id} delay={i * 0.1}>
              <article className="group card-shine relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md transition-colors hover:border-white/25">
                {/* Visuel typographique du studio */}
                <div className="relative h-44 md:h-52 overflow-hidden bg-black bg-grid">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-3">
                    <span
                      className="block size-9 shrink-0 overflow-hidden rounded-md border border-white/20 bg-black/80 backdrop-blur"
                      aria-hidden
                    >
                      <CountryFlag code={studio.flag} cover className="h-full w-full" />
                    </span>
                    <div>
                      <div className="text-xl md:text-2xl font-bold tracking-tight text-white">
                        {studio.city}
                      </div>
                      <div className="text-[11px] text-zinc-500">{studio.country}</div>
                    </div>
                  </div>
                  <MapPin className="absolute right-5 top-5 size-4 text-zinc-600" />
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-xs text-zinc-500">{studio.address}</p>
                  <p className="mt-1 text-xs text-zinc-600">{studio.capacity}</p>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {studio.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs leading-relaxed text-zinc-400"
                      >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-zinc-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate("studios")}
                    className="mt-6 w-full rounded-xl h-11 gap-2 font-semibold group-hover:shadow-[0_0_36px_-10px_rgba(255,255,255,0.5)] transition-shadow"
                  >
                    Réserver ce studio
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
