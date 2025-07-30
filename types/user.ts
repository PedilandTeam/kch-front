import { CityNamespace } from './city';
import { CountryNamespace } from './country';

export interface IUser {
    id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    firstname: string;
    lastname: string;
    country: CountryNamespace.GET;
    city: CityNamespace.city | null;
    ads: any[];
    lastAd: Date | null;
    balance: number;
    currency: string;
    currencyName: string;
}
