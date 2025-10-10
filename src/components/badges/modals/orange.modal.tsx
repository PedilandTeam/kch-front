import { ShieldWarningIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { FC } from "react";

const OrangeModal: FC<{ slug: string }> = ({ slug }) => {
  return (
    <dialog id="orange_modal" className="modal">
      <div className="modal-box">
        <h3 className="flex items-center text-center text-lg font-bold text-orange-500">
          <ShieldWarningIcon
            size={32}
            className="ml-2 text-orange-400"
            weight="duotone"
          />
          تـوجـه
        </h3>
        <p className="py-4">
          اطلاعات این صفحه از اینترنت جمع‌آوری شده و در حال حاضر توسط ادمین
          کـوچـا مدیریت می‌شود. اگر شما مالک این واحد صنفی هستید، می‌توانید با
          احراز هویت خود تیک آبی دریافت کنید، مدیریت اطلاعات این صفحه رو به عهده
          بگیرید و از امکانات{" "}
          <Link
            href={process.env.NEXT_PUBLIC_BIZ_FRONT_URL}
            className="hover:text-primary hover:border-primary border-b border-dashed border-black"
            target="_blank"
          >
            بیزینس سنتر
          </Link>{" "}
          برای راهبری و توسعه کسب‌و‌کارتون استفاده کنید.
        </p>
        <div className="flex items-center rounded-md border border-yellow-300 bg-yellow-50 p-[10px] text-[15px] font-medium">
          <p className="text-center text-yellow-800">
            <strong>بسیار مهم:</strong> کوچا، هیچ مسئولیتی در قبال خدمات این
            واحد صنفی ندارد.
          </p>
        </div>

        <div className="modal-action grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn w-full">متوجه شدم</button>
          </form>
          <div className="ml-0">
            <Link
              rel="nofollow"
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_BIZ_FRONT_URL}/claim/claimWay?slug=${slug}`}
            >
              <button className="btn btn-primary w-full">
                مالک این صفحه هستم
              </button>
            </Link>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default OrangeModal;
