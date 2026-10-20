import { create } from "zustand";
import type { PodLabVideo } from "@/types/podlab";

// ─── Lecteur flottant (Floating Audio/Video Player — design system 21st.dev) ──
// État global de l'épisode en cours de lecture dans la barre flottante.
//
// Persistance multi-pages (spec §3.1 « lecteur persistant avec reprise de
// lecture ») : l'épisode en cours + la position d'écoute + la vitesse sont
// sauvegardés dans localStorage à chaque tick de lecture. Au chargement
// d'une nouvelle page, hydrate() ré-ouvre le lecteur à la position
// sauvegardée — l'écoute continue là où elle s'était arrêtée.

export interface SavedPlayerState {
  videoId: string;
  time: number;
  rate: number;
  savedAt: number;
}

const STORAGE_KEY = "podlab-player";
/** En dessous de ce seuil, la reprise automatique n'apporte rien. */
const RESUME_THRESHOLD_SECONDS = 15;
/** Au delà, la sauvegarde est considérée obsolète (épisode terminé depuis longtemps). */
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14;

interface PlayerState {
  video: PodLabVideo | null;
  resumeAt: number;
  rate: number;
  open: (video: PodLabVideo, opts?: { resumeAt?: number; rate?: number }) => void;
  close: () => void;
  /** Restaure la dernière session d'écoute (appelé au montage client). */
  hydrate: (catalog: PodLabVideo[]) => void;
  save: (state: Omit<SavedPlayerState, "savedAt">) => void;
}

function readSaved(): SavedPlayerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedPlayerState;
    if (!parsed?.videoId || typeof parsed.time !== "number") return null;
    if (Date.now() - (parsed.savedAt ?? 0) > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export const usePlayerStore = create<PlayerState>((set) => ({
  video: null,
  resumeAt: 0,
  rate: 1,
  open: (video, opts) =>
    set({ video, resumeAt: opts?.resumeAt ?? 0, rate: opts?.rate ?? 1 }),
  close: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    set({ video: null, resumeAt: 0, rate: 1 });
  },
  hydrate: (catalog) => {
    const saved = readSaved();
    if (!saved || saved.time < RESUME_THRESHOLD_SECONDS) return;
    const video = catalog.find((v) => v.videoId === saved.videoId);
    if (!video) return;
    set({ video, resumeAt: Math.floor(saved.time), rate: saved.rate ?? 1 });
  },
  save: (state) => {
    if (typeof window === "undefined") return;
    try {
      const current: SavedPlayerState = { ...state, savedAt: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {}
  },
}));

/** Position sauvegardée pour une vidéo donnée (reprise de lecture). */
export function savedPositionFor(videoId: string): number {
  const saved = readSaved();
  return saved?.videoId === videoId ? Math.floor(saved.time) : 0;
}
