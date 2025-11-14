"use client";

import { TermsPageHead, TermsContent, WrapPageStatic } from "@/components/ui";

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
