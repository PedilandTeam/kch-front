import { SealCheck, Warning } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const ItemClaim = () => {
  return (
    <>
      {/* ADMIN ALERT */}
      <div className="flex rounded-md border border-yellow-300 bg-yellow-50 p-4 mb-3 text-[15px] items-center">
        <Warning size={24} className="ml-1 text-yellow-600" weight="duotone" />
        <p className="text-yellow-800">
          این صفحه توسط ادمین کوچا مدیریت می‌شود.
        </p>
      </div>
      {/* CLAIM PAGE */}
      <div className="p-4 mb-3 border border-blue-200 rounded-md bg-blue-50">
        <div className="flex items-center content-center mb-3">
          <SealCheck size={28} weight="duotone" className="ml-2 text-sky-600" />
          <h6 className="text-[17px] font-semibold text-sky-800">
            اگر شما مالک این صفحه هستید!
          </h6>
        </div>
        <p className="text-[15px] leading-7 text-sky-800 mb-4">
          با احراز هویت می‌تونید تیک آبی دریافت کنید، مدیریت اطلاعات این صفحه رو
          به عهده بگیرید و از امکانات کوچا برای راهبری و توسعه کسب‌و‌کارتون
          استفاده کنید.
        </p>
        <Link
          href={"https://t.me/koochaa_support"}
          target="_blank"
          className="w-full btn btn-primary"
        >
          دریافت مالکیت صفحه
        </Link>
      </div>
    </>
  );
};

export default ItemClaim;
