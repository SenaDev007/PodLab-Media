"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Composants partagés PodLab (style Vercel / 21st.dev) ────────────────────

/** Fade-up au scroll (Framer Motion, once). */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

/** Compteur animé (déclenché à l'entrée dans le viewport).
 *  Robustesse : la valeur finale est rendue côté serveur (SSR / sans JS /
 *  réseau 3G lent) — l'animation 0 → valeur n'est qu'une amélioration
 *  progressive et ne masque JAMAIS le chiffre réel. */
export function CountUp({
  to,
  duration = 1600,
  suffix = "",
  prefix = "",
  format = "compact",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  format?: "compact" | "full";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-32px" });
  // État initial = valeur finale → le HTML servi affiche le vrai chiffre.
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const display =
    format === "compact"
      ? new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 }).format(Math.round(val))
      : new Intl.NumberFormat("fr-FR").format(Math.round(val));

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Étiquette de section — style éditorial mono. */
export function SectionTag({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-zinc-500",
        className
      )}
    >
      <span className="font-mono text-zinc-600">{index}</span>
      <span className="h-px w-8 bg-zinc-700" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

/** Point live pulsé. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-2 rounded-full bg-white animate-pulse-dot",
        className
      )}
    >
      <span className="absolute inset-0 rounded-full bg-white/40 blur-[2px]" />
    </span>
  );
}

/** Carte verre sombre générique. */
export function GlassCard({
  children,
  className,
  shine = true,
}: {
  children: React.ReactNode;
  className?: string;
  shine?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md",
        shine && "card-shine",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Grande étiquette-locataire (vidéo views / écoutes). */
export function StatBlock({
  value,
  label,
  sub,
}: {
  value: React.ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <GlassCard className="p-5 md:p-6">
      <div className="text-3xl md:text-4xl font-bold tracking-tight text-white tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-zinc-300">{label}</div>
      {sub ? <div className="mt-0.5 text-xs text-zinc-500">{sub}</div> : null}
    </GlassCard>
  );
}
