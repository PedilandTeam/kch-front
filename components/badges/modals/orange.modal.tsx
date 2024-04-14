import { ShieldWarning } from "@phosphor-icons/react";
import Link from "next/link";
import { FC } from "react";
import { BadgeModalsProps } from "../badges";

const OrangeModal: FC<{slug: string}> = ({ slug }) => {
  return (
    <dialog id="orange_modal" className="modal">
      <div className="modal-box">
        <h3 className="flex items-center text-lg font-bold text-center text-orange-500">
          <ShieldWarning
            size={32}
            className="ml-2 text-orange-400"
            weight="duotone"
          />
          تـوجـه
        </h3>
        <p className="py-4">
          اطلاعات این واحد از اینترنت جمع‌آوری شده و توسط ادمین کـوچـا مدیریت
          می‌شود. اگر شما مالک این صفحه هستید، با احراز هویت می‌توانید تیک آبی
          دریافت کنید، مدیریت اطلاعات این صفحه رو به عهده بگیرید و از امکانات{" "}
          <Link
            href={"#"}
            className="border-b border-black border-dashed hover:text-primary hover:border-primary"
            target="_blank"
          >
            بیزینس سنتر
          </Link>{" "}
          برای راهبری و توسعه کسب‌و‌کارتون استفاده کنید.
        </p>
        <div className="flex items-center p-[10px] font-medium border border-yellow-300 rounded-md bg-yellow-50 text-[15px]">
          <p className="text-center text-yellow-800">
            کوچا، هیچ مسئولیتی در قبال خدمات این واحد صنفی ندارد.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="w-full btn">متوجه شدم</button>
          </form>
          <div className="ml-0">
            <Link target="_blank" href={`${process.env.NEXT_PUBLIC_BIZ_FRONT_URL}/claim/claimWay?slug=${slug}`}>
              <button className="w-full btn btn-primary">
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
