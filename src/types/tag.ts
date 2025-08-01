import { UnitType } from "./unit";

export namespace TagNamespace {
  export interface GET {
    items: ITag[];
    meta: {
      currentPage: number;
      itemCount: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  }

  export interface ITag {
    name: string;
    id: number;
    unit: UnitType;
  }
}
