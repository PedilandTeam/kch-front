import { _TXT } from '@/app/text';
import { PageNamespace } from '@/types/page';
import Link from 'next/link';

type ItemBreadCrumbProps = {
    pageData: PageNamespace.Page;
};
export const ItemBreadCrumb = ({ pageData }: ItemBreadCrumbProps) => {
    return (
        <div className=' breadcrumbs text-sm'>
            <ul>
                <li>
                    <Link href={'/'}>{_TXT.GENERAL.HOME}</Link>
                </li>
                <li>
                    <Link href={`/${pageData?.country?.code}`}>
                        {pageData?.country.name}
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/${pageData?.country?.code}/${pageData?.unit?.slug}`}
                    >
                        {pageData?.unit?.name}
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/${pageData?.country?.code}/${pageData?.unit?.slug}/${pageData?.category.slug}`}
                    >
                        {pageData?.category?.name}
                    </Link>
                </li>
            </ul>
        </div>
    );
};
