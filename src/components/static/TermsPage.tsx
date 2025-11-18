"use client";

import { WrapPageStatic } from "../layout/WrapPageStatic";
import { TermsContent } from "./TermsContent";
import { TermsPageHead } from "./TermsPageHead";

interface TermsPageProps {
  title: string;
}

export const TermsPage = ({ title }: TermsPageProps) => {
  return (
    <WrapPageStatic title={title}>
      <TermsPageHead />

      <TermsContent />
    </WrapPageStatic>
  );
};
