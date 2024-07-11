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
import { Briefcase, Calendar, Chat, House, Users } from "@phosphor-icons/react";

type TopToolsProps = {
  countryCode: string;
  isMainPage: boolean;
};
export const TopTools = ({ countryCode, isMainPage }: TopToolsProps) => {
  const [showMegaBiz, setShowMegaBiz] = useState(false);
  const [showMegaJob, setShowMegaJob] = useState(false);
  const [showMegaComm, setShowMegaComm] = useState(false);

  const [itemName, setItemName] = useState("");
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
          <div className="relative">
            {" "}
            <Image
              src="/images/user-avatar.jpg"
              className="border-2 rounded-full ml-5 hidden xl:block"
              width={42}
              height={42}
              alt="User Avatar"
            />
            <div className="absolute hidden md:block top-12  right-16 z-50 h-auto w-[52rem]">
              {/* <MegaMenuItems showMegaMenu={showMegaMenu} itemName={itemName} setShowMegaMenu={setShowMegaMenu} /> */}
              <MegaMenuItems
                showMegaMenu={showMegaBiz}
                setShowMegaMenu={setShowMegaBiz}
                menuItems={[
                  {
                    title: "1منو اول",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو سوم",
                        icon: <Calendar size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو جهارم",
                        icon: <Chat size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو axXzcvb",
                        icon: <Users size={16} />,
                        link: "#",
                      },
                    ],
                  },
                  {
                    title: "1منو اول",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو سوم",
                        icon: <Calendar size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو جهارم",
                        icon: <Chat size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو axXzcvb",
                        icon: <Users size={16} />,
                        link: "#",
                      },
                    ],
                  },
                  {
                    title: "3منو سوم",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                    ],
                    havePicture: true,
                  },
                ]}
              />
              <MegaMenuItems
                showMegaMenu={showMegaJob}
                setShowMegaMenu={setShowMegaJob}
                menuItems={[
                  {
                    title: "21منو اول",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو سوم",
                        icon: <Calendar size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو جهارم",
                        icon: <Chat size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو axXzcvb",
                        icon: <Users size={16} />,
                        link: "#",
                      },
                    ],
                  },
                  {
                    title: "1منو اول",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو سوم",
                        icon: <Calendar size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو جهارم",
                        icon: <Chat size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو axXzcvb",
                        icon: <Users size={16} />,
                        link: "#",
                      },
                    ],
                  },
                  {
                    title: "3منو سوم",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                    ],
                    havePicture: true,
                  },
                ]}
              />
              <MegaMenuItems
                showMegaMenu={showMegaComm}
                setShowMegaMenu={setShowMegaComm}
                menuItems={[
                  {
                    title: "2منو دوم",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو سوم",
                        icon: <Calendar size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو جهارم",
                        icon: <Chat size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو پنجم",
                        icon: <Users size={16} />,
                        link: "#",
                      },
                    ],
                  },
                  {
                    title: "22منو دوم",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو سوم",
                        icon: <Calendar size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو جهارم",
                        icon: <Chat size={16} />,
                        link: "#",
                      },
                      {
                        text: "منو پنجم",
                        icon: <Users size={16} />,
                        link: "#",
                      },
                    ],
                  },
                  {
                    title: "3منو سوم",
                    subTitle:
                      "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
                    items: [
                      { text: "منو اول", icon: <House size={16} />, link: "#" },
                      {
                        text: "منو دوم",
                        icon: <Briefcase size={16} />,
                        link: "#",
                      },
                    ],
                    havePicture: true,
                  },
                ]}
              />
              ;
            </div>
          </div>
        </div>
      )}

      {isMainPage || countryCode === "un" ? null : (
        <div>
          <div className="mr-8 main-nav">
            <ul className="hidden gap-5 font-bold lg:flex">
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
                onClick={() => {
                  setShowMegaJob(!showMegaJob);
                  setShowMegaComm(false);
                  setShowMegaBiz(false);

                  setItemName("Job");
                }}
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
              <li
                onClick={() => {
                  setShowMegaComm(!showMegaComm);
                  setShowMegaJob(false);
                  setShowMegaBiz(false);

                  setItemName("Community");
                }}
                className="transition divide-purple-300 text-primary hover:text-black  cursor-pointer"
              >
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
                <div
                  onClick={() => {
                    setShowMegaBiz(!showMegaBiz);
                    setShowMegaJob(false);
                    setShowMegaComm(false);

                    setItemName("Biz");
                  }}
                  className="flex items-center gap-2 "
                >
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
