"use client";

import { LogoTop } from "./layout/logo";
import { TopTools } from "./layout/toptools";
import { OffCanvas } from "./layout/offcanvas";
import { storeType } from "@/store/store";
import { countryCodeList } from "@/utils/countryCodeList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type HeaderProps = {
  children: React.ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  const params = useParams();
  const country = useSelector((state: storeType) => state.stateSlice.country);

  const [countryCodeFromParams, setCountryCodeFromParams] =
    useState<string>("");
  const [isMainPage, setIsMainPage] = useState(false);

  useEffect(() => {
    const countryOrSlug = params.countryOrSlug as string;
    if (countryOrSlug) {
      setIsMainPage(false);
      setCountryCodeFromParams(countryOrSlug);
      return;
    }
    setIsMainPage(true);
    setCountryCodeFromParams("");
  }, [params]);

  // useEffect(() => {
  //   console.log(params);

  //   if(typeof params?.path == "string"){
  //     setCountryCodeFromParams(params?.path?.split("/")?.[0])
  //     console.log(!params?.path?.split("/")?.[0]);

  //     setIsMainPage(!params?.path?.split("/")?.[0])
  //   }
  // },[params.path])
  const isPathHaveCountry = countryCodeList.find(
    (code) => code == countryCodeFromParams
  );

  const haveCountry = (countryOrSlug: string) => {
    return countryCodeList.some((code) => code == countryOrSlug);
  };

  const [countryCode, setCountryCode] = useState("");
  useEffect(() => {
    setCountryCode(
      isMainPage
        ? "un"
        : haveCountry(params?.countryOrSlug as string)
        ? (params.countryOrSlug as string)
        : country
        ? country
        : isPathHaveCountry
        ? countryCodeFromParams
        : "un"
    );
  }, [params, country, isMainPage, isPathHaveCountry, countryCodeFromParams]);

  // Sticky Behavour
  const [scrollingDown, setScrollingDown] = useState(false);
  const [isTop, setIsTop] = useState(true); // New state to track if scroll is at the top
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window == "undefined") return;
    const currentScrollY = window.scrollY;
    setScrollingDown(currentScrollY > prevScrollY);
    setIsTop(currentScrollY === 0); // Check if scroll is at the top
    setPrevScrollY(currentScrollY);
  };

  useEffect(() => {
    if (typeof window == "undefined") return;
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <header
      className={`fixed z-10 top-0 w-full bg-white transition-all ${
        scrollingDown
          ? "transform -translate-y-full"
          : "transform translate-y-0"
      } ${isTop ? "py-[10px]" : "py-[6px] shadow"} duration-200`}
    >
      <div className="container mx-auto max-w-[1144px]">
        <div className="flex justify-between mx-3 sm:mx-0">
          <LogoTop />
          <TopTools isMainPage={isMainPage} countryCode={countryCode} />
        </div>
      </div>
      <OffCanvas countryCode={countryCode} />
      {children}
    </header>
  );
};
