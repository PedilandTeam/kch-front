'use client';
import { UNITS_LIST_ARRAY } from '@/routes';
import { CategoryNamespace } from '@/types/category';
import { CountryNamespace } from '@/types/country';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type CountryCategoriesItemsProps = {
  recentlyUpdatedCategories: CategoryNamespace.MOST_USED;
  currentCountry: CountryNamespace.GET;
};

export default function CountryCategoriesItems({
  recentlyUpdatedCategories,
  currentCountry,
}: CountryCategoriesItemsProps) {
  const units = UNITS_LIST_ARRAY;

  const [activeTab, setActive] = useState<number>(1);
  const activeTabChangeHandler = (value: number) => {
    setActive(value);
  };

  type emptyUnitsType = {
    unit: string;
    childs: number;
  };
  const unitFinder = (unitId: number) => {
    const unit = UNITS_LIST_ARRAY.find((unit) => unit.id == unitId);
    if (unit?.categories) {
      unit.categories = [];
    }
    return unit;
  };

  return (
    <>
      <div className='text-center'>
        {units.map((unit) => {
          if (recentlyUpdatedCategories[`${unit.id}`]?.length == 0) {
            return;
          }
          return (
            <a
              onClick={() => activeTabChangeHandler(unit.id)}
              key={`unit-${unit.id}`}
              className={`tab-bordered tab h-16 border-b-[3px] px-3 text-[18px] font-medium sm:px-6 ${
                activeTab == unit.id ? 'tab-active border-secondary' : ''
              } `}
            >
              {unit.name} فارسی زبان
            </a>
          );
        })}
      </div>
      <div className='content mx-3 mt-8 flex flex-wrap justify-center gap-4 sm:mx-0'>
        {recentlyUpdatedCategories[`${activeTab}`]?.map((category, index) => {
          return (
            <Link
              scroll
              className='w-full  sm:basis-1/6'
              key={'country-category' + category.id}
              href={`/${currentCountry.code}/${
                unitFinder(category.unitId)?.slug
              }/${category.slug}`}
            >
              <div
                key={`country-category-list-${category.id}${index}`}
                className='cat-card group flex items-center justify-center rounded-md border border-gray-200
                py-3 pl-0 pr-4 font-medium transition-all hover:border-blue-300 hover:bg-blue-100 hover:bg-opacity-20 sm:flex-row sm:flex-wrap sm:pb-0 sm:pl-4 sm:font-normal sm:hover:font-medium'
              >
                <Image
                  src='/images/icon/category.svg'
                  height={40}
                  width={40}
                  alt=''
                  className='ml-4 sm:ml-0'
                />
                <div className='mb-5 mt-4 flex h-[48px] w-full items-center group-hover:text-blue-900 sm:justify-center sm:text-center'>
                  {category.name}
                </div>
                <span className='ml-5 flex h-[42px] min-w-[42px] items-center justify-center rounded-full border bg-white pt-[4px] text-[18px] group-hover:border-blue-300 group-hover:font-bold group-hover:text-blue-900 sm:-mb-[1px] sm:h-[34px] sm:min-w-[42px] sm:items-end sm:rounded-bl-none sm:rounded-br-none sm:border-b-white sm:pt-0 sm:leading-none sm:group-hover:border-b-white sm:group-hover:border-l-blue-300 sm:group-hover:bg-white'>
                  {category.pageCount}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
