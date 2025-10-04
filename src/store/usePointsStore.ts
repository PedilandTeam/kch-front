"use client";

import { create } from "zustand";

interface PointsStore {
  points: number;
  addPoints: (ammount: number) => void;
  removePoints: (ammount: number) => void;
  resetPoints: () => void;
}

export const usePointsStore = create<PointsStore>((set) => ({
  points: 0,
  addPoints: (ammount: number) =>
    set((state) => ({ points: state.points + ammount })),
  removePoints: (ammount: number) =>
    set((state) => ({ points: state.points - ammount })),
  resetPoints: () => set({ points: 0 }),
}));
