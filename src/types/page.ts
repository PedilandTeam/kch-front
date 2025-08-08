import { CategoryNamespace } from "./category";
import { CityNamespace } from "./city";
import { Country } from "./country";
import { TagNamespace } from "./tag";
import { UnitType } from "./unit";

export namespace PageNamespace {
  export interface GET {
    items: Page[];
    meta: {
      currentPage: number;
      itemCount: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  }

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
    pictures: any[];
    unit: UnitType;
    category: CategoryNamespace.category;
    city: CityNamespace.city;
    country: Country;
    tags: TagNamespace.ITag[];
  }
}

export interface Contact {
  [key: string]: string | undefined;
  telephone: string;
  phone: string;
  whatsapp: string;
  fax: string;
  email: string;
}

export interface Socials {
  [key: string]: string | undefined;
  website: string;
  youtube: string;
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  telegram: string;
}

export interface Address {
  address: string;
  district: string;
  postalCode: string;
  longitude: number;
  latitude: number;
}

export interface Country {
  id: number;
  name: string;
  code: string;
}
