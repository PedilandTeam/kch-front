import { type FC, memo } from "react";
import type { BadgeModalsProps } from "../badges";
import {
  ArrowsClockwiseIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";

const BlueModal: FC<BadgeModalsProps> = ({
  verifyDate,
  updateDate,
  createdDate,
}) => {
  // const convertedVerifyDate = verifyDate ? new Date(verifyDate).toLocaleDateString('FA') : ''
  const convertedUpdateDate = updateDate
    ? new Date(updateDate).toLocaleDateString("FA")
    : "";
  const convertedCreateDate = createdDate
    ? new Date(createdDate).toLocaleDateString("FA")
    : "";

  return (
    <dialog id="blue_modal" className="modal">
      <div className="modal-box">
        <h3 className="flex items-center text-center text-lg font-bold text-sky-700">
          <ShieldCheckIcon
            size={32}
            className="ml-2 text-sky-600"
            weight="duotone"
          />
          تـیـک آبـی
        </h3>
        <p className="pt-4">
          این واحد صنفی از تاریخ {convertedCreateDate} در راهنمای مشاغل کـوچـا
          حضور دارد و محتوای این صفحه توسط مالک آن مدیریت می‌شود.
        </p>
        <p className="flex items-center pt-2 pb-4 text-gray-500">
          <ArrowsClockwiseIcon size={14} className="ml-1" />
          بروزرسانی شده در {convertedUpdateDate}
        </p>
        <div className="flex items-center rounded-md border border-yellow-300 bg-yellow-50 p-[10px] text-[15px] font-medium">
          <p className="text-center text-yellow-800">
            کـوچـا، هیچگونه مسئولیتی در قبال خدمات این واحد صنفی ندارد.
          </p>
        </div>

        <div className="modal-action w-full">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn w-full">متوجه شدم</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default memo(BlueModal);
