// ═══════════════════════════════════════════════════════════════════════════
// Chargeur YouTube IFrame Player API — pour le mini-lecteur flottant PodLab.
// Nécessaire pour : reprise de lecture (getCurrentTime/setPlaybackRate),
// vitesse de lecture et partage d'un passage (timestamp).
// ═══════════════════════════════════════════════════════════════════════════

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<any> | null = null;

export function loadYouTubeApi(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR"));
  }
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const;

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
    : `${m}:${String(sec).padStart(2, "0")}`;
}
