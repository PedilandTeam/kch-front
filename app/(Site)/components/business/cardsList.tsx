import { PageNamespace } from '@/types/page';
import { CountryNamespace } from '@/types/country';
import { CategoryNamespace } from '@/types/category';
import CardListItem, { CardListItemVariant } from './cardListItem';
import Pagination from '../pagination';
import { API_ROUTES } from '@/routes';
import { UnitType } from '@/types/unit';

type CardsListType = {
    country: CountryNamespace.GET;
    pageNumber?: number;
    city?: number | number[];
    category?: number | number[];
    search?: string;
    variant: CardListItemVariant;
    unit?: UnitType;
};


export const CardsList = async ({
    unit,
    category,
    country,
    pageNumber,
    city,
    search,
    variant
}: CardsListType) => {
    let pages: PageNamespace.GET | undefined;
    let isNotFound = false;

    try {
        pages = await (
            await API_ROUTES.PAGES.GET_ALL(pageNumber ? pageNumber : 1, 30, {
                countryCode: country.code,
                cityIds: city,
                unitId: unit?.id,
                categoryIds: category,
                search,
            })
        ).json();
    } catch (e) {
        isNotFound = true;
    }

    if (pages && pages.items.length == 0) {
        isNotFound = true;
    }

    if (isNotFound) {
        return (
            <div className='flex min-h-[60vh] w-full items-center justify-center'>
                <h3 className='text-2xl font-bold'>
                    با فیلترهای انتخابی چیزی یافت نشد :)
                </h3>
            </div>
        );
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='list-card min-h-[500px] w-full'>
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-6'>
                    {pages?.items?.map(
                        (page: PageNamespace.Page, index: number) => {
                            return (
                                <CardListItem
                                    key={`unit-preview-item-${page.id}`}
                                    variant={variant}
                                    page={page}
                                    country={country}
                                />
                            );
                        }
                    )}
                </div>
            </div>
            {pages?.meta?.totalPages! > 1 ? (
                <Pagination totalPages={pages!.meta.totalPages} />
            ) : null}
        </div>
    );
};
