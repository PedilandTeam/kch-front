"use client";

import { TopTools } from "@/components/layout/_tmp/toptools2";
import { useHeader } from "@/store/useHeader";
import type { Country } from "@/schemas/country";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type HeaderProps = {
  children?: React.ReactNode;
  countries: Country[];
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
    <header className="hidden w-full bg-white py-3 shadow-sm">
      <div className="_wrap flex items-center justify-between">
        <TopTools
          isMainPage={isMainPage}
          countryCode={contryCodeInStore || countryCode}
        />
        <div className="_logo">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={190}
              height={54}
              priority={true}
              alt="Koochaa Logo"
              className="h-[50px] w-[181px]"
            />
          </Link>
        </div>
      </div>
      {/* {children} */}
    </header>
  );
};
