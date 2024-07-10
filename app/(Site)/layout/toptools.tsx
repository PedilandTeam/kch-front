"use client";

import { CircleFlag } from "next-circle-flags";
import Link from "next/link";
import { COUNTRY } from "@/app/text/location";
import { MENU } from "@/app/text/menu";
import { Flag, List } from "app/client-packages/phosphor-icons/react";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import MegaMenuItems from "./megaMenuItems";
import Image from "next/image";

type TopToolsProps = {
  countryCode: string;
  isMainPage: boolean;
};
export const TopTools = ({ countryCode, isMainPage }: TopToolsProps) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <div className="flex items-center top-tools">
      {isMainPage ? (
        <div
          className="flex items-center _select-country"
          onClick={() => {
            if (document) {
              (
                document.getElementById("modal_country") as HTMLFormElement
              )?.showModal();
            }
          }}
        >
          <button className="p-0 rounded-full border-dashed btn btn-outline bg-blue-50 hover:bg-blue-100 sm:hover:bg-primary text-primary sm:hover:text-white sm:rounded-lg sm:pr-3 sm:pl-4 w-[48px] sm:w-auto">
            <Flag size={24} weight="duotone" />
            <span className="hidden sm:inline-block">{COUNTRY.SELECT}</span>
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center  ">
          <div
            className="select-country"
            onClick={() => {
              if (document) {
                (
                  document.getElementById("modal_country") as HTMLFormElement
                )?.showModal();
              }
            }}
          >

            <CircleFlag
              width={42}
              height={42}
              loading={"lazy"}
              alt={`Logo of country with ISO code ${countryCode}`}
              countryCode={countryCode}
              className="w-[40px] h-[40px] transition opacity-75 hover:opacity-100 hover:cursor-pointer "
            />
          </div>
          <Image
            src="/images/user-avatar.jpg"
            className="border-2 rounded-full ml-5 hidden xl:block"
            width={42}
            height={42}
            alt="User Avatar"
          />
        </div>
      )}

      {isMainPage || countryCode === "un" ? null : (
        <div>
          <div className="mr-8 main-nav">
            <ul className="hidden gap-5 font-bold lg:flex">
            <MegaMenuItems showMegaMenu={showMegaMenu} />

              {/* <li
                onClick={() => setShowMegaMenu(!showMegaMenu)}
                className="transition divide-purple-300 text-primary hover:text-black cursor-pointer"
              >
                <Link
                  href={`/${countryCode}/businesses`}
                  className="transition divide-purple-300 text-primary hover:text-black"
                >
                <div className="flex items-center gap-2 ">
                  {MENU.BUSINESSES}
                  <CaretDown size={18} color="#5d07f3" />
                </div>

                </Link>
              </li> */}
              <li
                onClick={() => setShowMegaMenu(!showMegaMenu)}
                className="transition divide-purple-300 text-primary hover:text-black  cursor-pointer"
              >
                {/* <Link
                  href={`/${countryCode}/doctors`}
                  className="transition divide-purple-300 text-primary hover:text-black"
                > */}
                <div className="flex items-center gap-2 ">
                  {MENU.JobNew}

                  <CaretDown size={18} color="#5d07f3" />
                </div>
                {/* </Link> */}
              </li>
              <li className="transition divide-purple-300 text-primary hover:text-black  cursor-pointer">
                {/* <Link
                  href={process.env.NEXT_PUBLIC_BIZ_FRONT_URL}
                > */}
                <div className="flex items-center gap-2 ">
                  {MENU.COMMUNITY}

                  <CaretDown size={18} color="#5d07f3" />
                </div>
                {/* </Link> */}
              </li>
              <li className="transition divide-purple-300 text-primary hover:text-black cursor-pointer">
                {/* <Link
                  href={process.env.NEXT_PUBLIC_BIZ_FRONT_URL}
                  target="_blank"
                  className="transition divide-purple-300 text-primary hover:text-black"
                > */}
                <div className="flex items-center gap-2 ">
                  {MENU.BIZ}

                  <CaretDown size={18} color="#5d07f3" />
                </div>
                {/* </Link> */}
              </li>
            </ul>
          </div>

          <div className="mr-3 menu-icon sm:hidden">
            <label
              htmlFor="main-drawer"
              className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-secondary text-white"
            >
              <List size={28} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
