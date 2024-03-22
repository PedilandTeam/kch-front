import { CircleFlag } from 'next-circle-flags';
import { FolderIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import categoryPathGenerator from '@/utils/categoryPathGenerator';
import { PageNamespace } from '@/types/page';
import { CountryNamespace } from '@/types/country';
import { AdNamespace } from '@/types/ad';
import AdPicture from '../../[countryOrSlug]/[unitSlugOrAds]/ads/ad/adPicture';

type cardListItem = {
    ad: AdNamespace.IAd,
    country: CountryNamespace.GET;
    variant: 'category' | 'unit';
};

export default function CardListItem({ ad, country, variant }: cardListItem) {
    return (
        <div
            className='card border border-gray-100 shadow-lg hover:border-gray-300'
        >
            <figure className='pt-5'>
                <Link href={`/${ad.id}`}>
                    <AdPicture
                        height={140}
                        width={140}
                        adData={ad}
                        className={'rounded-full'}
                    />
                </Link>
            </figure>
            <div className='card-body px-4 py-5'>
                <Link href={`/${ad.id}`}>
                    <h2 className='card-title block truncate text-center font-PinarLT text-lg text-slate-700 hover:overflow-visible hover:text-pink-800'>
                        {ad.title}
                    </h2>
                </Link>

                <div className='card-tools mb-1 flex w-full justify-center text-[15px] text-gray-600'>
                    <div className='ml-2 flex'>
                        <CircleFlag
                            alt={`پرچم کشور ${country.name}`}
                            width={5}
                            height={5}
                            countryCode={ad?.country?.code}
                            className='ml-1 w-5'
                            title={ad?.country?.name}
                        />
                        <p className='truncate'>{ad?.city?.name}</p>
                    </div>
                    <div className='flex content-center justify-center'>
                        <FolderIcon className='ml-1 w-5 text-gray-400' />
                        {variant == 'category' ? (
                            <span className='truncate'>
                                {ad?.category?.name}
                            </span>
                        ) : (
                            <Link
                                href={`/ads/${ad.id}`}
                            >
                                <span className='truncate'>
                                    {ad?.category?.name}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
