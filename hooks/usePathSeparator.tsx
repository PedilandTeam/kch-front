

export type usePathSeparatorType = {
    countryOrSlug: string
    unit: string,
    category: string
}
export const usePathSeparator = (path: string[]) => {
    
    return {
        countryOrSlug: path[0],
        ...path.length >= 2 && {unit: path[1]},
        ...path.length == 3 && {category: path[2]}
    }

}