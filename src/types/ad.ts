import { AdCategoryNamepace } from "./adCategory";
import { CityNamespace } from "./city";
import { Country } from "./country";
import { IUser } from "./user";

export namespace AdNamespace {
  export interface IAd {
    id: string;
    title: string;
    description: string;
    pictures: string[];
    country: Country;
    city: CityNamespace.city;
    user: IUser;
    createdDate: Date;
    updatedDate: Date;
    category: AdCategoryNamepace.IAdCategory;
    price: number;
    availability: boolean;
  }

  export type GET = {
    items: IAd[];
    meta: {
      currentPage: number;
      itemCount: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };

  export interface UPDATE
    extends Partial<Omit<IAd, "city" | "country" | "category">> {
    countryId?: number;
    cityId?: number;
    categoryId?: number;
  }
}
