export namespace AdCategoryNamepace {
    export interface IAdCategory {
        id: number;
        name: string;
        slug: string;
        description: string;
        parent: IAdCategory;
        subCategories: IAdCategory[];
    }

    export interface UPDATE extends Partial<Omit<IAdCategory, 'parent'>> {
        parentId?: number;
    }
}
