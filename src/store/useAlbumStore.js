import { create } from "zustand";
import { stickers as initialStickers } from "../data/stickers";

const STORAGE_KEY = "album-storage";

const saved = localStorage.getItem(STORAGE_KEY);

export const useAlbumStore = create((set) => ({
  stickers: saved
    ? JSON.parse(saved)
    : initialStickers.map((s) => ({
        ...s,
        pegada: false,
        repetidas: 0,
      })),

  // 🔥 NUEVO → necesario para import
  setStickers: (newStickers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStickers));
    set({ stickers: newStickers });
  },

  togglePegada: (id) =>
    set((state) => {
      const updated = state.stickers.map((s) =>
        s.id === id ? { ...s, pegada: !s.pegada } : s
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return { stickers: updated };
    }),

  addRepetida: (id) =>
    set((state) => {
      const updated = state.stickers.map((s) =>
        s.id === id
          ? { ...s, repetidas: s.repetidas + 1 }
          : s
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return { stickers: updated };
    }),

  removeRepetida: (id) =>
    set((state) => {
      const updated = state.stickers.map((s) =>
        s.id === id
          ? {
              ...s,
              repetidas: s.repetidas > 0 ? s.repetidas - 1 : 0,
            }
          : s
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return { stickers: updated };
    }),
}));