import { create } from "zustand";


interface useHeader {
    countryCode: string;
    isNotFound: boolean;
    setCountryCode: (countryCode: string) => void;
    setIsNotFound: (status: boolean) => void
}

export const useHeader = create<useHeader>()((set) => ({
    countryCode: '',
    isNotFound: false,
    setCountryCode: (countryCode: string) => set(state => ({isNotFound: false, countryCode: countryCode})),
    setIsNotFound: (status: boolean) => set(() => ({isNotFound: status, countryCode: ''}))
}))