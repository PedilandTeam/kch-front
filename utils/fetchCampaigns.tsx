import { CampaignNamespace } from "@/types/campaign";

export default async function fetchCampaigns(
  countryCode: string
): Promise<{
  campaign?: CampaignNamespace.ICampaign;
  customers: CampaignNamespace.ICampaignCustomer[] | any[];
}> {
  let campaignsList: CampaignNamespace.GET;
  let campaign;
  let customers: CampaignNamespace.ICampaignCustomer[] = [];

  try {
    const response = await fetch(
      `${process.env.API_URL}/campaign?countryCode=${countryCode}&page=1&limit=1`,
      {
        next: {
          revalidate: 30,
        },
      }
    );
    campaignsList = await response.json();

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch campaigns: ${errorText}`);
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Error while fetching campaigns:", error);
    throw error;
  }

  if (campaignsList.items.length > 0) {
    campaign = campaignsList.items[0];
    if (!campaign) return { campaign, customers };
    customers = Object.keys(campaign)
      .map((key) => (key.includes("Customer") ? campaign![key] : null))
      .map((value) => ({ value, sort: Math.random() * 100 }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .filter((c) => c?.isActive === true);
  }
  return { campaign, customers };
}
