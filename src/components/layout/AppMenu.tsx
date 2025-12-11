"use client";

import { useCountries } from "@/hooks/swr/useCountries";
import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";
import { useCountryCodeStore } from "@/store/UseCountryCodeStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import LogoImg from "@/assets/images/logo.svg";
import {
  BriefcaseIcon,
  NewspaperClippingIcon,
} from "@phosphor-icons/react/dist/ssr";
import { MenuDrawer } from "./MenuDrawer";
import { SelectCountry } from "./SelectCountry";

const COUNTRIES_FILTERS = { status: 1 };

export const AppMenu = () => {
  const pathname = usePathname();
  const [countries, setCountries] = useState<Country[] | undefined>();

  const { countries: countriesData } = useCountries(COUNTRIES_FILTERS);

  const countryCode = useCountryCodeStore((state) => state.countryCode);
  const setCountryCode = useCountryCodeStore((state) => state.setCountryCode);

  useEffect(() => {
    if (countriesData) {
      const filteredCountries = countriesData?.filter(
        (c: Country) => c.status === true,
      );
      setCountries(filteredCountries);
    }
  }, [countriesData]);

  useEffect(() => {
    if (!pathname) return;

    const parts = pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
      setCountryCode("un");
      return;
    }

    if (parts.length === 1 && !countries?.some((c) => c.code === parts[0])) {
      return;
    }

    const slug = parts[0];
    const matched = countries?.find((c) => c.code === slug);

    setCountryCode(matched?.code ?? "un");
  }, [pathname, countries]);

  return (
    <div
      className={cn(
        "_mobile-menu fixed bottom-2 z-50 w-full max-w-[414px] px-3",
      )}
    >
      <div className="_main-mobileMenu flex items-center justify-between rounded-full border-gray-200 bg-white/90 px-4 py-2 backdrop-blur">
        <MenuDrawer countryCode={countryCode} countries={countries} />

        <Link className="_business-center" href="/business-center">
          <BriefcaseIcon size={30} weight="duotone" className="text-primary" />
        </Link>

        <div className="_logo">
          <Link href={"/"}>
            <Image
              src={LogoImg}
              alt="Koochaa Logo"
              width={44}
              height={44}
              priority
            />
          </Link>
        </div>

        <Link className="_adsclub" href="/adsclub">
          <NewspaperClippingIcon
            size={30}
            weight="duotone"
            className="text-primary"
          />
        </Link>

        <SelectCountry countryCode={countryCode} countries={countries} />

        {/*
        <Link className="_account" href="/account">
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="opacity-50"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link> */}
      </div>
    </div>
  );
};
