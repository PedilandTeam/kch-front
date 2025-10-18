import Link from "next/link";
import type { FC } from "react";
import { ContainerProvider } from "@providers";

import { Button } from "@components";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

interface ItemClaimProps {
  enable: boolean;
  slug: string;
}

export const ItemClaim: FC<ItemClaimProps> = ({ enable, slug }) => {
  return enable ? (
    <>
      <ContainerProvider>
        <div className="space-y-3 rounded-md border border-blue-100 bg-blue-50/50 p-5 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon
              size={24}
              weight="duotone"
              className="text-secondary"
            />
            <h6 className="text-primary font-semibold">
              اگر شما مالک این صفحه هستید!
            </h6>
          </div>

          <p className="text-primary text-[15px]">
            با احراز هویت می‌تونید تیک آبی دریافت کنید، مدیریت اطلاعات این صفحه
            رو به عهده بگیرید و از امکانات کوچا برای راهبری و توسعه کسب‌و‌کارتون
            استفاده کنید.
          </p>

          <Button asChild className="mt-1 w-full">
            <Link href="https://t.me/koochaa_support" target="_blank">
              دریافت مالکیت صفحه
            </Link>
          </Button>
        </div>
      </ContainerProvider>
    </>
  ) : null;
};
