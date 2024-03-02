import PageHead from './page-head';
import JobsText from './text';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'کوچا | فرصت‌های شغلی',
    description: '',
    alternates: {
        canonical: `/terms`,
    },
};

const Jobs = () => {
    return (
        <div className='page-wrap static'>
            <PageHead />
            <JobsText />
        </div>
    );
};

export default Jobs;
