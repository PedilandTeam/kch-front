import type { Country } from "@/schemas";
import type { Category } from "./category";
import type { UnitType } from "./unit";

export type PathGeneratorType = {
  type: "category" | "unit" | null;
  props?: {
    country: Country;
    unit: UnitType;
    category: Category;
  };
};
