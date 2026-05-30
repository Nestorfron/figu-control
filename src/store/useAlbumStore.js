import { create } from "zustand";
import { stickers as initialStickers } from "../data/stickers";

const saved = localStorage.getItem("album-storage");

export const useAlbumStore = create((set) => ({
  stickers: (() => {
    const base = initialStickers.map((s) => ({
      ...s,
      pegada: false,
      repetidas: 0,
    }));

    if (!saved) {
      localStorage.setItem("album-storage", JSON.stringify(base));
      return base;
    }

    const parsed = JSON.parse(saved);

    // 🔥 MERGE INTELIGENTE
    const merged = base.map((newSticker) => {
      const existing = parsed.find((s) => s.id === newSticker.id);

      if (existing) {
        return {
          ...newSticker,
          pegada: existing.pegada ?? false,
          repetidas: existing.repetidas ?? 0,
        };
      }

      return newSticker;
    });

    // 🔥 guardar actualizado
    localStorage.setItem("album-storage", JSON.stringify(merged));

    return merged;
  })(),

  togglePegada: (id) =>
    set((state) => {
      const updated = state.stickers.map((s) =>
        s.id === id ? { ...s, pegada: !s.pegada } : s
      );

      localStorage.setItem("album-storage", JSON.stringify(updated));
      return { stickers: updated };
    }),

  addRepetida: (id) =>
    set((state) => {
      const updated = state.stickers.map((s) =>
        s.id === id
          ? { ...s, repetidas: s.repetidas + 1 }
          : s
      );

      localStorage.setItem("album-storage", JSON.stringify(updated));
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

      localStorage.setItem("album-storage", JSON.stringify(updated));
      return { stickers: updated };
    }),

  // 🔥 OPCIONAL (pro)
  resetAlbum: () => {
    localStorage.removeItem("album-storage");
    location.reload();
  },
}));