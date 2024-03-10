'use client'

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import CardListItem from './cardListItem';
import { AdNamespace } from '@/types/ad';
import { CountryNamespace } from '@/types/country';
import wretch from 'wretch';
import { AdCategoryNamepace } from '@/types/adCategory';

type Meta = {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
};

type CardsListClientProps = {
    category: AdCategoryNamepace.IAdCategory
    country: CountryNamespace.GET;
    limit: number;
};

const CardsListClient: React.FC<CardsListClientProps> = ({
    category,
    country,
    limit,
}) => {
    const [ads, setAds] = useState<AdNamespace.IAd[]>([]);
    const [meta, setMeta] = useState<Meta>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fetchAds = async (page: number) => {
        setLoading(true);
        try {
            const response: AdNamespace.GET = await wretch(
                `${process.env.NEXT_PUBLIC_API_URL}/ads?page=${page}&limit=${limit}&countryCode=${country.code}&categoryId=${category.id}`
            ).get().json();

            setHasMore(response.meta.totalPages > page);
            setAds((prevAds) => [...prevAds, ...response.items]);
            setMeta(response.meta);
            setCurrentPage(page);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchAds(currentPage);
    // }, []); // Fetch ads on component mount

    const loadMore = () => {
        if (!loading && !error && hasMore) {
            fetchAds(currentPage + 1);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='list-card min-h-[500px] w-full'>
                <InfiniteScroll
                    className='mt-4 grid h-full w-full grid-cols-1 gap-y-4 overflow-y-hidden py-4 sm:grid-cols-3 sm:gap-6'
                    hasMore={hasMore}
                    loadMore={loadMore}
                    loader={<h4>در حال بارگذاری</h4>}
                >
                    {ads.map((ad: AdNamespace.IAd) => (
                        <CardListItem
                            key={ad.id}
                            variant='category'
                            ad={ad}
                            country={country}
                        />
                    ))}
                </InfiniteScroll>
                {error && (
                    <p className='mt-4 w-full text-center'>
                        خطایی رخ داد و اطلاعات دریافت نشد.
                    </p>
                )}
                {!hasMore && (
                    <p className='mt-4 w-full text-center'>
                        آگهی‌های این قسمت تموم شد :)
                    </p>
                )}
            </div>
        </div>
    );
};

export default CardsListClient;
