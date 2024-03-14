import Image from "next/image";
import Link from "next/link";

const ItemClaim = () => {
  return (
    <>
      <div className="rounded-md border border-gray-200 px-5 py-4 mb-3 text-[15px]">
        <p>این صفحه توسط ادمین کوچا مدیریت می‌شود.</p>
      </div>
      <div className="rounded-md border border-gray-200 p-5 mb-3 bg-blue-50 border-l-[4px] border-l-yellow-500 rounded-tl-none rounded-bl-none">
        <div className="flex items-center content-center mb-3">
          <Image
            alt="telegram"
            src={"/images/icon/verified-badge-100.png"}
            width={36}
            height={36}
            className="ml-1"
          />
          <h6 className="text-[18px] font-semibold">
            اگر شما مالک این صفحه هستید!
          </h6>
        </div>
        <p className="text-[15px] leading-7 text-justify text-gray-700 mb-4">
          با احراز هویت می‌تونید تیک آبی دریافت کنید، مدیریت اطلاعات این صفحه رو
          به عهده بگیرید و از امکانات کوچا برای راهبری و توسعه کسب‌و‌کارتون
          استفاده کنید.
        </p>
        <Link
          href={"https://biz.koochaa.com"}
          target="_blank"
          className="w-full btn btn-active btn-secondary"
        >
          دریافت مالکیت صفحه
        </Link>
      </div>
    </>
  );
};

export default ItemClaim;
