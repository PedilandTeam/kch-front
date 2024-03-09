import { AdCategoryNamepace } from '@/types/adCategory';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export type SubMenu = {
    items: AdCategoryNamepace.IAdCategory[];
    basePath: string;
};

export default function SubMenu({ items, basePath }: SubMenu) {
    const path = usePathname();
    const isOpen = useMemo(
        () => (item: AdCategoryNamepace.IAdCategory) => {
            return (
                path === `${basePath}/${item.slug}` ||
                item.subCategories?.some(
                    (child) => path === `${basePath}/${child.slug}`
                )
            );
        },
        [path, basePath]
    );

    const isInBasePath = useMemo(() => path !== basePath, [path, basePath])

    return (
        <ul className='menu my-4 flex w-full items-center justify-center rounded-box'>
            {isInBasePath && (
                <Link
                    className='w-full hover:bg-transparent hover:text-black'
                    href={`${basePath}`}
                >
                    <li className='w-full flex flex-row items-center'><ArrowRightIcon className='w-6 mx-0 px-1 hover:bg-transparent'/>همه آگهی‌ها</li>
                </Link>
            )}
            {items?.map((item) => {
                if (item.parent) return;
                return (
                    <Link
                        className='w-full'
                        href={`${basePath}/${item.slug}`}
                        key={item.name}
                    >
                        <li className='w-full' key={item.name}>
                            <details
                                className={`${isOpen(item) ? 'text-black' : 'text-black/60'}`}
                                open={isOpen(item)}
                            >
                                <summary className=' after:hidden hover:bg-transparent hover:text-black'>
                                    {item.name}
                                </summary>
                                <ul>
                                    {items?.map((subItem) => {
                                        if (subItem?.parent?.slug !== item.slug)
                                            return;

                                        return (
                                            <li
                                                className='w-full'
                                                key={subItem.name}
                                            >
                                                <Link
                                                    className={`my-1 h-fit w-full border-0 py-1 text-xs hover:bg-transparent hover:text-black ${isOpen(subItem) ? 'text-black' : 'text-black/60'}`}
                                                    href={`${basePath}/${subItem.slug}`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
}
