import type { Category } from "./category";

export type UnitType = {
  id: number;
  name: string;
  slug: string;
  createdDate: string;
  updateDate: string;
  categories: Category[];
};
