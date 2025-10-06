import type { City, Country, Meta } from "@/schemas";
import type { Category } from "./category";
import type { Tag } from "./tag";
import type { UnitType } from "./unit";

export interface Page {
  createdDate: string;
  updateDate: string;
  status: boolean;
  availability: boolean;
  id: string;
  verifyDate?: string;
  slug: string;
  level: number;
  title: string;
  subtitle?: string;
  description?: string;
  address: Address;
  socials?: Partial<Socials>;
  contact: Partial<Contact>;
  profile: null;
  haveAvatar: boolean;
  isPersonal: boolean;
  lat: string;
  lng: string;
  locked: boolean;
  category: Category;
  unit: UnitType;
  city: City;
  pictures: Picture[];
  country: Country;
  tags: Tag[];
  business?: {
    username: string;
  };
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
