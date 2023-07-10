

export type usePathSeparatorType = {
    countryOrSlug: string
    unitOrCategory: string
}
export const usePathSeparator = (path: string[]) => {

    return {
        countryOrSlug: path[0],
        unitOrCategory: path[1],
    }

}