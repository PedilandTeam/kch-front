"use client";

import { WrapPageStatic } from "../layout/WrapPageStatic";
import { BusinessCenterContent } from "./BusinessCenterContent";
import { BusinessCenterPageHead } from "./BusinessCenterPageHead";

interface BusinessCenterPageProps {
  title: string;
}

export const BusinessCenterPage = ({ title }: BusinessCenterPageProps) => {
  return (
    <WrapPageStatic title={title}>
      <BusinessCenterPageHead />

      <BusinessCenterContent />
    </WrapPageStatic>
  );
};
