import { Category } from "./page"

export type UnitType = {
    id: number
    name: string
    slug: string
    createdDate: string
    updateDate: string
    categories: Category[]
}