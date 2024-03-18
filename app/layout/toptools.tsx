"use client";

import { Bars3Icon, MapIcon } from "@heroicons/react/24/outline";
import { CircleFlag } from "next-circle-flags";
import { _TXT } from "../text";
import Link from "next/link";

type TopToolsProps = {
  countryCode: string;
  isMainPage: boolean;
};
export const TopTools = ({ countryCode, isMainPage }: TopToolsProps) => {
  return (
    <div className="flex items-center top-tools">
      {isMainPage ? (
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
          <button className="btn btn-outline btn-primary rounded-full sm:rounded-lg px-0 sm:px-3 w-[48px] sm:w-auto">
            <span className="hidden sm:inline-block">
              {_TXT.COUNTRY.SELECT}
            </span>
            <MapIcon className="w-6 h-6" />
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
            className="w-[38px] h-[38px] transition opacity-75 hover:opacity-100 hover:cursor-pointer "
          />
        </div>
      )}

      {isMainPage || countryCode === "un" ? null : (
        <div>
          <div className="mr-3 main-nav">
            <ul className="hidden font-medium lg:flex">
              <li>
                <Link
                  href={`/${countryCode}/businesses`}
                  className="text-base no-underline btn btn-link"
                >
                  {_TXT.MENU.BUSINESSES}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/doctors`}
                  className="text-base no-underline btn btn-link"
                >
                  {_TXT.MENU.DOCTORS}
                </Link>
              </li>
            </ul>
          </div>

          <div className="mr-3 menu-icon sm:hidden">
            <label htmlFor="main-drawer" className="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-secondary">
              <Bars3Icon className="text-white w-7 h-7" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
