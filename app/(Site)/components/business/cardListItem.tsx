import { CircleFlag } from 'next-circle-flags';
import { FolderIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import categoryPathGenerator from '@/utils/categoryPathGenerator';
import { PageNamespace } from '@/types/page';
import { CountryNamespace } from '@/types/country';
import ItemProfilePicture from '../../[countryOrSlug]/item/itemProfilePicture';

export type CardListItemVariant = 'category' | 'unit';
type cardListItem = {
    page: PageNamespace.Page;
    country: CountryNamespace.GET;
    variant: CardListItemVariant;
};

export default function CardListItem({ page, country, variant }: cardListItem) {
    return (
        <div
            key={`cardlist-page-index-${page.slug}`}
            className='card border border-gray-100 shadow-lg hover:border-gray-300'
        >
            <figure className='pt-5'>
                <Link href={`/${page.slug}`}>
                    <ItemProfilePicture
                        height={140}
                        width={140}
                        pageData={page}
                        className={'rounded-full'}
                    />
                </Link>
            </figure>
            <div className='card-body px-4 py-5'>
                <Link href={`/${page.slug}`}>
                    <h2 className='card-title block truncate text-center font-PinarLT text-lg text-slate-700 hover:overflow-visible hover:text-pink-800'>
                        {page.title}
                    </h2>
                </Link>

                <div className='card-rating mb-2 mt-1 flex justify-center'>
                    {/* @ts-ignore */}
                    <div className='rating'>
                        <input
                            type='radio'
                            name='rating-1'
                            className='mask mask-star-2 h-[24px] w-[24px] bg-gray-200'
                        />
                        <input
                            type='radio'
                            name='rating-2'
                            className='mask mask-star-2 h-[24px] w-[24px] bg-gray-200'
                        />
                        <input
                            type='radio'
                            name='rating-2'
                            className='mask mask-star-2 h-[24px] w-[24px] bg-gray-200'
                        />
                        <input
                            type='radio'
                            name='rating-2'
                            className='mask mask-star-2 h-[24px] w-[24px] bg-gray-200'
                        />
                        <input
                            type='radio'
                            name='rating-2'
                            className='mask mask-star-2 h-[24px] w-[24px] bg-gray-200'
                        />
                    </div>
                    {/* <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                      (0 نظر)
                    </span> */}
                </div>

                <div className='card-tools mb-1 flex w-full justify-center text-[15px] text-gray-600'>
                    <div className='ml-2 flex'>
                        <CircleFlag
                            alt={`پرچم کشور ${country.name}`}
                            width={5}
                            height={5}
                            countryCode={page?.country?.code}
                            className='ml-1 w-5'
                            title={page?.country?.name}
                        />
                        <p className='truncate'>{page?.city?.name}</p>
                    </div>
                    <div className='flex content-center justify-center'>
                        <FolderIcon className='ml-1 w-5 text-gray-400' />
                        {variant == 'category' ? (
                            <span className='truncate'>
                                {page?.category?.name}
                            </span>
                        ) : (
                            <Link
                                href={categoryPathGenerator(
                                    country.code,
                                    page.unit?.slug,
                                    page.category.slug
                                )}
                            >
                                <span className='truncate'>
                                    {page?.category?.name}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
