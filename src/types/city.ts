// src/types/city.ts
import { Country } from "./country";
import { Meta } from "./meta";

export interface City {
  id: number;
  name: string;
  country: Country;
  englishName?: string;
}

export interface GetCitiesResponse {
  items: City[];
  meta: Meta;
}
