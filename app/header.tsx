
"use client";
import { LogoTop } from "./[...path]/layout/logo";
import { TopTools } from "./[...path]/layout/toptools";
import { OffCanvas } from "./[...path]/layout/offcanvas";
import { ModalCountry } from "./[...path]/layout/modalcountry";
import { CountryNamespace } from "@/types/country";

type HeaderProps = {
  children: React.ReactNode
}
export const Header = ({children}: HeaderProps) => {
  return (
    <header>
      <div className="container mx-auto max-w-[1144px]">
        <div className="flex justify-between py-3 mx-3 sm:mx-0">
          <LogoTop />
          <TopTools/>
        </div>
      </div>
      <OffCanvas />
      {children}
    </header>
  );
};
