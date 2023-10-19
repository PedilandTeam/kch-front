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
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div dir="rtl" className="drawer drawer-end z-10">
      <input
        ref={ref}
        id="main-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="main-drawer" className="drawer-overlay"></label>

        <div className="menu p-4 w-80 h-full bg-blue-50 text-base-content">
          <div className="logo flex justify-end w-full mb-5 relative">
            <Link href="/">
              <Image src="/images/logo.svg" width={180} height={50} loading="lazy" alt="Koochaa Logo" />
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
