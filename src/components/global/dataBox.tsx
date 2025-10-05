import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

type DataBox = {
  title: string;
  data: number | string;
  link: string;
  linkText: string;
};
export default function DataBox({ title, data, link, linkText }: DataBox) {
  return (
    <div className="text-2 grid h-32 w-full grid-cols-5 grid-rows-1 items-center justify-items-center rounded-xl border-2 px-2 text-gray-600 duration-300 hover:bg-blue-600 hover:text-white sm:grid-rows-2 lg:max-w-[40%]">
      <p className="col-span-full row-start-1 font-medium sm:col-span-2 sm:row-span-full">
        {title}
      </p>
      <Balance balance={data} />
      <div className="col-span-2 row-span-full cursor-pointer select-none">
        <Link href={link} className="flex w-full items-center justify-center">
          <p>{linkText}</p>
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

function Balance({ balance }: { balance: number | string }) {
  const balanceDigits = balance.toString().length;
  let sizeClass;

  if (balanceDigits <= 3) {
    sizeClass = "text-4xl";
  } else if (balanceDigits <= 5) {
    sizeClass = "text-3xl";
  } else {
    sizeClass = "text-xl lg:text-2xl";
  }

  return (
    <p
      className={`balance col-span-1 row-span-full max-w-[20ch] truncate px-2 text-center font-bold ${sizeClass}`}
    >
      {balance}
    </p>
  );
}
