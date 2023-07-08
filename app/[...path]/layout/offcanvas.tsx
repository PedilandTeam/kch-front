import { MENU } from "@/components/allTexts";
import Image from "next/image";
import Link from "next/link";

export const OffCanvas = () => {
  return (
    <div className="drawer drawer-end z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="menu p-4 w-80 h-full bg-gray-50 text-base-content">
          <div className="logo mb-5 w-[180px] h-[56px] sm:w-[170px] sm:h-[50px] relative">
            <Link href="/">
              <Image src="/img/logo.svg" fill={true} alt="Pediland Logo" />
            </Link>
          </div>
          <ul>
            <li>
              <Link href="#" className="p-3 text-[16px]">
                {MENU.BUSINESSES}
              </Link>
            </li>
            <li>
              <Link href="#" className="p-3 text-[16px]">
                {MENU.DOCTORS}
              </Link>
            </li>
            <li>
              <Link href="/de" className="p-3 text-[16px]">
                {MENU.COMMUNITIES}
              </Link>
            </li>
            <li>
              <Link href="/de" className="p-3 text-[16px]">
                {MENU.FREELANCERS}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
