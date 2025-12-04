"use client";

import { WrapPageStatic } from "../layout/WrapPageStatic";
import { AboutContent } from "./AboutContent";
import { AboutPageHead } from "./AboutPageHead";

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
