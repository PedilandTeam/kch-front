"use client";

import { OffCanvas } from "@/app/(Site)/layout/offcanvas";
import { TopTools } from "@/app/(Site)/layout/toptools";
import { useHeader } from "@/store/useHeader";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  children: React.ReactNode;
  countries: CountryNamespace.GET[];
};

export const Header = ({ children, countries }: HeaderProps) => {
  const params = useParams();
  const { countryCode: contryCodeInStore } = useHeader();
  const [mounted, setMounted] = useState(false);
  const [countryCode, setCountryCode] = useState("un");

  useEffect(() => {
    setMounted(true);

    const countryOrSlug = params.countryOrSlug as string;
    const isMainPage =
      !countryOrSlug || !countries.find((c) => c.code === countryOrSlug);
    const countryCodeFromParams = isMainPage ? "un" : countryOrSlug;

    setCountryCode(countryCodeFromParams || contryCodeInStore || "un");
  }, [params, countries, contryCodeInStore]);

  if (!mounted) return null;

  const isMainPage =
    !contryCodeInStore && (countryCode === "un" || !countryCode);

  return (
    <header className="w-full py-[10px] bg-white shadow-sm">
      <div className="container mx-auto max-w-[1144px]">
        <div className="flex items-center justify-between mx-3 sm:mx-0">
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
