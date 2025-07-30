"use client";
import React from "react";

type MegaColProps = {
  title?: string;
  subTitle?: string;
  menuItems?: { text: string; icon: React.JSX.Element; link: string }[];
  setShowMegaMenu: React.Dispatch<React.SetStateAction<boolean>>;
  havePicture?: boolean;
};

export default function MegaCol({
  title = "Default Title",
  subTitle = "Default Subtitle",
  menuItems = [],
  havePicture = false,
  setShowMegaMenu,
}: MegaColProps) {
  return (
    <div className="flex-1 break-words flex flex-col items-start h-auto w-full rounded-md">
      <h2 className="text-md font-bold mb-2">{title}</h2>
      <h3 className="text-sm mb-2">{subTitle}</h3>
      <ul className="w-full" onClick={() => setShowMegaMenu(false)}>
        {menuItems.map((item, index) => (
          <li
            className="text-md rounded-lg transition duration-300 ease-in-out hover:bg-blue-200"
            key={index}
          >
            <a
              href={item.link}
              className="flex items-center gap-2 p-1 hover:text-blue-500 transition-colors duration-300"
            >
              {item.icon}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      {havePicture && (
        <div className="h-full w-full mt-2">
          <div className="bg-blue-100 h-full w-full"></div>
        </div>
      )}
    </div>
  );
}
