"use client";

import { CircleFlag } from "next-circle-flags";
import Link from "next/link";
import { COUNTRY } from "@/app/text/location";
import { MENU } from "@/app/text/menu";
import { Flag, List } from "app/client-packages/phosphor-icons/react";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import MegaMenu from "./megaMenu";

import Image from "next/image";

type TopToolsProps = {
  countryCode: string;
  isMainPage: boolean;
};
export const TopTools = ({ countryCode, isMainPage }: TopToolsProps) => {
  const [showMegaBiz, setShowMegaBiz] = useState(false);
  const [showMegaJob, setShowMegaJob] = useState(false);
  const [showMegaComm, setShowMegaComm] = useState(false);

  return (
    <div className="_top-tools flex items-center gap-8">
      {isMainPage ? (
        <div
          className="_select-country flex items-center "
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
        <div className="_icons flex items-center gap-4">
          <div
            className="_select-country"
            onClick={() => {
              if (document) {
                (
                  document.getElementById("modal_country") as HTMLFormElement
                )?.showModal();
              }
            }}
          >
            <CircleFlag
              width={40}
              height={40}
              loading={"lazy"}
              alt={`Logo of country with ISO code ${countryCode}`}
              countryCode={countryCode}
              className="w-[40px] h-[40px] transition opacity-75 hover:opacity-100 hover:cursor-pointer"
            />
          </div>
          <div className="_user-avatar">
            <Image
              src="/images/user-avatar.jpg"
              className="border-2 rounded-full"
              width={42}
              height={42}
              alt="User Avatar"
            />
          </div>
        </div>
      )}

      {isMainPage || countryCode === "un" ? null : (
        <div className="_main-menu relative">
          <div className="_main-nav">
            <ul className="flex items-center gap-4 font-bold">
              <li
                onClick={() => {
                  setShowMegaJob(!showMegaJob);
                  setShowMegaComm(false);
                  setShowMegaBiz(false);
                }}
                className="transition divide-purple-300 text-primary hover:text-black  cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {MENU.JobNew}
                  <CaretDown
                    size={16}
                    className="text-primar hover:text-black"
                    weight="bold"
                  />
                </div>
              </li>
              <li
                onClick={() => {
                  setShowMegaComm(!showMegaComm);
                  setShowMegaJob(false);
                  setShowMegaBiz(false);
                }}
                className="transition divide-purple-300 text-primary hover:text-black  cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {MENU.COMMUNITY}
                  <CaretDown
                    size={16}
                    className="text-primar hover:text-black"
                    weight="bold"
                  />
                </div>
              </li>
              <li className="transition divide-purple-300 text-primary hover:text-black cursor-pointer">
                <div
                  onClick={() => {
                    setShowMegaBiz(!showMegaBiz);
                    setShowMegaJob(false);
                    setShowMegaComm(false);
                  }}
                  className="flex items-center gap-2"
                >
                  {MENU.BIZ}
                  <CaretDown
                    size={16}
                    className="text-primar hover:text-black"
                    weight="bold"
                  />
                </div>
              </li>
            </ul>
          </div>

          <MegaMenu
            {...{
              showMegaBiz,
              setShowMegaBiz,
              showMegaJob,
              setShowMegaJob,
              showMegaComm,
              setShowMegaComm,
            }}
          />
        </div>
      )}
    </div>
  );
};
