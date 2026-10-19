import { create } from "zustand";
import type { PodLabVideo } from "@/types/podlab";

// ─── Lecteur flottant (Floating Audio/Video Player — design system 21st.dev) ─
// État global de l'épisode en cours de lecture dans la barre flottante.
interface PlayerState {
  video: PodLabVideo | null;
  open: (video: PodLabVideo) => void;
  close: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  video: null,
  open: (video) => set({ video }),
  close: () => set({ video: null }),
}));
