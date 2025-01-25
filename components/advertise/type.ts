import { CampaignNamespace } from "@/types/campaign";

export type AdvertiseProps = {
    customers: CampaignNamespace.ICampaignCustomer[] | any[];
    campaignId: string | undefined;
    from: 'country' | 'category' | 'unit' | 'item'
  };