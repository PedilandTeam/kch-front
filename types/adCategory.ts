
export namespace AdCategoryNamepace {
    export interface IAdCategory {
        id: number;
        title: string;
        slug: string;
        description: string;
        parent: IAdCategory
    }

    export interface UPDATE extends Partial<Omit<IAdCategory, 'parent'>> {
        parentId?: number
    }
}
