


export const usePathSeparator = (path: string[]) => {

    return {
        countryOrSlug: path[0],
        unit: path[1],
    }

}