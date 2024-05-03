"use client";

import Image from "next/image";
import Link from "next/link";
import { UNITS_LIST } from "@/routes";
import { useRef } from "react";
import { MENU } from "../text/menu";

type OffCanvasProps = {
  countryCode: string;
};

export const OffCanvas = ({ countryCode }: OffCanvasProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div dir="rtl" className="z-10 drawer drawer-end">
      <input
        ref={ref}
        id="main-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="main-drawer" className="drawer-overlay"></label>

        <div className="h-full p-4 menu w-80 bg-blue-50 text-base-content">
          <div className="relative flex justify-end w-full mb-5 logo">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                width={180}
                height={50}
                loading="lazy"
                alt="Koochaa Logo"
              />
            </Link>
          </div>
          <ul>
            <li onClick={() => ref.current?.click()}>
              <Link
                href={`/${countryCode}/${UNITS_LIST.BUSINESSES}`}
                className="p-3 text-[16px]"
              >
                {MENU.BUSINESSES}
              </Link>
            </li>
            <li onClick={() => ref.current?.click()}>
              <Link
                href={`/${countryCode}/${UNITS_LIST.DOCTORS}`}
                className="p-3 text-[16px]"
              >
                {MENU.DOCTORS}
              </Link>
            </li>
            <li onClick={() => ref.current?.click()}>
              <Link
                href={"https://biz.koochaa.com"}
                className="p-3 text-[16px]"
              >
                {MENU.BIZ}
              </Link>
            </li>{" "}
            <li onClick={() => ref.current?.click()}>
              <Link href={`/about`} className="p-3 text-[16px]">
                {MENU.ABOUT}
              </Link>
            </li>
            <li onClick={() => ref.current?.click()}>
              <Link href={`/jobs`} className="p-3 text-[16px]">
                {MENU.JOBS}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
