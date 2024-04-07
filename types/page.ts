import { CityNamespace } from "./city";
import { CountryNamespace } from "./country";



export namespace PageNamespace {
    export interface GET {
        items: Page[]
        meta: {
            currentPage: number,
            itemCount: number,
            itemsPerPage: number,
            totalItems: number,
            totalPages: number
        }
    }

    export interface Page {
        id: number;
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
        unit: Category;
        category: Category;
        city: CityNamespace.city;
        country: CountryNamespace.GET;
    }

}

export interface Contact {
    [key: string]: string | undefined
    telephone: string;
    phone: string;
    whatsapp: string;
    fax: string
    email: string
}

export interface Socials {
    [key: string]: string | undefined
    website: string;
    youtube: string;
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    telegram: string;
}
export interface Address {
    country: string;
    city: string;
    address: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    createdDate: Date;
    updateDate: Date;
}


export interface Country {
    id: number;
    name: string;
    code: string;
}

