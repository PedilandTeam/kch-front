


export namespace PageNamespace{
    export interface GET {
        id:          number;
        slug:        string;
        createdDate: Date;
        updatedDate: Date;
        title:       string;
        description: string;
        address:     Address;
        socials?:    Partial<Socials>;
        contact:     null;
        profile:     null;
        status:      boolean;
        pictures:    any[];
        unit:        Category;
        category:    Category;
        city:        City;
        country:     Country;
    }
    
}


export interface Socials {
    [key: string]: string | undefined
    website: string;
    youtube: string;
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
}
export interface Address {
    country: string;
    city:    string;
}

export interface Category {
    id:          number;
    name:        string;
    slug:        string;
    createdDate: Date;
    updateDate:  Date;
}

export interface City {
    id:   number;
    name: string;
}

export interface Country {
    id:   number;
    name: string;
    code: string;
}

