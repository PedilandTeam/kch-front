import { CityNamespace } from "./city";
import { Country } from "./country";

export interface IUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  firstname: string;
  lastname: string;
  country: Country;
  city: CityNamespace.city | null;
  ads: any[];
  lastAd: Date | null;
  balance: number;
  currency: string;
  currencyName: string;
}
