
import { LogoTop } from "./layout/logo";
import { TopTools } from "./layout/toptools";
import { OffCanvas } from "./layout/offcanvas";
import { ModalCountry } from "./layout/modalcountry";
import { CountryNamespace } from "@/types/country";
import {headers} from "next/headers"
import { API_ROUTES } from "@/routes";

type HeaderProps = {
  children: React.ReactNode
}
export const Header = ({children}: HeaderProps) => {

  // const header = headers()
  // const path = decodeURIComponent(header.get('x-invoke-path')!)?.replace(/\//g, "")
  // console.log(path);
  

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
