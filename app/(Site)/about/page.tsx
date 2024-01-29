import PageHead from './page-head';
import { Metadata } from 'next';
import TextSec from './text';

export const metadata: Metadata = {
    title: 'کوچا | درباره ما',
    description:
        'به جامعه ایرانیان مهاجر مقیم همه جا خوش آمدید. در این صفحه اطلاعات کاملی درباره برند کوچا بدست می آورید و با موسسان، داستان شکل گیری، چشم انداز و اهداف پیش روی آن آشنا می شوید.',
    alternates: {
        canonical: `/about`,
    },
};

const AboutPage = () => {
    return (
        <div className='page-wrap static'>
            <PageHead />
            <TextSec />
        </div>
    );
};

export default AboutPage;
