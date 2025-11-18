"use client";

import { WrapPageStatic } from "../layout/WrapPageStatic";
import { ContactMethods } from "./ContactMethods";
import { ContactPageHead } from "./ContactPageHead";

interface ContactPageProps {
  title: string;
}

export const ContactPage = ({ title }: ContactPageProps) => {
  return (
    <WrapPageStatic title={title}>
      <ContactPageHead />

      <ContactMethods />
    </WrapPageStatic>
  );
};
