import { CountryNamespace } from '@/types/country';

type SeoTextProps = {
  currentCountry: CountryNamespace.GET;
};

export const SeoText = async ({ currentCountry }: SeoTextProps) => {
  return (
    <div className='container mx-auto max-w-[1144px]'>
      <div className='seo-text my-8 text-center sm:my-20'>
        <h1 className='inline-block text-[16px] font-semibold text-gray-600 sm:text-[20px]'>
          {`کـوچـا، جامعه ایرانیان مهاجر مقیم ${currentCountry.name}!`}
        </h1>
        <p></p>
      </div>
    </div>
  );
};
