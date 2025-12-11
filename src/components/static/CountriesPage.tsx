"use client";

import { WrapPageStatic } from "@/components/layout/WrapPageStatic";
import { CountriesContent } from "./CountriesPageContent";

interface CountriesPageProps {
  title: string;
}

export const CountriesPage = ({ title }: CountriesPageProps) => {
  return (
    <WrapPageStatic title={title}>
      <CountriesContent />
    </WrapPageStatic>
  );
};
