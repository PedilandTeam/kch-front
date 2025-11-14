interface IAdCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: IAdCategory;
  subCategories: IAdCategory[];
}

export type AdCategory = IAdCategory;
