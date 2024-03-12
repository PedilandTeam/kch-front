import { UnitType } from '@/types/unit';
import wretch from 'wretch';
import { WretchError } from 'wretch/resolver';
import fetchWrapper from './fetchWrapper';

export type FetchUnit = { slug: string; revalidate: number };
export default async function fetchUnits(filters: FetchUnit, revalidate?: number): Promise<UnitType[]> {
    return await fetchWrapper('/units', { filters: filters, isPaginated: false, revalidate: revalidate });
}
