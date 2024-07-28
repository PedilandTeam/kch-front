
export interface Get {
    items: Item[];
    meta:  Meta;
}

export interface Item {
    createdDate: Date;
    updateDate:  Date;
    status:      boolean;
    id:          string;
    title:       string;
    text:        string;
    country:     Country;
    user:        null;
    botUser:     BotUser;
    topic:       Topic;
    answers:     Answer[];
    votes:       Vote[];
}

export interface Answer {
    createdDate: Date;
    updateDate:  Date;
    status:      boolean;
    id:          string;
    text:        string;
    isGreen:     boolean;
}

export interface BotUser {
    firstname: string;
    lastname:  string;
    username:  string;
    level:     number;
}

export interface Country {
    createdDate:  Date;
    updateDate:   Date;
    status:       boolean;
    availability: boolean;
    id:           number;
    name:         string;
    code:         string;
    iso2:         string;
    iso3:         string;
    englishName:  string;
    areaCode:     number;
    currency:     null;
    currencyName: null;
}

export interface Topic {
    id:          string;
    title:       string;
    description: string;
    slug:        string;
}

export interface Vote {
    createdDate: Date;
    updateDate:  Date;
    id:          string;
    type:        string;
}

export interface Meta {
    currentPage:  number;
    itemCount:    number;
    itemsPerPage: number;
    totalItems:   number;
    totalPages:   number;
}

export namespace QuestionNamespace {    
    export type GET = Get
}