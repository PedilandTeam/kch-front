import { ArrowsClockwise, ShieldCheck } from "@phosphor-icons/react";
import { FC, memo, useEffect } from "react";
import { BadgeModalsProps } from "../badges";

const BlueModal: FC<BadgeModalsProps> = ({ verifyDate, updateDate, createdDate }) => {
  // const convertedVerifyDate = verifyDate ? new Date(verifyDate).toLocaleDateString('FA') : ''
  const convertedUpdateDate = updateDate ? new Date(updateDate).toLocaleDateString('FA') : ''
  const convertedCreateDate = createdDate ? new Date(createdDate).toLocaleDateString('FA') : ''

  return (
    <dialog id="blue_modal" className="modal">
      <div className="modal-box">
        <h3 className="flex items-center text-lg font-bold text-center text-sky-700">
          <ShieldCheck
            size={32}
            className="ml-2 text-sky-600"
            weight="duotone"
          />
          تـیـک آبـی
        </h3>
        <p className="pt-4">
          این واحد صنفی از تاریخ {convertedCreateDate} در راهنمای مشاغل کـوچـا حضور دارد و
          محتوای این صفحه توسط مالک آن مدیریت می‌شود.
        </p>
        <p className="flex items-center pt-2 pb-4 text-gray-500">
          <ArrowsClockwise size={14} className="ml-1" />
          بروزرسانی شده در {convertedUpdateDate}
        </p>
        <div className="flex items-center p-[10px] font-medium border border-yellow-300 rounded-md bg-yellow-50 text-[15px]">
          <p className="text-center text-yellow-800">
            کـوچـا، هیچگونه مسئولیتی در قبال خدمات این واحد صنفی ندارد.
          </p>
        </div>

        <div className="w-full modal-action">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <button className="w-full btn">متوجه شدم</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default memo(BlueModal);
