"use client";

import type { Country } from "@/schemas";
import { CircleFlag } from "next-circle-flags";
import { CountriesDialog } from ".";
import { useState } from "react";

interface SelectCountryProps {
  countryCode: string;
  countries?: Country[];
}

export const SelectCountry = ({
  countryCode,
  countries,
}: SelectCountryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentCountry = countries?.find(
    (c: Country) => c.code === countryCode,
  );

  return (
    <>
      <CountriesDialog
        countries={countries || []}
        open={isOpen}
        setOpen={setIsOpen}
      />
      <CircleFlag
        className="opacity-50 hover:cursor-pointer"
        width={32}
        height={32}
        quality={75}
        loading={"lazy"}
        alt={`Logo of country with ISO code ${currentCountry?.code}`}
        countryCode={countryCode}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
};
