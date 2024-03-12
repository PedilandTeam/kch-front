import fetchAdCategories from '@/modules/fetchAdCategories';
import { CountryNamespace } from '@/types/country';
import Image from 'next/image';
import Link from 'next/link';

export type AdCategoryMobileFilter = {
    categorySlug?: string;
    country: CountryNamespace.GET;
};
export default async function AdCategoryMobileFilter({
    categorySlug,
    country
}: AdCategoryMobileFilter) {
    const adCategories = await fetchAdCategories({ justMain: true });

    const current = adCategories.find(
        (category) => category.slug === categorySlug
    );
    const childs = current?.subCategories;

    // if categorySlug Props have an value like /transportation or car than we
    // map on children of that categorySlug other wise map on parent categories
    let shouldBeMap = categorySlug ? childs : adCategories;

    return (
        <div className='mx-auto grid w-full grid-cols-4 grid-rows-2 place-items-center justify-center gap-y-3 gap-x-1 px-5 my-10 lg:hidden'>
            {shouldBeMap?.map((category) => {
                return (
                    <div
                        className='relative col-span-1 row-span-1 flex h-full shrink-0 flex-col items-center justify-start pb-2 gap-y-1'
                        key={category.id}
                    >
                        <div className='relative h-12 w-12'>
                            <Link href={`/${country.code}/ads/${category.slug}`}>
                                <Image
                                    src={`/categories/${category.slug}.png`}
                                    fill
                                    alt=''
                                />
                            </Link>
                        </div>
                        <p className='max-w-[26ch] text-center text-[0.75rem] font-medium text-gray-500'>
                            {category.name}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
