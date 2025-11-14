"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PointsStore {
  hasHydrated: boolean;

  points: number;
  onboardingSteps: number[];

  registerRewardGiven: boolean;
  genderRewardGiven: boolean;
  birthYearRewardGiven: boolean;

  addPoints: (amount: number) => void;
  removePoints: (amount: number) => void;
  resetPoints: (zero?: number) => void;
  markOnboardingStep: (step: number) => void;

  markRegisterReward: (value: boolean) => void;
  markGenderReward: (value: boolean) => void;
  markBirthYearReward: (value: boolean) => void;

  setHasHydrated: (value: boolean) => void;
}

export const usePointsStore = create<PointsStore>()(
  persist(
    (set, get) => ({
      hasHydrated: false,

      points: 0,
      onboardingSteps: [],

      registerRewardGiven: false,
      genderRewardGiven: false,
      birthYearRewardGiven: false,

      addPoints: (amount) =>
        set((state) => ({ points: state.points + amount })),

      removePoints: (amount) =>
        set((state) => ({ points: state.points - amount })),

      resetPoints: (zero) =>
        set({
          points: zero ? zero : 0,
          onboardingSteps: [],
          registerRewardGiven: false,
          genderRewardGiven: false,
          birthYearRewardGiven: false,
        }),

      markOnboardingStep: (step) =>
        set((state) => ({
          onboardingSteps: [...state.onboardingSteps, step],
        })),

      markRegisterReward: (v) => set({ registerRewardGiven: v }),
      markGenderReward: (v) => set({ genderRewardGiven: v }),
      markBirthYearReward: (v) => set({ birthYearRewardGiven: v }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "adsclub-points-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
