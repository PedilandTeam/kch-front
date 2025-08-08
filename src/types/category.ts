// src/types/category.ts
import { Meta } from "./meta";
import { UnitType } from "./unit";

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdDate: string;
  updateDate: string;
  unit: UnitType;
  seoTitle: string;
  seoDescription: string;
}

export interface MostUsedCategory extends Category {
  pageCount: number;
  unitId: number;
}

export interface GetCategoryResponse {
  items: Category[];
  meta: Meta;
}

export type RecentlyUpdatedCategories = Record<string, Category[]>;

export type MostUsedCategories = Record<string, MostUsedCategory[]>;
