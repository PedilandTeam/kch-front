"use client";

import { TopTools } from "./layout/toptools";
import { OffCanvas } from "./layout/offcanvas";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CountryNamespace } from "@/types/country";
import { useHeader } from "@/store/useHeader";

type HeaderProps = {
  children: React.ReactNode;
  countries: CountryNamespace.GET[];
};

export const Header = ({ children, countries }: HeaderProps) => {
  const params = useParams();

  const { countryCode: contryCodeInStore, isNotFound } = useHeader();

  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    const countryOrSlug = params.countryOrSlug as string;
    const isMainPage =
      !countryOrSlug || !countries.find((c) => c.code === countryOrSlug);
    const countryCodeFromParams = isMainPage ? "" : countryOrSlug;
    setCountryCode(
      isMainPage ? "un" : countryCodeFromParams || contryCodeInStore || "un"
    );
  }, [params, countries, contryCodeInStore]);

  const isMainPage =
    !contryCodeInStore && (countryCode == "un" || !countryCode);

  return (
    <header className="w-full py-[10px] bg-white shadow-sm">
      <div className="container mx-auto max-w-[1144px]">
        <div className="flex justify-between mx-3 sm:mx-0">
          <TopTools
            isMainPage={isMainPage}
            countryCode={contryCodeInStore || countryCode}
          />

          <div className="logo">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                width={190}
                height={54}
                priority={true}
                alt="Koochaa Logo"
                className="h-[50px] sm:w-[190px] w-[181px] sm:h-[54px]"
              />
            </Link>
          </div>
        </div>
      </div>

      <OffCanvas countryCode={countryCode} />

      {children}
    </header>
  );
};
