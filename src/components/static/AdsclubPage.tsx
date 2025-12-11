"use client";

import { WrapPageStatic } from "@/components/layout/WrapPageStatic";
import { AdsclubContent } from "@/components/static/AdsclubContent";
import { AdsclubPageHead } from "@/components/static/AdsclubPageHead";

interface AdsclubPageProps {
  title: string;
}

export const AdsclubPage = ({ title }: AdsclubPageProps) => {
  return (
    <WrapPageStatic title={title}>
      <AdsclubPageHead />

      <AdsclubContent />
    </WrapPageStatic>
  );
};
