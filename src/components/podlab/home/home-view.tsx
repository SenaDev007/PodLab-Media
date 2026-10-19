"use client";

import { Hero } from "./hero";
import { EpisodesSection } from "./episodes-section";
import { StudiosTeaser } from "./studios-teaser";
import { NewsletterSection } from "./newsletter-section";
import { NOTABLE_GUESTS } from "@/lib/videos";

export function HomeView() {
  return (
    <>
      <Hero />

      {/* Bandeau invités défilant — tous issus d'épisodes réels de la chaîne */}
      <div className="relative border-y border-white/10 bg-black py-5 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <p className="sr-only">
          Invités marquants de PodLab : {NOTABLE_GUESTS.join(", ")}
        </p>
        <div className="flex w-max animate-marquee gap-14" aria-hidden>
          {[...NOTABLE_GUESTS, ...NOTABLE_GUESTS].map((guest, i) => (
            <span
              key={`${guest}-${i}`}
              className="text-sm font-semibold tracking-[0.3em] text-zinc-700 whitespace-nowrap select-none"
            >
              {guest}
            </span>
          ))}
        </div>
      </div>

      <EpisodesSection />
      <StudiosTeaser />
      <NewsletterSection />
    </>
  );
}
