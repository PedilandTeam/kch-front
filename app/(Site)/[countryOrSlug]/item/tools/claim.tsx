import { ShieldCheck } from "@client-packages/phosphor-icons/react";
import Link from "next/link";
import { FC } from "react";

type ItemClaim = {
  enable: boolean;
  slug: string;
};
const ItemClaim: FC<ItemClaim> = ({ enable, slug }) => {
  return enable ? (
    <>
      {/* ADMIN ALERT */}

      {/* CLAIM PAGE */}
      <div className="p-4 mb-3 border border-blue-200 rounded-md bg-blue-50">
        <div className="flex items-center content-center mb-3">
          <ShieldCheck
            size={28}
            weight="duotone"
            className="ml-2 text-sky-600"
          />
          <h6 className="text-[17px] font-semibold text-sky-800">
            اگر شما مالک این صفحه هستید!
          </h6>
        </div>
        <p className="mb-4 leading-[26px] text-sky-800">
          با احراز هویت می‌تونید تیک آبی دریافت کنید، مدیریت اطلاعات این صفحه رو
          به عهده بگیرید و از امکانات کوچا برای راهبری و توسعه کسب‌و‌کارتون
          استفاده کنید.
        </p>
        <Link
          rel="nofollow"
          target="_blank"
          className="w-full btn btn-primary"
          href={`${process.env.NEXT_PUBLIC_BIZ_FRONT_URL}/claim/claimWay?slug=${slug}`}
        >
          دریافت مالکیت صفحه
        </Link>
      </div>
    </>
  ) : null;
};

export default ItemClaim;
