"use client";

import { MENU } from "@/app/text/allTexts";
import Image from "next/image";
import Link from "next/link";

import { storeType } from "@/store/store";
import { countryCodeList } from "@/utils/countryCodeList";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { UNITS_LIST } from "@/routes";

export const OffCanvas = () => {
  const params = useParams();
  const country = useSelector((state: storeType) => state.stateSlice.country);
  const countryCodeFromParams = params?.path?.split("/")?.[0];
  const isMainPage = !params?.path?.split("/")?.[0];
  const isPathHaveCountry = countryCodeList.find(
    (code) => code == countryCodeFromParams
  );
  const countryForMenu = isPathHaveCountry
    ? countryCodeFromParams
    : country
    ? country
    : "un";

  return (
    <div className="drawer drawer-end z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="menu p-4 w-80 h-full bg-gray-50 text-base-content">
          <div className="logo mb-5 w-[180px] h-[56px] sm:w-[170px] sm:h-[50px] relative">
            <Link href="/">
              <Image src="/img/logo.svg" fill={true} alt="Pediland Logo" />
            </Link>
          </div>
          <ul>
            <li>
              <Link
                href={`/${countryForMenu}/${UNITS_LIST.BUSINESSES}`}
                className="p-3 text-[16px]"
              >
                {MENU.BUSINESSES}
              </Link>
            </li>
            <li>
              <Link
                href={`/${countryForMenu}/${UNITS_LIST.DOCTORS}`}
                className="p-3 text-[16px]"
              >
                {MENU.DOCTORS}
              </Link>
            </li>
            <li>
              <Link
                href={`/${countryForMenu}/${UNITS_LIST.COMMUNITIES}`}
                className="p-3 text-[16px]"
              >
                {MENU.COMMUNITIES}
              </Link>
            </li>
            <li>
              <Link
                href={`/${countryForMenu}/${UNITS_LIST.FREELANCERS}`}
                className="p-3 text-[16px]"
              >
                {MENU.FREELANCERS}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
