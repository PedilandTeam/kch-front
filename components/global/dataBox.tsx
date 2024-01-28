import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type DataBox = {
  title: string;
  data: number | string;
  link: string;
  linkText: string;
};
export default function DataBox({ title, data, link, linkText }: DataBox) {
  return (
    <div className='min-w-1/12 grid h-20 grid-cols-5 grid-rows-1 items-center justify-items-center rounded-xl border-2 px-2 text-gray-600 duration-300 hover:bg-blue-600 hover:text-white sm:h-32 sm:grid-rows-2 lg:max-w-[40%]'>
      <p className='col-span-full row-start-1 font-medium sm:col-span-2  sm:row-span-full'>
        {title}
      </p>
      <p className='col-span-1 row-span-full text-center text-xl font-bold sm:text-5xl '>
        {data}
      </p>
      <div className='col-span-2 row-span-full cursor-pointer select-none'>
        <Link href={link} className='flex w-full items-center justify-center'>
          <p>{linkText}</p>
          <ChevronLeftIcon className='h-6 w-6' />
        </Link>
      </div>
    </div>
  );
}
