import { CountryNamespace } from "./country";



export namespace CampaignNamespace {

    export interface ICampaignCustomer {
        isActive: boolean;
        lg?: string;
        md?: string;
        sm?: string;
        link?: string
    }
    
    export type CampaignCustomerType = 'firstCustomer' | 'secondCustomer' | 'thirdCustomer' | 'fourthCustomer';

    export interface ICampaign {
        [key: string]: any;
        id: string;
        country: CountryNamespace.GET;
        firstCustomer: ICampaignCustomer;
        secondCustomer: ICampaignCustomer;
        thirdCustomer: ICampaignCustomer;
        fourthCustomer: ICampaignCustomer;
    }

    export type GET = {
        items: ICampaign[],
        meta: {
          currentPage: number,
          itemCount: number,
          itemsPerPage: number,
          totalItems: number,
          totalPages: number
        }
    }

}