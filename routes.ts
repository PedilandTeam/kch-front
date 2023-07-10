
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
type requestCacheType = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
type paramType = {
    [key: string]: string | number
}
type configType = {cache?: requestCacheType, revalidate?: number}
type requestType = {
    path: string, method?: string, params?: paramType, body?: any
}

const baseFetch = async ({path, method = "GET", params, body}: requestType, {cache, revalidate}: configType): Promise<Response> => {

    return new Promise((resolve, reject) => {

        let queryParametrs: URLSearchParams | undefined
        
        if(params){
            queryParametrs = new URLSearchParams()  
            for(const param in params){
                queryParametrs.append(param, `${params[param]}`)
            }
        }
        
        let url = queryParametrs ? `${API_URL}/${path}?${queryParametrs}` : `${API_URL}/${path}`
        fetch(url, {body, cache, next: { ...revalidate && {revalidate} }, method, })
            .then((res: Response) => {
                if(!res.ok){
                    res.json().then(res => console.log(res))
                    reject()
                }
                resolve(res)
            })
            .catch(error => {
                console.log(error);                
                reject(error)
            })
    })
}

export const API_ROUTES = {
    PAGES: {
        GET_ALL: (page: number, limit: number, slug?: string, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path:"pages", method:"GET", params:{page, limit, ...slug && {slug}}},  {...cache && {cache}, ...revalidate && {revalidate}})
        },
        GET_ONE: (id: string , revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: `pages/${id}`, method: "GET"},  {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    COUNTRIES: {
        GET_ALL: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "countries", method: "GET"},  {...cache && {cache}, ...revalidate && {revalidate}})
        },
    },
    CITIES: {
        GET_ALL: (page: number = 1, limit: number = 20, countryCode?: string ,revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "cities", method: "GET", params:{page, limit, ...countryCode && {countryCode}}}, {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    UNITS: {
        GET_ALL: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "units"}, {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    CATEGOREIS: {
        GET_ALL: (page: number, limit: number, slug?: string, unitId?: number, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "categories", params: { page, limit,...slug &&{slug},...unitId && {unitId}}}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
        RECENTLY_UPDATED: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "categories/recentlyUpdated"}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
        MOST_USED: (countryCode?: string, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "categories/mostUsed", params:{...countryCode && {countryCode}}}, {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    STATS: {
        OVERVIEW: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "stats"}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
        COUNTRY_STATS: (countryCode: string, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: `stats/${countryCode}`}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
    }
} 
