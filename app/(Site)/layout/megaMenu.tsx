import { useState } from "react";
import MegaMenuItems from "./megaMenuItems";
import { Briefcase, Calendar, Chat, House, Users } from "@phosphor-icons/react";

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
    <div className="_mega-menu absolute top-[50px] xl:-right-4 lg:right-12 z-50 h-auto w-[52rem]">
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
    </div>
  );
}
