"use client";

import { useEffect, useRef } from "react";

/**
 * Tracker d'audience PodLab — même architecture que WinAgro
 * (components/ui/AnalyticsTracker.tsx), adapté au routeur hybride du site :
 * pages réelles (/studios, /episodes/x) ET vues hash (#/sponsoring…).
 * Posé dans AppShell : chaque page publique est comptée, avec UTM persistés.
 */
const SESSION_KEY = "podlab_session_token";

export function AnalyticsTracker() {
  const tokenRef = useRef<string | null>(null);

  // 1. Jeton de session + capture UTM (une seule fois)
  useEffect(() => {
    let token = sessionStorage.getItem(SESSION_KEY);
    if (!token) {
      token = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, token);
    }
    tokenRef.current = token;

    const sp = new URLSearchParams(window.location.search);
    const utmSource = sp.get("utm_source");
    const utmMedium = sp.get("utm_medium");
    const utmCampaign = sp.get("utm_campaign");
    if (utmSource) sessionStorage.setItem("podlab_utm_source", utmSource);
    if (utmMedium) sessionStorage.setItem("podlab_utm_medium", utmMedium);
    if (utmCampaign) sessionStorage.setItem("podlab_utm_campaign", utmCampaign);
  }, []);

  // 2. Envoi d'un pageview à chaque changement de chemin ou de vue hash
  useEffect(() => {
    const send = () => {
      const token = tokenRef.current ?? sessionStorage.getItem(SESSION_KEY);
      if (!token) return;
      const path =
        window.location.pathname + (window.location.hash || "");
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          path,
          referrer: document.referrer || null,
          sessionToken: token,
          utmSource: sessionStorage.getItem("podlab_utm_source"),
          utmMedium: sessionStorage.getItem("podlab_utm_medium"),
          utmCampaign: sessionStorage.getItem("podlab_utm_campaign"),
        }),
      }).catch(() => {});
    };

    if (!tokenRef.current) {
      const t = setTimeout(send, 150);
      return () => clearTimeout(t);
    }
    send();

    // Vues hash (#/studios) sans rechargement de page
    const onHash = () => send();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return null;
}
