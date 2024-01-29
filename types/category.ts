import { UnitType } from './unit';

export namespace CategoryNamespace {
    export interface category {
        id: number;
        name: string;
        slug: string;
        createdDate: string;
        updateDate: string;
        unit: UnitType;
        seoTitle: string;
    }

    export interface MostUsedCategory extends category {
        pageCount: number;
        unitId: number;
    }

    export interface GET {
        items: category[];
        meta: {
            currentPage: number;
            itemCount: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
        };
    }

    export interface RECENTLY_UPDATED {
        [key: string]: category[];
    }
    export interface MOST_USED {
        [key: string]: MostUsedCategory[];
    }
}
