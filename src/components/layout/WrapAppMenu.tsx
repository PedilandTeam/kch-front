"use client";

import { AppMenu } from "./AppMenu";

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
