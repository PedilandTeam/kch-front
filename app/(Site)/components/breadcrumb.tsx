'use client';
import { _TXT } from '@/app/text';
import Link from 'next/link';

type PathItem = {
    path?: string,
    name?: string
}
type BreadCrumb = {

    items: PathItem[]

};
export const BreadCrumb: React.FC<BreadCrumb> = ({ items }) => {
    return (
        <div className='breadcrumbs bg-blue-50 px-4 py-3 text-sm sm:bg-transparent'>
            <ul>
                <li>
                    <Link href='/'>{_TXT.GENERAL.HOME}</Link>
                </li>
                {
                    items?.map(item => {
                        return <li key={item.path}>
                            <Link href={item.path || ''} >{item.name ? item.name : item.path}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
    );
};
