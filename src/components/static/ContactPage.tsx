"use client";

import { ContactPageHead, WrapPageStatic, ContactMethods } from "@/components/ui";

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
