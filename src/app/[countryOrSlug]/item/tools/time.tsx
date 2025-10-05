import { STATUS } from "@/text/calendar";
import { GENERAL } from "@/text/general";
import { Clock } from "@phosphor-icons/react";
import { useMemo } from "react";

const ItemTime: React.FC = () => {
  const date = useMemo(() => new Date(), []);

  const jalaliDate = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      calendar: "persian",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formatter.format(date);
  }, [date]);

  const miladiDate = useMemo(() => {
    // Create an Intl.DateTimeFormat instance for Persian locale but Gregorian calendar
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "gregory", // Explicitly use the Gregorian calendar
    });

    // Format the date
    return formatter.format(date);
  }, [date]);

  const dayName = useMemo(() => {
    const dayFormatter = new Intl.DateTimeFormat("fa-IR", {
      weekday: "long", // Option to get the full name of the weekday
    });

    // Format the date to get the weekday
    return dayFormatter.format(date);
  }, [date]);

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
      <div className="border-gay-200 mb-3 rounded-md border bg-gray-50 bg-opacity-60 p-4">
        <div className="flex items-center justify-between text-[15px]">
          <span className="font-medium">{GENERAL.TODAY}:</span>
          <span>{dayName}</span>
          <span className="text-lg text-gray-300">|</span>
          <span>{miladiDate}</span>
          <span className="text-lg text-gray-300">|</span>
          <span>{jalaliDate}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-300 pt-3">
          <div className="flex items-center">
            <Clock size={22} className="ml-1" />
            <span className="tracking-widest text-gray-500">---</span>
          </div>
          <div className="text-gray-500">
            <span className="text-[15px]">{GENERAL.WORKING_HOURS}</span>{" "}
            <span className="text-[15px]">{STATUS.NOT_SET}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTime;
