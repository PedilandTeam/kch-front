"use client"

import { Tooltip } from "@chakra-ui/react";
import { GENERAL } from "../allTexts";
import { useEffect, useState } from "react";

export const OpenHours = ({ variant }: {variant?: undefined}) => {
  const [color, setColor] = useState<string | undefined>();
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
    setColor(colors[variant ?? "close"] ? colors[variant ?? "close"] : colors["default"]);
  }, [variant]);

  useEffect(() => {
    console.log(color);
  }, [color]);



    return (
      <div className="open-hours">
        <Tooltip label={GENERAL.IS_OPEN} placement="top">
          <span
            className={`flex w-3 h-3  rounded-full border ${
              variantStyles[variant ?? "close"] ?? variantStyles["default"]
            } hover:cursor-help`}
          ></span>
        </Tooltip>
      </div>
    );
  }

