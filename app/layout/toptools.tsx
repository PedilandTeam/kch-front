"use client";

import { MapIcon } from "@heroicons/react/24/outline";
import { CircleFlag } from "next-circle-flags";
import { _TXT } from "../text";
import Link from "next/link";

type TopToolsProps = {
  countryCode: string;
  isMainPage: boolean;
};
export const TopTools = ({ countryCode, isMainPage }: TopToolsProps) => {
  return (
    <div className="top-tools flex items-center">
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
            width={44}
            height={44}
            loading={"lazy"}
            alt={`logo of country with code ${countryCode}`}
            countryCode={countryCode}
            className="opacity-75 hover:opacity-100 hover:cursor-pointer transition"
          />
        </div>
      )}

      {isMainPage ? null : (
        <div>
          <div className="main-nav mr-3">
            <ul className="font-medium hidden lg:flex">
              <li>
                <Link
                  href="#select-unit"
                  className="btn btn-link no-underline text-base"
                >
                  راهنمای مشاغل
                </Link>
              </li>
            </ul>
          </div>

          <div className="menu-icon mr-3 sm:hidden">
            <label
              className="btn btn-circle swap swap-rotate"
              htmlFor="main-drawer"
            >
              <input type="checkbox" />
              {/* Hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
