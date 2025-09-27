import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
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
      <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 p-4">
        <div className="mb-3 flex content-center items-center">
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
          className="btn btn-primary w-full"
          href={`${process.env.NEXT_PUBLIC_BIZ_FRONT_URL}/claim/claimWay?slug=${slug}`}
        >
          دریافت مالکیت صفحه
        </Link>
      </div>
    </>
  ) : null;
};

export default ItemClaim;
