/**
 * PodLab Media — Session administrateur
 * Architecture identique à WinAgro (SenaDev007/win-Agro) : JWT signé HMAC-SHA256
 * en cookie httpOnly 24 h, identifiants par défaut surchargeables via la table
 * AdminSetting, verrouillage IP après échecs répétés.
 *
 * Implémentation zéro-dépendance via Web Crypto (globalThis.crypto.subtle) :
 * fonctionne à la fois dans le runtime Node (routes API) et Edge (proxy.ts).
 */

const COOKIE_NAME = "podlab_admin";
const SECRET = (
  process.env.JWT_SECRET ||
  "podlab-media-backoffice-secret-key-2026-monochrome"
).slice(0, 32);
const SESSION_HOURS = 24;
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export const ADMIN_COOKIE = COOKIE_NAME;

// ─── HMAC-SHA256 sign/verify (Web Crypto — Edge compatible) ──────────────────

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  return b64url(new Uint8Array(sig));
}

/** Signe une session admin : payload base64 + "." + signature HMAC. */
export async function signSession(user: string): Promise<string> {
  const payload = b64url(
    new TextEncoder().encode(
      JSON.stringify({ admin: true, user, exp: Date.now() + SESSION_HOURS * 3600_000 })
    )
  );
  return `${payload}.${await hmac(payload)}`;
}

/** Vérifie un jeton de session ; retourne true si valide et non expiré. */
export async function verifySession(token: string | undefined | null): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  if ((await hmac(payload)) !== sig) return false;
  try {
    const json = JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(atob(payload.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0))
      )
    );
    return json?.admin === true && typeof json.exp === "number" && json.exp > Date.now();
  } catch {
    return false;
  }
}

// ─── Identifiants admin (AdminSetting > env > défaut) ────────────────────────

/** Résout les identifiants : override base (AdminSetting) sinon variables
 *  d'environnement sinon valeurs par défaut documentées. `readSetting` est
 *  injecté pour éviter une dépendance Prisma dans le runtime Edge. */
export async function resolveCredentials(
  readSetting: (key: string) => Promise<string | null>
): Promise<{ email: string; password: string }> {
  const [email, password] = await Promise.all([
    readSetting("admin_email"),
    readSetting("admin_password"),
  ]);
  return {
    email: email || process.env.ADMIN_EMAIL || "contact@podlabmedia.com",
    password: password || process.env.ADMIN_PASSWORD || "PodLabAdmin2026!",
  };
}

// ─── Verrouillage IP (en mémoire — anti brute force) ─────────────────────────

type Attempt = { fails: number; lockedUntil: number };
const attempts = new Map<string, Attempt>();

export function checkIpLocked(ip: string): { locked: boolean; remainingMin: number } {
  const a = attempts.get(ip);
  if (!a) return { locked: false, remainingMin: 0 };
  if (a.lockedUntil > Date.now()) {
    return { locked: true, remainingMin: Math.ceil((a.lockedUntil - Date.now()) / 60_000) };
  }
  return { locked: false, remainingMin: 0 };
}

export function trackLoginAttempt(ip: string, success: boolean): void {
  const a = attempts.get(ip) ?? { fails: 0, lockedUntil: 0 };
  if (success) {
    attempts.set(ip, { fails: 0, lockedUntil: 0 });
    return;
  }
  a.fails += 1;
  if (a.fails >= MAX_ATTEMPTS) {
    a.lockedUntil = Date.now() + LOCK_MINUTES * 60_000;
    a.fails = 0;
  }
  attempts.set(ip, a);
}
