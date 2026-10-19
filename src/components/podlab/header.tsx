"use client";

import { useEffect, useState } from "react";
import { Menu, LayoutDashboard, X, Mic } from "lucide-react";
import { PodLabLogo } from "./logo";
import { navigate, useHashRoute, type Route } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV: Array<{ route: Route; label: string }> = [
  { route: "accueil", label: "Accueil" },
  { route: "studios", label: "Studios" },
  { route: "sponsoring", label: "Sponsoring" },
  { route: "evenements", label: "Événements" },
];

export function Header({ active }: { active?: Route } = {}) {
  const hashRoute = useHashRoute();
  const route = active ?? hashRoute;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (r: Route) => {
    navigate(r);
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            onClick={() => go("accueil")}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg px-1"
            aria-label="PodLab Media — retour à l'accueil"
          >
            <PodLabLogo size="md" />
          </button>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {NAV.map((item) => (
              <button
                key={item.route}
                onClick={() => go(item.route)}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  route === item.route
                    ? "text-white bg-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
                aria-current={route === item.route ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <Mic className="size-3.5 animate-pulse-dot" /> Studio live
            </span>
            <Button
              variant={route === "admin" ? "default" : "outline"}
              size="sm"
              onClick={() => go("admin")}
              className="gap-2 rounded-lg"
            >
              <LayoutDashboard className="size-4" />
              Espace Admin
            </Button>
          </div>

          {/* Bouton mobile */}
          <button
            className="md:hidden inline-flex size-10 items-center justify-center rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl px-4 py-4 space-y-1"
          aria-label="Navigation mobile"
        >
          {NAV.map((item) => (
            <button
              key={item.route}
              onClick={() => go(item.route)}
              className={cn(
                "w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium transition-colors",
                route === item.route
                  ? "text-white bg-white/10"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </button>
          ))}
          <Button
            variant="outline"
            className="w-full mt-2 gap-2"
            onClick={() => go("admin")}
          >
            <LayoutDashboard className="size-4" />
            Espace Admin
          </Button>
        </nav>
      )}
    </header>
  );
}
