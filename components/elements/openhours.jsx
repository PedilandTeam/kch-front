import { Tooltip } from "@chakra-ui/react";
import { GENERAL } from "../util/allTexts";
import { useEffect, useState } from "react";
import classNames from "classnames";

export const OpenHours = ({ variant }) => {
  const [color, setColor] = useState(false);
  const colors = {
    open: "green",
    close: "red",
    default: "gray",
  };

  const variantStyles = {
    open: "bg-green-300 border-green-400",
    close: "bg-red-300 border-red-400",
    default: "bg-gray-300 border-gray-400",
  };

  useEffect(() => {
    console.log(variant);
    setColor(colors[variant] ? colors[variant] : colors["default"]);
  }, [variant]);

  useEffect(() => {
    console.log(color);
  }, [color]);

  if (color)
    return (
      <div className="open-hours">
        <Tooltip label={GENERAL.IS_OPEN} placement="top">
          <span
            className={`flex w-3 h-3  rounded-full border ${
              variantStyles[variant] ?? variantStyles["default"]
            } hover:cursor-help`}
          ></span>
        </Tooltip>
      </div>
    );
};
