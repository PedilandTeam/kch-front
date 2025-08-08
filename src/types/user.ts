import { City } from "./city";
import { Country } from "./country";

export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  level: number;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  firstname: string;
  lastname: string;
  country: Country;
  city: City | null;
  ads: any[];
  lastAd: Date | null;
  balance: number;
  currency: string;
  currencyName: string;
}
