"use client";

import React, { memo, useState } from "react";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AdStatsChart = () => {
  const options: ApexOptions = {
    chart: {
      height: 450,
      type: "area",
      toolbar: {
        show: false,
        tools: {
          zoom: true,
          zoomin: false,
          zoomout: false,
        },
      },
      offsetX: 0,
      offsetY: 0,
      sparkline: {
        enabled: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "transparent",
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
      },
    },
    colors: ["purple", "red"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
        format: "dd/MM/yy HH:mm",
      },
    },

    grid: {
      show: false,
    },
  };

  const [series, setSeries] = useState<any>([
    {
      name: "series1",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]);

  return (
    <div className="">
      <div className="flex w-full flex-col items-start">
        <p className="mr-2 self-start text-base font-extrabold text-gray-300">
          رشد بازدیدها
        </p>
        <p className="mr-2 text-[0.5rem] text-red-400">
          به دلیل اینکه هنوز رشدی ندارید <br /> چارت‌ها مقدار تصادفی دارند !
        </p>
      </div>
      <ReactApexChart
        options={options}
        type={"area"}
        series={series}
        height={200}
        width={280}
      />
    </div>
  );
};

export default memo(AdStatsChart);
