"use client";

import { useEffect, useState } from "react";

// ─── Routeur hybride pour la navigation multi-vues ────────────────────────────
// Deux contextes d'exécution sont supportés :
// 1. Environnement à route unique ("/") : navigation via le fragment hash
//    (#/studios, #/sponsoring, #/evenements, #/admin) — deep-linking inclus.
// 2. Déploiement complet (Vercel) : les routes réelles /studios, /sponsoring,
//    /evenements et /admin existent ; depuis une page profonde, la navigation
//    utilise les URLs propres, depuis la racine elle reste en hash (compatible
//    avec les deux mondes sans rupture).

export type Route =
  | "accueil"
  | "studios"
  | "sponsoring"
  | "evenements"
  | "invitation"
  | "admin";

const VALID: Route[] = ["accueil", "studios", "sponsoring", "evenements", "invitation", "admin"];

export function isRootPath(): boolean {
  if (typeof window === "undefined") return true;
  return window.location.pathname.replace(/\/+$/, "") === "";
}

export function parseHash(): Route {
  if (typeof window === "undefined") return "accueil";
  const raw = window.location.hash.replace(/^#\/?/, "").split("?")[0];
  return (VALID as string[]).includes(raw) ? (raw as Route) : "accueil";
}

export function navigate(route: Route) {
  // Sur une page profonde (déploiement Vercel), utiliser les URLs réelles
  if (!isRootPath()) {
    if (route === "accueil" && window.location.pathname === "/") return;
    if (route !== "accueil" && window.location.pathname === `/${route}`) return;
    window.location.href = route === "accueil" ? "/" : `/${route}`;
    return;
  }
  // Sur la page racine : bascule de vue via le hash
  const target = route === "accueil" ? "#/" : `#/${route}`;
  if (window.location.hash === target) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }
  window.location.hash = target;
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>("accueil");

  useEffect(() => {
    const update = () => {
      setRoute(parseHash());
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return route;
}
