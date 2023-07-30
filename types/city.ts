import { CountryNamespace } from "./country"


export  namespace CityNamespace {
    
    export type city = {
        id: number,
        name: string,
        country: CountryNamespace.GET
        englishName?: string
    }
    export interface GET {
        items: city[],
        meta: {
          currentPage: number,
          itemCount: number,
          itemsPerPage: number,
          totalItems: number,
          totalPages: number
        }
    }
}