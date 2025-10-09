"use client";

import MegaMenuItems from "./megaMenuItems";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChatIcon,
  HouseIcon,
  UsersIcon,
} from "@phosphor-icons/react";

export default function MegaMenu({
  showMegaBiz,
  setShowMegaBiz,
  showMegaJob,
  setShowMegaJob,
  showMegaComm,
  setShowMegaComm,
}: {
  showMegaBiz: boolean;
  setShowMegaBiz: any;
  showMegaJob: boolean;
  setShowMegaJob: any;
  showMegaComm: boolean;
  setShowMegaComm: any;
}) {
  return (
    <div
      className={`_mega-menu ${showMegaBiz ? "-translate-y-[5px]" : ""}${
        showMegaJob ? "-translate-y-[3px]" : ""
      }${
        showMegaComm ? "-translate-y-[4px]" : ""
      } absolute top-[50px] z-50 h-auto transition-all duration-400 sm:w-full md:w-[30rem] lg:w-[48rem] xl:-right-4 xl:w-[52rem]`}
    >
      <MegaMenuItems
        showMegaMenu={showMegaBiz}
        setShowMegaMenu={setShowMegaBiz}
        menuItems={[
          {
            title: "1منو اول",
            subTitle:
              "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
            items: [
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
                link: "#",
              },
              {
                text: "منو سوم",
                icon: <CalendarIcon size={16} />,
                link: "#",
              },
              {
                text: "منو جهارم",
                icon: <ChatIcon size={16} />,
                link: "#",
              },
              {
                text: "منو axXzcvb",
                icon: <UsersIcon size={16} />,
                link: "#",
              },
            ],
          },
          {
            title: "1منو اول",
            subTitle:
              "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
            items: [
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
                link: "#",
              },
              {
                text: "منو سوم",
                icon: <CalendarIcon size={16} />,
                link: "#",
              },
              {
                text: "منو جهارم",
                icon: <ChatIcon size={16} />,
                link: "#",
              },
              {
                text: "منو axXzcvb",
                icon: <UsersIcon size={16} />,
                link: "#",
              },
            ],
          },
          {
            title: "3منو سوم",
            subTitle:
              "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
            items: [
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
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
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
                link: "#",
              },
              {
                text: "منو سوم",
                icon: <CalendarIcon size={16} />,
                link: "#",
              },
              {
                text: "منو جهارم",
                icon: <ChatIcon size={16} />,
                link: "#",
              },
              {
                text: "منو axXzcvb",
                icon: <UsersIcon size={16} />,
                link: "#",
              },
            ],
          },
          {
            title: "1منو اول",
            subTitle:
              "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
            items: [
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
                link: "#",
              },
              {
                text: "منو سوم",
                icon: <CalendarIcon size={16} />,
                link: "#",
              },
              {
                text: "منو جهارم",
                icon: <ChatIcon size={16} />,
                link: "#",
              },
              {
                text: "منو axXzcvb",
                icon: <UsersIcon size={16} />,
                link: "#",
              },
            ],
          },
          {
            title: "3منو سوم",
            subTitle:
              "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
            items: [
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
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
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
                link: "#",
              },
              {
                text: "منو سوم",
                icon: <CalendarIcon size={16} />,
                link: "#",
              },
              {
                text: "منو جهارم",
                icon: <ChatIcon size={16} />,
                link: "#",
              },
              {
                text: "منو پنجم",
                icon: <UsersIcon size={16} />,
                link: "#",
              },
            ],
          },
          {
            title: "22منو دوم",
            subTitle:
              "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
            items: [
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
                link: "#",
              },
              {
                text: "منو سوم",
                icon: <CalendarIcon size={16} />,
                link: "#",
              },
              {
                text: "منو جهارم",
                icon: <ChatIcon size={16} />,
                link: "#",
              },
              {
                text: "منو پنجم",
                icon: <UsersIcon size={16} />,
                link: "#",
              },
            ],
          },
          {
            title: "3منو سوم",
            subTitle:
              "اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی. اینجا میتونی توضیحات بنویسی.",
            items: [
              { text: "منو اول", icon: <HouseIcon size={16} />, link: "#" },
              {
                text: "منو دوم",
                icon: <BriefcaseIcon size={16} />,
                link: "#",
              },
            ],
            havePicture: true,
          },
        ]}
      />
    </div>
  );
}
