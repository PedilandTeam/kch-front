

export type usePathSeparatorType = {
    countryOrSlug: string
    unit: string
}
export const usePathSeparator = (path: string[]) => {

    return {
        countryOrSlug: path[0],
        unit: path[1],
    }

}