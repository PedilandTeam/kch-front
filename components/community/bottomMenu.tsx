// app/(Site)/[countryOrSlug]/(Community)/c/bottomMenu.tsx
"use client";

import { List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useHeader } from "@/store/useHeader";
import { CountryNamespace } from "@/types/country";
import { CircleFlag } from "next-circle-flags";
export default function BottomMenu({
  countries,
}: {
  countries: CountryNamespace.GET[];
}) {
  const params = useParams();

  const { countryCode: contryCodeInStore, isNotFound } = useHeader();

  const [countryCode, setCountryCode] = useState("");

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const countryOrSlug = params.countryOrSlug as string;
    const isMainPage =
      !countryOrSlug || !countries?.find((c) => c.code === countryOrSlug);
    const countryCodeFromParams = isMainPage ? "" : countryOrSlug;
    setCountryCode(
      isMainPage ? "un" : countryCodeFromParams || contryCodeInStore || "un",
    );
  }, [params, countries, contryCodeInStore]);

  const isMainPage =
    !contryCodeInStore && (countryCode == "un" || !countryCode);
  // console.log(isMainPage, contryC.odeInStore, countryCode);

  return (
    <div
      className={`_bottomMenu-fixed fixed bottom-2 w-full transform transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-100"
      } z-0 sm:hidden`}
    >
      <div className="_main-bottomMenu mx-2 flex items-center justify-between rounded-full border border-gray-200 bg-white py-2 pl-6 pr-4">
        <div className="_wrapper flex flex-col items-center justify-center gap-1">
          <div
            className="select-country"
            onClick={() => {
              if (document) {
                (
                  document.getElementById("modal_country") as HTMLFormElement
                ).showModal();
              }
            }}
          >
            <div className="flex">
              {" "}
              <CircleFlag
                width={20}
                height={10}
                loading={"lazy"}
                alt={`Logo of country with ISO code ${countryCode}`}
                countryCode={countryCode}
                className="h-[28px] w-[28px] opacity-75 transition hover:cursor-pointer hover:opacity-100"
              />
            </div>
          </div>
          <span className="inline-flex justify-center text-xs">
            انتخاب کشور
          </span>
        </div>

        <Link href="/account">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="avatar">
              <Image
                src="/images/user-avatar.jpg"
                className="h-[28px] w-[28px] rounded-full border-2"
                width={16}
                height={16}
                alt="User Avatar"
              />
            </div>
            <span className="inline-flex justify-center text-xs">
              حساب کاربری
            </span>
          </div>
        </Link>

        <div
          onClick={() => document.getElementById("main-drawer")?.click()}
          className="_Menu -list flex flex-col items-center justify-between gap-[2px]"
        >
          <div className="flex cursor-pointer justify-center rounded-full bg-blue-50 p-1">
            <List size={20} color="#282828" />
          </div>
          <span className="inline-flex justify-center text-xs">منو</span>
        </div>

        <Link href="/">
          <div className="_wrap-account flex items-center justify-center">
            <Image
              src="/images/logo-01.png"
              width={36}
              height={36}
              priority={true}
              alt="Koochaa Logo"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
