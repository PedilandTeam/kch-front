import { API_ROUTES } from '@/routes';
import { CategoryNamespace } from '@/types/category';
import { CountryNamespace } from '@/types/country';
import { UnitType } from '@/types/unit';
import { MetadataRoute } from 'next';
import type { PageNamespace } from 'types/page';

function lastModifiedGenerator() {
    const currentDate = new Date();
    const randomHours = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    currentDate.setHours(currentDate.getHours() - randomHours);
    return currentDate;
}

const baseUrl = process.env.FRONT_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let countriesSiteMap: MetadataRoute.Sitemap = [],
        unitsSiteMap: MetadataRoute.Sitemap = [],
        categoriesSiteMap: MetadataRoute.Sitemap = [],
        pagesSiteMap: MetadataRoute.Sitemap = [];
    try {
        const countries: CountryNamespace.GET[] = await (
            await API_ROUTES.COUNTRIES.GET_ALL(1, 100)
        ).json();
        countriesSiteMap = countries.map((country: CountryNamespace.GET) => {
            return {
                url: `${baseUrl}/${country.code}`,
                lastModified: lastModifiedGenerator(),
            };
        });

        const units: UnitType[] = await (
            await API_ROUTES.UNITS.GET_ALL(100)
        ).json();
        unitsSiteMap = [];
        countries.forEach((country: CountryNamespace.GET) => {
            return units.forEach((unit: UnitType) => {
                unitsSiteMap.push({
                    url: `${baseUrl}/${country.code}/${unit.slug}`,
                    lastModified: lastModifiedGenerator(),
                });
            });
        });

        const categoriesGet: CategoryNamespace.GET = await (
            await API_ROUTES.CATEGOREIS.GET_ALL(1, 300)
        ).json();
        const categories: CategoryNamespace.category[] = categoriesGet.items;
        categoriesSiteMap = [];
        countries.forEach((country: CountryNamespace.GET) => {
            return categories.forEach((category) => {
                categoriesSiteMap.push({
                    url: `${baseUrl}/${country.code}/${category.unit.slug}/${category.slug}`,
                    lastModified: lastModifiedGenerator(),
                });
            });
        });

        let page: number = 1;
        let pageEnded = false;
        const pagesGenerator = async (page: number) =>
            await (await API_ROUTES.PAGES.GET_ALL(page, 100, {})).json();
        while (!pageEnded) {
            const pagesGet = await await pagesGenerator(page);
            const pages = pagesGet.items;
            const meta = pagesGet.meta;

            pages.forEach((page: PageNamespace.Page) => {
                pagesSiteMap.push({
                    url: `${baseUrl}/${encodeURIComponent(page.slug)}`,
                    lastModified: page.updateDate,
                });
            });

            if (page == meta.totalPages) {
                break;
            } else {
                page++;
            }
        }
    } catch (e) {
        console.log(e);
    }

    return [
        ...countriesSiteMap,
        ...unitsSiteMap,
        ...categoriesSiteMap,
        ...pagesSiteMap,
    ];
}
