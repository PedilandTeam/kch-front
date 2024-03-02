import { Skeleton } from '@nextui-org/skeleton';
import ContentLoader from 'react-content-loader';

export default function CardSkeleton() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='list-card min-h-[500px] w-full'>
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-6'>
                    {Array.from({ length: 12 }).map((skeleton: any, index) => {
                        return (
                            <div
                                key={`cardlist-page-index-${index}`}
                                className='card border border-gray-100 shadow-lg hover:border-gray-300'
                            >
                                <figure className='pt-5'>
                                    <ContentLoader width={140} height={140}>
                                        <rect
                                            x='0'
                                            y='0'
                                            rx='100'
                                            ry='100'
                                            width='140'
                                            height='140'
                                        />
                                    </ContentLoader>
                                </figure>
                                <div className='card-body px-4 py-5'>
                                    <ContentLoader
                                        height={30}
                                        className='flex w-full items-center justify-center'
                                    >
                                        <rect
                                            x='0'
                                            y='0'
                                            rx='5'
                                            ry='5'
                                            width='100%'
                                            height='30'
                                        />
                                    </ContentLoader>

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
                                    <ContentLoader
                                        height={20}
                                        className='flex w-full items-center justify-center'
                                    >
                                        <rect
                                            x='0'
                                            y='0'
                                            rx='5'
                                            ry='5'
                                            width='100%'
                                            height='20'
                                        />
                                    </ContentLoader>

                                    <div className='card-tools mb-1 flex w-full justify-center text-[15px] text-gray-600'>
                                        <div className='ml-2 flex'>
                                            {/* <CircleFlag
                        alt={`پرچم کشور ${country.name}`}
                        width={5}
                        height={5}
                        countryCode={page?.country?.code}
                        className="w-5 ml-1"
                        title={page?.country?.name}
                      /> */}
                                            {/* <p className="truncate">{page?.city?.name}</p> */}
                                        </div>
                                        <div className='flex content-center justify-center'>
                                            {/* <FolderIcon className="w-5 ml-1 text-gray-400" /> */}
                                            {/* {variant == "category" ? (
                        <span className="truncate">{page?.category?.name}</span>
                      ) : (
                        <Link
                          href={categoryPathGenerator(
                            country.code,
                            page.unit?.slug,
                            page.category.slug
                          )}
                        >
                          <span className="truncate">{page?.category?.name}</span>
                        </Link>
                      )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
