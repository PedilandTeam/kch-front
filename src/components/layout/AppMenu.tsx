"use client";

import { swrKeys } from "@/hooks/swr/swrKeys";
import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
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

  return (
    <div
      className={cn(
        "_mobile-menu fixed bottom-0 z-50 w-full max-w-[414px] transform transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="_main-mobileMenu flex items-center justify-between border border-gray-200 bg-white px-4 py-2">
        <MenuDrawer countryCode={countryCode} countries={countries} />

        <div className="_logo">
          <Link href={"/"}>
            <Image
              src={LogoImg}
              alt="Koochaa Logo"
              width={42}
              height={42}
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
