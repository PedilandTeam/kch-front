// src/components/Layout/AppMenu.tsx
"use client";

import { cn } from "@/lib/utils";
import { useHeader } from "@/store/useHeader";
import { Country } from "@/schemas/country";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// UI Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatsIcon, ListIcon } from "@phosphor-icons/react";
import { CircleFlag } from "next-circle-flags";
import { CountriesDialog } from "@components/index";
import useSWR from "swr";
import { swrKeys } from "@/hooks/swr/swrKeys";

export const AppMenu = () => {
  const { data, error, isLoading } = useSWR(swrKeys.countries());
  const { countryCode, setCountryCode } = useHeader();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [countries, setCountries] = useState<Country[] | undefined>();

  useEffect(() => {
    if (data) {
      const filteredCountries = data?.filter((c: Country) => c.status === true);
      setCountries(filteredCountries);
    }
  }, [data]);

  // Scroll Effect
  useEffect(() => {
    let ticking = false;
    const threshold = 5;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
            if (currentScrollY > lastScrollY.current) {
              setIsVisible(false); // scroll down → hide
            } else {
              setIsVisible(true); // scroll up → show
            }
            lastScrollY.current = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const countryOrSlug = params.countryOrSlug as string;
    const isMainPage =
      !countryOrSlug ||
      !countries?.find((c: Country) => c.code === countryOrSlug);
    const countryCodeFromParams = isMainPage ? "" : countryOrSlug;
    setCountryCode(
      isMainPage ? "un" : countryCodeFromParams || countryCode || "un",
    );
  }, [params, countries, countryCode, setCountryCode]);

  const isMainPage = !countryCode && (countryCode == "un" || !countryCode);

  return (
    <div
      className={cn(
        "_mobile-menu fixed bottom-0 left-1/2 z-0 w-full max-w-[414px] -translate-x-1/2 transform transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="_main-mobileMenu flex items-center justify-between border border-gray-200 bg-white px-4 py-2">
        <div className="_select-country flex">
          <CircleFlag
            className="opacity-50 hover:cursor-pointer"
            width={32}
            height={32}
            quality={75}
            loading={"lazy"}
            alt={`Logo of country with ISO code ${countries?.find((c: Country) => c.code === countryCode)?.code}`}
            countryCode={countryCode}
            onClick={() => setIsOpen(true)}
          />
        </div>

        <div className="_menu">
          <ListIcon size={32} weight="duotone" />
        </div>

        <div className="_logo">
          <Link href={"/"}>
            <Image
              src="/images/logo-01.png"
              alt="Koochaa Logo"
              width={42}
              height={42}
              priority
            />
          </Link>
        </div>

        <div className="_community">
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
        </Link>
      </div>

      <CountriesDialog
        countries={countries || []}
        open={isOpen}
        setOpen={setIsOpen}
      />
    </div>
  );
};
