// src/types/tag.ts
import { UnitType } from "./unit";
import { Meta } from "./meta";

export interface Tag {
  id: number;
  name: string;
  unit: UnitType;
}

export interface GetTagsResponse {
  items: Tag[];
  meta: Meta;
}
