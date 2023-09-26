"use client";

import { _TXT } from "@/app/text";
import Image from "next/image";
import Link from "next/link";

import { UNITS_LIST } from "@/routes";
import { useRef } from "react";

type OffCanvasProps = {
  countryCode: string;
};

export const OffCanvas = ({ countryCode }: OffCanvasProps) => {

  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className="drawer drawer-end z-10">
      <input ref={ref} id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="menu p-4 w-80 h-full bg-gray-50 text-base-content">
          <div className="logo mb-5 w-[180px] h-[56px] sm:w-[170px] sm:h-[50px] relative">
            <Link href="/">
              <Image src="/images/logo.svg" fill={true} loading="lazy" alt="Koochaa Logo" />
            </Link>
          </div>
          <ul>
            <li onClick={() => ref.current?.click()}>
              <Link
                href={`/${countryCode}/${UNITS_LIST.BUSINESSES}`}
                className="p-3 text-[16px]"
              >
                {_TXT.MENU.BUSINESSES}
              </Link>
            </li>
            <li onClick={() => ref.current?.click()}>
              <Link
                href={`/${countryCode}/${UNITS_LIST.DOCTORS}`}
                className="p-3 text-[16px]"
              >
                {_TXT.MENU.DOCTORS}
              </Link>
            </li>
            <li onClick={() => ref.current?.click()}>
              <Link href={`/about`} className="p-3 text-[16px]">
                {_TXT.MENU.ABOUT}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
