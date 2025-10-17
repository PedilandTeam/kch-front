import { API_ROUTES } from "@/routes";
import type { City } from "@/schemas";
import type { Category } from "@/types/category";
import joiner from "@/utils/joiner";

const fetchCities = async function (
  countryCode: string,
  unitIds: number,
  categoryIds?: number | number[],
): Promise<City[]> {
  let cities: City[];

  try {
    cities = await (
      await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {
        page: 1,
        limit: 100,
        unitIds: unitIds,
        categoryIds: joiner(categoryIds),
      })
    ).json();
  } catch (err) {
    console.error(await err);
    throw new Error("error in get cities fetchCities");
  }

  return cities;
};

const fetchCategories = async function (
  countryCode: string,
  unitIds: number | number[],
  cityIds?: number | number[],
): Promise<Category[]> {
  let categories: Category[];

  try {
    categories = await (
      await API_ROUTES.CATEGOREIS.BY_COUNTRY(countryCode, {
        page: 1,
        limit: 100,
        unitIds: joiner(unitIds),
        cityIds: joiner(cityIds),
      })
    ).json();
  } catch (err) {
    console.error(err);
    throw new Error("Error in get Categories fetchCategories");
  }

  return categories!;
};
