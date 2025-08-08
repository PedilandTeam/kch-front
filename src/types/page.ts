// src/types/page.ts
import { Category } from "./category";
import { City } from "./city";
import { Country } from "./country";
import { Tag } from "./tag";
import { UnitType } from "./unit";
import { Meta } from "./meta";

export interface Page {
  id: string;
  slug: string;
  createdDate: string;
  updateDate: string;
  title: string;
  business?: {
    username: string;
  };
  verifyDate?: string;
  subtitle?: string;
  description?: string;
  haveAvatar: boolean;
  address: Address;
  socials?: Partial<Socials>;
  contact: Partial<Contact>;
  profile: null;
  status: boolean;
  pictures: Picture[];
  unit: UnitType;
  category: Category;
  city: City;
  country: Country;
  tags: Tag[];
}

export interface Picture {
  url: string;
  alt?: string;
}

export interface Contact {
  telephone?: string;
  phone?: string;
  whatsapp?: string;
  fax?: string;
  email?: string;
  [key: string]: string | undefined;
}

export interface Socials {
  website?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  telegram?: string;
  [key: string]: string | undefined;
}

export interface Address {
  address: string;
  district: string;
  postalCode: string;
  longitude: number;
  latitude: number;
}

export interface GetPagesResponse {
  items: Page[];
  meta: Meta;
}
