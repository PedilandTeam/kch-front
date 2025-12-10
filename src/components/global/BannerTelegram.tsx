import Image from "next/image";
import Link from "next/link";

import { WrapContainer } from "../layout/WrapContainer";
import telegramBanner from "@/assets/images/banners/bnr-telegram-01.svg";

export const BannerTelegram = ({ className }: { className?: string }) => {
  return (
    <WrapContainer className={className}>
      <Link href="https://t.me/koochaa_com">
        <Image
          src={telegramBanner}
          alt="Telegram Channel Banner"
          width={343}
          height={90}
          className="rounded-md"
        />
      </Link>
    </WrapContainer>
  );
};
