"use client";

import { swrKeys } from "@/hooks/swr/swrKeys";
import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useCountryCodeStore } from "@/store/UseCountryCodeStore";

import LogoImg from "@/assets/images/logo.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  MenuDrawer,
  SelectCountry,
} from "@components";
import { ChatsIcon } from "@phosphor-icons/react";

export const AppMenu = () => {
  const params = useParams();
  const pathname = usePathname();
  const [countries, setCountries] = useState<Country[] | undefined>();
  const { countryCode, setCountryCode } = useCountryCodeStore();

  const {
    data,
    error: countriesError,
    isLoading: countriesLoading,
  } = useSWR<Country[]>(swrKeys.countries());

  useEffect(() => {
    if (data) {
      const filteredCountries = data?.filter((c: Country) => c.status === true);
      setCountries(filteredCountries);
    }
  }, [data]);

  useEffect(() => {
    if (!pathname) return;

    if (pathname === "/") {
      setCountryCode("un");
      return;
    }

    const slug = params.countryOrSlug as string;
    const matched = countries?.find((c) => c.code === slug);

    setCountryCode(matched?.code ?? "un");
  }, [params, countries, countryCode, setCountryCode]);

  return (
    <div
      className={cn(
        "_mobile-menu fixed bottom-2 z-50 w-full max-w-[414px] px-2",
      )}
    >
      <div className="_main-mobileMenu flex items-center justify-between rounded-full border-gray-200 bg-white/90 backdrop-blur px-4 py-2">
        <MenuDrawer countryCode={countryCode} countries={countries} />

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

        <SelectCountry countryCode={countryCode} countries={countries} />

        {/* <div className="_community">
          <ChatsIcon size={32} weight="duotone" />
        </div>

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
