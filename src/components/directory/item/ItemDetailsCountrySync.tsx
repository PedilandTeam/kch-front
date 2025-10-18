"use client";

import { useEffect } from "react";
import { useCountryCodeStore } from "@/store/UseCountryCodeStore";

interface ItemDetailsCountrySyncProps {
  code: string;
}

export const ItemDetailsCountrySync = ({
  code,
}: ItemDetailsCountrySyncProps) => {
  const { setCountryCode } = useCountryCodeStore();

  useEffect(() => {
    if (code) setCountryCode(code);
  }, [code, setCountryCode]);

  return null;
};
