"use client";

import { WrapPageStatic } from "../layout/WrapPageStatic";
import { AdsclubContent } from "./AdsclubContent";
import { AdsclubPageHead } from "./AdsclubPageHead";

interface AboutPageProps {
  title: string;
}

export const AdsclubPage = ({ title }: AboutPageProps) => {
  return (
    <WrapPageStatic title={title}>
      <AdsclubPageHead />

      <AdsclubContent />
    </WrapPageStatic>
  );
};
