import React from "react";
import MegaCol from "./megaCol";

export default function MegaMenuItems({
  showMegaMenu,
  setShowMegaMenu,
  menuItems,
}: {
  showMegaMenu: boolean;
  setShowMegaMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menuItems: {
    title: string;
    subTitle: string;
    items: { text: string; icon: React.JSX.Element; link: string }[];
    havePicture?: boolean;
  }[];
}) {
  return (
    <div className="w-full h-auto">
      {showMegaMenu && (
        <div className="bg-white px-4 pb-4 gap-4 rounded-br-xl rounded-bl-xl flex">
          {menuItems.map((item) => {
            return (
              <MegaCol
                key={item.title}
                setShowMegaMenu={setShowMegaMenu}
                title={item.title}
                subTitle={item.subTitle}
                menuItems={item.items}
                havePicture={item.havePicture}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
