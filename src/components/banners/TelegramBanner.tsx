import Image from "next/image";
import Link from "next/link";

import { WrapContainer } from "@/components/layout/WrapContainer";
import telegramBanner from "@/assets/images/banners/bnr-telegram-01.webp";

export const TelegramBanner = ({ className }: { className?: string }) => {
  return (
    <WrapContainer className={className}>
      <Link href="https://t.me/koochaa_com">
        <Image
          src={telegramBanner}
          alt="Telegram Channel Banner"
          width={400}
          height={105}
          className="rounded-md"
        />
      </Link>
    </WrapContainer>
  );
};
