import Image from "next/image";
import { AdsClubLogo } from "./adsClubLogo";

export const HomeHeader = () => {
  return (
    <header className="mb-5 flex items-center justify-between gap-3">
      <div>
        <div className="text-[13px] text-gray-500">پدرام عـزیـز،</div>
        <div className="font-semibold text-blue-900">خـوش آمـدیـد!</div>
      </div>

      <div className="flex items-center gap-2">
        <AdsClubLogo />
        <Image src="/images/logo-01.png" alt="logo" width={40} height={40} />
      </div>
    </header>
  );
};
