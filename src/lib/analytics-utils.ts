/**
 * PodLab Media — Utilitaires analytics
 * Parsing User-Agent (appareil / navigateur) et traduction des codes pays —
 * même logique que WinAgro (lib/analytics-utils.ts), enrichie pour l'Afrique
 * francophone (audience principale de PodLab).
 */

export function parseUserAgent(uaString: string | null): {
  deviceType: string;
  browser: string;
} {
  if (!uaString) return { deviceType: "Desktop", browser: "Autre" };

  let deviceType = "Desktop";
  const ua = uaString.toLowerCase();
  if (/ipad|tablet|playbook|silk/i.test(ua)) deviceType = "Tablet";
  else if (/mobi|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua))
    deviceType = "Mobile";

  let browser = "Autre";
  if (ua.includes("firefox") || ua.includes("fxios")) browser = "Firefox";
  else if (ua.includes("opr") || ua.includes("opera")) browser = "Opera";
  else if (ua.includes("edg")) browser = "Edge";
  else if (ua.includes("chrome") || ua.includes("crios")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android"))
    browser = "Safari";

  return { deviceType, browser };
}

const COUNTRY_MAP: Record<string, string> = {
  BJ: "Bénin",
  CI: "Côte d'Ivoire",
  TG: "Togo",
  SN: "Sénégal",
  NG: "Nigeria",
  FR: "France",
  CM: "Cameroun",
  NE: "Niger",
  BF: "Burkina Faso",
  ML: "Mali",
  GN: "Guinée",
  GH: "Ghana",
  BE: "Belgique",
  CA: "Canada",
  US: "États-Unis",
  MA: "Maroc",
  CD: "RD Congo",
  GA: "Gabon",
  LU: "Luxembourg",
};

export function translateCountry(code: string | null): string {
  if (!code) return "Inconnu";
  return COUNTRY_MAP[code.trim().toUpperCase()] ?? code;
}

/** Classe un referrer en canal d'acquisition marketing. */
export function channelFromReferrer(referrer: string | null): string {
  if (!referrer) return "Direct";
  const r = referrer.toLowerCase();
  if (r.includes("youtube")) return "YouTube";
  if (r.includes("instagram")) return "Instagram";
  if (r.includes("tiktok")) return "TikTok";
  if (r.includes("facebook") || r.includes("fb.")) return "Facebook";
  if (r.includes("google")) return "Google";
  if (r.includes("linkedin")) return "LinkedIn";
  if (r.includes("whatsapp")) return "WhatsApp";
  if (r.includes("twitter") || r.includes("x.com")) return "X";
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
}
