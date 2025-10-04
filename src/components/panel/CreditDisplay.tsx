"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePointsStore } from "@/store/usePointsStore";

export const CreditDisplay = () => {
  const { points } = usePointsStore();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300); // مدت افکت
    return () => clearTimeout(timer);
  }, [points]);

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`text-secondary text-xl font-bold transition-transform duration-300 ${
          animate ? "scale-125 text-yellow-500" : ""
        }`}
      >
        {points}
      </span>
      <Image
        src="/images/icons/icon-coins-2.png"
        width={32}
        height={32}
        alt="coin"
      />
    </div>
  );
};
