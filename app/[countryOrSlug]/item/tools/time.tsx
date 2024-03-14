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
    hours: [
      { start: "8:00", end: "14:00" },
      { start: "16:00", end: "22:00" },
    ],
    highlight: true,
  },
  {
    day: "TUESDAY",
    hours: [{ start: "8:00", end: "22:00" }],
  },
  {
    day: "WEDNESDAY",
    hours: [{ start: "8:00", end: "22:00" }],
  },
  {
    day: "TURSDAY",
    hours: [{ start: "8:00", end: "22:00" }],
  },
  {
    day: "FRIDAY",
    hours: [{ start: "8:00", end: "22:00" }],
  },
  {
    day: "SATURDAY",
    hours: [{ start: "8:00", end: "22:00" }],
  },
  {
    day: "SUNDAY",
    hours: "CLOSED",
  },
];

import React from "react";

const ItemTime: React.FC = () => {
  return (
    <div className="relative item-description">
      <div className="p-4 border border-gray-200 rounded-md select-none">
        <h3 className="mb-5 font-semibold">{GENERAL.WORKING_HOURS}</h3>
        <div>
          {schedule.map(({ day, hours, highlight }) => (
            <div
              key={day}
              className={`flex items-center justify-between px-2 py-1 text-sm ${
                highlight
                  ? "font-semibold text-teal-500 border-t border-b border-teal-200 border-dashed bg-teal-50"
                  : "border-b border-dashed"
              } ${hours === "CLOSED" ? "text-red-400" : ""}`}
            >
              <span>{DAYS[day]}</span>
              <div>
                {hours === "CLOSED" ? (
                  <span>{GENERAL.CLOSED}</span>
                ) : (
                  hours.map((hour, index) => (
                    <React.Fragment key={index}>
                      <span>
                        {hour.start}
                        <span className="mx-1 text-gray-400">-</span>
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
    </div>
  );
};

export default ItemTime;
