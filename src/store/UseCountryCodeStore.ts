import { create } from "zustand";

interface CountryCodeStore {
  countryCode: string;
  setCountryCode: (code: string) => void;
  resetCountry: () => void;
}

export const useCountryCodeStore = create<CountryCodeStore>((set) => ({
  countryCode: "un",

  setCountryCode: (code) => set({ countryCode: code }),
  resetCountry: () => set({ countryCode: "un" }),
}));
