'use client';
import { _TXT } from '@/app/text';
import { UnitType } from '@/types/unit';
import Link from 'next/link';

type ItemBreadCrumbType = {
  category: {
    name: string;
    slug: string;
  };
  country: {
    name: string;
    code: string;
  };
  unit: UnitType;
};
export const ItemBreadCrumb = ({
  category,
  country,
  unit,
}: ItemBreadCrumbType) => {
  return (
    <div className='breadcrumbs bg-blue-50 px-4 py-3 text-sm sm:bg-transparent'>
      <ul>
        <li>
          <Link href='/'>{_TXT.GENERAL.HOME}</Link>
        </li>
        <li>
          <Link href={`/${country.code}`}>{country.name}</Link>
        </li>
        <li>
          <Link href={`/${country.code}/${unit.slug}`}>
            {unit.name} {_TXT.GENERAL.PERSIAN}
          </Link>
        </li>
        <li>{category.name}</li>
      </ul>
    </div>
  );
};
