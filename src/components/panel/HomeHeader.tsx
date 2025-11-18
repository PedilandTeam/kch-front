import Image from "next/image";
import { AdsClubLogo } from "./adsClubLogo";
import logoImage from "@/assets/images/logo.png";

import { useTelegramAuth } from "@/store/useTelegramAuth";

export const HomeHeader = () => {
  const { userData, isLoading } = useTelegramAuth();

  return (
    <header className="flex items-center justify-between gap-3">
      <div>
        <div className="text-[13px] text-gray-500">
          {isLoading ? "..." : `${userData?.user?.first_name} عـزیـز،`}
        </div>
        <div className="font-semibold text-blue-900">خـوش آمـدیـد!</div>
      </div>

      <div className="flex items-center gap-2">
        <AdsClubLogo />
        <Image src={logoImage} alt="logo" width={40} height={40} />
      </div>
    </header>
  );
};
