"use client";

import { useEffect } from "react";
import { Header } from "@/components/podlab/header";
import { Footer } from "@/components/podlab/footer";
import { FloatingPlayer } from "@/components/podlab/player/floating-player";
import { AnalyticsTracker } from "@/components/podlab/analytics-tracker";
import type { Route } from "@/lib/router";

/**
 * Coque applicative commune : header fixe, contenu, footer collé en bas,
 * lecteur flottant global (design system §3 — 21st.dev) et tracker
 * d'audience (pageviews + sessions actives → back-office, cf. WinAgro).
 * `active` force la section active du header (pages routes réelles),
 * sinon le header détermine la vue via le routeur hash.
 */
export function AppShell({
  active,
  children,
}: {
  active?: Route;
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <AnalyticsTracker />
      <Header active={active} />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FloatingPlayer />
    </div>
  );
}
