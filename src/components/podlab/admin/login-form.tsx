"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CircleAlert, Eye, EyeOff, Loader2, Lock } from "lucide-react";

/**
 * Formulaire de connexion au back-office PodLab — même architecture que
 * WinAgro (/admin/login) : POST /api/admin/login, cookie httpOnly 24 h,
 * verrouillage IP après 5 échecs. Design monochrome PodLab.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/admin";
        return;
      }
      setError(data.error || "Identifiants incorrects.");
    } catch {
      setError(
        "Serveur injoignable — vérifiez la connexion puis réessayez dans un instant."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" /> Retour au site
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/60 backdrop-blur-md"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/logo-podlab.png"
              alt="PodLab Media"
              className="h-full w-full object-contain p-2"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Administration
          </h1>
          <p className="mt-1.5 text-xs text-zinc-500">
            Espace sécurisé de gestion PodLab Media
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Adresse e-mail
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@podlabmedia.com"
              className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 pr-11 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute inset-y-0 right-0 flex items-center px-3.5 text-zinc-500 transition-colors hover:text-white"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-500/60 bg-red-950/70 px-4 py-3 text-xs font-semibold leading-relaxed text-red-400 shadow-[0_0_28px_rgba(239,68,68,0.22)] backdrop-blur-sm"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Lock className="size-4" />
            )}
            {loading ? "Connexion…" : "Accéder au back-office"}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-zinc-600">
          Accès réservé à l&apos;équipe PodLab. 5 tentatives maximum —
          l&apos;adresse IP est temporairement bloquée en cas d&apos;échecs
          répétés.
        </p>
      </motion.div>
    </div>
  );
}
