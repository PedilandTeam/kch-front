"use client";

import { AppMenu } from "@components";

interface WrapAppMenuProps {
  children: React.ReactNode;
}

export const WrapAppMenu = ({ children }: WrapAppMenuProps) => {
  return (
    <>
      {children}
      <AppMenu />
    </>
  );
};
