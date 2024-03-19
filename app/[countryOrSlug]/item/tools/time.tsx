import { DAYS } from "@/app/text/calendar";
import { GENERAL } from "@/app/text/general";

interface HourRange {
  start: string;
  end: string;
}

interface DaySchedule {
  day: keyof typeof DAYS;
  hours: HourRange[] | "CLOSED";
  highlight?: boolean;
}

const schedule: DaySchedule[] = [
  {
    day: "MONDAY",
    hours: [{ start: "", end: "" }],
    highlight: false,
  },
  {
    day: "TUESDAY",
    hours: [{ start: "", end: "" }],
  },
  {
    day: "WEDNESDAY",
    hours: [{ start: "", end: "" }],
  },
  {
    day: "TURSDAY",
    hours: [{ start: "", end: "" }],
  },
  {
    day: "FRIDAY",
    hours: [{ start: "", end: "" }],
  },
  {
    day: "SATURDAY",
    hours: [{ start: "", end: "" }],
  },
  {
    day: "SUNDAY",
    hours: [{ start: "", end: "" }],
    // hours: "CLOSED",
  },
];

import React from "react";

const ItemTime: React.FC = () => {
  return (
    // WORK TIME
    <div className="p-4 mb-3 border border-gray-200 rounded-md">
      <h3 className="flex items-center justify-between mb-3 font-semibold sm:mb-5">
        <span>{GENERAL.WORKING_HOURS}</span>
        <div className="border bg-stone-200 border-stone-300 rounded-full w-[14px] h-[14px]"></div>
      </h3>

      <div className="mb-1">
        {schedule.map(({ day, hours, highlight }) => (
          <div
            key={day}
            className={`flex items-center justify-between px-2 py-[6px] border-b border-dashed first:border-t text-[15px] ${
              highlight ? "text-green-700 border-green-500 bg-green-50" : ""
            } ${
              hours === "CLOSED" ? "text-red-400 bg-red-100 border-red-500" : ""
            }`}
          >
            <span>{DAYS[day]}</span>
            <div>
              {hours === "CLOSED" ? (
                <span>{GENERAL.CLOSED}</span>
              ) : (
                hours.map((hour, index) => (
                  <React.Fragment key={index}>
                    <span className="text-[13px] font-PinarLT">
                      {hour.start}
                      <span className="mx-1">-</span>
                      {hour.end}
                    </span>
                    {index < hours.length - 1 && (
                      <span className="mx-3">,</span>
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemTime;
