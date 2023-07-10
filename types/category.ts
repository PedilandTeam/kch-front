import { UnitType } from "./unit"


export namespace CategoryNamespace {


    export type category = {
        id: number,
        name: string,
        slug: string,
        createdDate: string,
        updateDate: string
        unit: UnitType
    }
    export interface GET {
        items: category[],
        meta: {
            currentPage: number,
            itemCount: number,
            itemsPerPage: number,
            totalItems: number,
            totalPages: number
        }
    }

}