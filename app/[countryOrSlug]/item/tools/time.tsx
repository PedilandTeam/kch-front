import { DAYS, MAH, MONTHES, STATUS } from "@/app/text/calendar";
import { GENERAL } from "@/app/text/general";
import { Clock } from "app/client-packages/phosphor-icons/react";

const ItemTime: React.FC = () => {
  return (
    // WORK TIME
    <>
      {/* Close */}
      {/* <div className="p-4 mb-3 border border-red-200 rounded-md bg-opacity-60 bg-red-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-red-600">
            <Clock size={20} className="ml-1" />
            <span className="font-medium">{STATUS.CLOSE}</span>
          </div>
          <div>
            <span className="text-[15px]">{GENERAL.WORKING_HOURS}</span>
            <span className="mr-2">9:00 {GENERAL.TO} 17:00</span>
          </div>
        </div>
        <div className="flex items-center justify-around pt-3 mt-3 border-t border-gray-300 border-dashed">
          <span className="font-medium">{GENERAL.TODAY}:</span>
          <span className="text-[15px]">{DAYS.WEDNESDAY}</span>
          <span className="text-lg text-gray-300">|</span>
          <span className="text-[15px]">27 {MONTHES.MARCH} 2024</span>
          <span className="text-lg text-gray-300">|</span>
          <span className="text-[15px]">23 {MAH.FAR} 1403</span>
        </div>
      </div> */}
      {/* Open */}
      {/* <div className="p-4 mb-3 border border-green-200 rounded-md bg-opacity-60 bg-green-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-600">
            <Clock size={20} className="ml-1" />
            <span className="font-medium">{STATUS.OPEN}</span>
          </div>
          <div>
            <span className="text-[15px]">{GENERAL.WORKING_HOURS}</span>
            <span className="mr-2">9:00 {GENERAL.TO} 17:00</span>
          </div>
        </div>
        <div className="flex items-center justify-around pt-3 mt-3 border-t border-gray-300 border-dashed">
          <span className="font-medium">{GENERAL.TODAY}:</span>
          <span className="text-[15px]">{DAYS.WEDNESDAY}</span>
          <span className="text-lg text-gray-300">|</span>
          <span className="text-[15px]">27 {MONTHES.MARCH} 2024</span>
          <span className="text-lg text-gray-300">|</span>
          <span className="text-[15px]">23 {MAH.FAR} 1403</span>
        </div>
      </div> */}
      {/* Not Set */}
      <div className="p-4 mb-3 border rounded-md border-gay-200 bg-opacity-60 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock size={20} className="ml-1" />
            <span className="font-medium">---</span>
          </div>
          <div className="text-gray-500">
            <span className="text-[15px]">{GENERAL.WORKING_HOURS}</span>{" "}
            <span className="text-[15px]">{STATUS.NOT_SET}</span>
          </div>
        </div>
        <div className="flex items-center justify-around pt-3 mt-3 border-t border-gray-300 border-dashed">
          <span className="font-medium">{GENERAL.TODAY}:</span>
          <span className="text-[15px]">{DAYS.WEDNESDAY}</span>
          <span className="text-lg text-gray-300">|</span>
          <span className="text-[15px]">27 {MONTHES.MARCH} 2024</span>
          <span className="text-lg text-gray-300">|</span>
          <span className="text-[15px]">23 {MAH.FAR} 1403</span>
        </div>
      </div>
    </>
  );
};

export default ItemTime;
