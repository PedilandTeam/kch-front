"use client";

import { AboutPageHead, AboutContent, WrapPageStatic } from "@components";

interface AboutPageProps {
  title: string;
}

export const AboutPage = ({ title }: AboutPageProps) => {
  return (
    <WrapPageStatic title={title}>
      <AboutPageHead />

      <AboutContent />
    </WrapPageStatic>
  );
};
