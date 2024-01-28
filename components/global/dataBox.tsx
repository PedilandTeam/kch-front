import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type DataBox = {
    title: string;
    data: number | string;
    link: string;
    linkText: string;
}
export default function DataBox({ title, data, link, linkText }: DataBox) {
    return (
        <div className="sm:h-32 h-20 min-w-1/12 max-2/6 px-2 grid grid-cols-5 sm:grid-rows-2 grid-rows-1 justify-items-center items-center border-2 hover:bg-blue-600 hover:text-white duration-300 text-gray-600 rounded-xl">
            <p className="sm:col-span-2 sm:row-span-full col-span-full row-start-1  font-medium">{title}</p>
            <p className="col-span-1 row-span-full font-bold sm:text-5xl text-xl text-center ">{data}</p>
            <div className="col-span-2 row-span-full cursor-pointer select-none">
                <Link href={link} className="w-full flex justify-center items-center">
                    <p>{linkText}</p>
                    <ChevronLeftIcon className="w-6 h-6" />
                </Link>
            </div>
        </div>
    )
}