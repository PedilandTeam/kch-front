'use client'
import React from "react";
import { useMediaQuery } from "react-responsive";


type Props = {
    children?: React.ReactElement | null
}
export const Desktop = ({ children }: Props) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
export const MobileOrTablet = ({ children }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  return isMobile ? children : null;
};
export const Default = ({ children }: Props) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};
