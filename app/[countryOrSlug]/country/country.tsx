import { CountryStats } from './countryStats';
import { CountryCategories } from './countryCategories';
import { SliderHome } from './slider';
import { CountryNamespace } from '@/types/country';
import { CategoryNamespace } from '@/types/category';
import { UnitsBanner } from './unitsBanner';
import { SeoText } from './seoText';

type CountryProps = {
  currentCountry: CountryNamespace.GET;
  categories: CategoryNamespace.GET;
};
export default function Country({ currentCountry, categories }: CountryProps) {
  return (
    <div className='component page-country'>
      <SliderHome currentCountry={currentCountry} />
      <UnitsBanner currentCountry={currentCountry} />
      <CountryStats currentCountry={currentCountry} />
      <CountryCategories currentCountry={currentCountry} />
      <SeoText currentCountry={currentCountry} />
    </div>
  );
}
