import { AdNamespace } from '@/types/ad';

export type AdPAge = {
    ad: AdNamespace.IAd;
};
export default function AdPage({ ad }: AdPAge) {
    return (
        <div className='border-t border-gray-200'>
            <div className='container mx-auto'>
                <h1>{ad.title}</h1>
                <p>{ad.description}</p>
            </div>
        </div>
    );
}
