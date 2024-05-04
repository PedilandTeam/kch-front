"use client";

import { CircleFlag } from "next-circle-flags";
import Link from "next/link";
import { COUNTRY } from "@/app/text/location";
import { MENU } from "@/app/text/menu";
import { Flag, List } from "app/client-packages/phosphor-icons/react";

type TopToolsProps = {
  countryCode: string;
  isMainPage: boolean;
};
export const TopTools = ({ countryCode, isMainPage }: TopToolsProps) => {
  return (
    <div className="flex items-center top-tools">
      {isMainPage ? (
        <div
          className="flex items-center _select-country"
          onClick={() => {
            if (document) {
              (
                document.getElementById("modal_country") as HTMLFormElement
              ).showModal();
            }
          }}
        >
          <button className="p-0 rounded-full border-dashed btn btn-outline bg-blue-50 hover:bg-blue-100 sm:hover:bg-primary text-primary sm:hover:text-white sm:rounded-lg sm:pr-3 sm:pl-4 w-[48px] sm:w-auto">
            <Flag size={24} weight="duotone" />
            <span className="hidden sm:inline-block">{COUNTRY.SELECT}</span>
          </button>
        </div>
      ) : (
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
          <CircleFlag
            width={42}
            height={42}
            loading={"lazy"}
            alt={`Logo of country with ISO code ${countryCode}`}
            countryCode={countryCode}
            className="w-[40px] h-[40px] transition opacity-75 hover:opacity-100 hover:cursor-pointer "
          />
        </div>
      )}

      {isMainPage || countryCode === "un" ? null : (
        <div>
          <div className="mr-8 main-nav">
            <ul className="hidden gap-5 font-bold lg:flex">
              <li>
                <Link
                  href={`/${countryCode}/businesses`}
                  className="transition divide-purple-300 text-primary hover:text-black"
                >
                  {MENU.BUSINESSES}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/doctors`}
                  className="transition divide-purple-300 text-primary hover:text-black"
                >
                  {MENU.DOCTORS}
                </Link>
              </li>
              <li>
                <Link
                  href={"https://biz.koochaa.com"}
                  className="transition divide-purple-300 text-primary hover:text-black"
                >
                  {MENU.BIZ}
                </Link>
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
