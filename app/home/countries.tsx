import { _TXT } from '@/app/text';
import { API_ROUTES } from '@/routes';
import { CountryNamespace } from '@/types/country';
import Image from 'next/image';
import Link from 'next/link';
import CountryModalBtn from './countryModalBtn';
import atImage from '../../public/images/modules/mod-austria-min.jpg';
import frImage from '../../public/images/modules/mod-france-min.jpg';
import deImage from '../../public/images/modules/mod-germany-min.jpg';
import trImage from '../../public/images/modules/mod-turkey-min.jpg';
import ukImage from '../../public/images/modules/mod-england-min.jpg';
import dkImage from '../../public/images/modules/mod-denmark-min.jpg';

async function fetchCountries() {
  let countries: CountryNamespace.GET[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL()).json();
  } catch (e) {
    console.log(e);
    throw new Error('error in get countries');
  }
  return countries;
}

export const HomeCountries = async () => {
  const countries: CountryNamespace.GET[] = await fetchCountries();

  const getCount = (countryCode: string) => {
    return countries.find(
      (country: CountryNamespace.GET) => country.code == countryCode
    )?.pageCount;
  };

  return (
    <div className='sm:mt-18 container mx-auto my-12 max-w-[1144px] sm:mb-24'>
      <div className='mod-home-countries mx-3 pt-4 sm:mx-0' id='select-country'>
        <div className='mod-header mb-5 border-r-[4px] border-secondary pl-3 pr-3 sm:mb-7 sm:border-r-[5px] sm:pl-0 sm:pr-4'>
          <h2 className='text-[20px] font-semibold sm:text-[22px]'>
            {_TXT.COUNTRY.POPULAR}
          </h2>
        </div>
        <div className='wrap grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3'>
          <div className='group relative h-min overflow-hidden rounded-xl'>
            <Link href={'/at'}>
              <Image
                src={atImage}
                placeholder='blur'
                width='400'
                height='250'
                alt='یک تصویر از کشور اتریش'
                className='h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110 sm:h-auto'
                priority
              />
              <div className='info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10 sm:py-5 sm:group-hover:py-8'>
                <h3 className='text-center text-[20px] font-semibold'>
                  {_TXT.COUNTRY.AUSTRIA}
                  <span className='mr-1 font-normal'>({getCount('at')})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className='group relative h-min overflow-hidden rounded-xl'>
            <Link href={'/fr'}>
              <Image
                src={frImage}
                placeholder='blur'
                width='400'
                height='250'
                alt='یک تصویر از کشور فرانسه'
                className='h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110 sm:h-auto'
                priority
              />
              <div className='info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10 sm:py-5 sm:group-hover:py-8'>
                <h3 className='text-center text-[20px] font-semibold'>
                  {_TXT.COUNTRY.FRANCE}
                  <span className='mr-1 font-normal'>({getCount('fr')})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className='group relative h-min overflow-hidden rounded-xl'>
            <Link href={'/de'}>
              <Image
                src={deImage}
                placeholder='blur'
                width='400'
                height='250'
                alt='یک تصویر از کشور آلمان'
                className='h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110 sm:h-auto'
                priority
              />
              <div className='info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10 sm:py-5 sm:group-hover:py-8'>
                <h3 className='text-center text-[20px] font-semibold'>
                  {_TXT.COUNTRY.GERMANY}
                  <span className='mr-1 font-normal'>({getCount('de')})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className='group relative h-min overflow-hidden rounded-xl'>
            <Link href={'/uk'}>
              <Image
                src={ukImage}
                placeholder='blur'
                width='400'
                height='250'
                alt='یک تصویر از کشور انگلستان'
                className='h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110 sm:h-auto'
                priority
              />
              <div className='info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10 sm:py-5 sm:group-hover:py-8'>
                <h3 className='text-center text-[20px] font-semibold'>
                  {_TXT.COUNTRY.ENGLAND}
                  <span className='mr-1 font-normal'>({getCount('uk')})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className='group relative h-min overflow-hidden rounded-xl'>
            <Link href={'/dk'}>
              <Image
                src={dkImage}
                placeholder='blur'
                width='400'
                height='250'
                alt='یک تصویر از کشور دانمارک'
                className='h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110 sm:h-auto'
                priority
              />
              <div className='info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10 sm:py-5 sm:group-hover:py-8'>
                <h3 className='text-center text-[20px] font-semibold'>
                  {_TXT.COUNTRY.DENMARK}
                  <span className='mr-1 font-normal'>({getCount('dk')})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className='group relative h-min overflow-hidden rounded-xl'>
            <Link href={'/tr'}>
              <Image
                src={trImage}
                placeholder='blur'
                width='400'
                height='250'
                alt='یک تصویر از کشور ترکیه'
                className='h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110 sm:h-auto'
                priority
              />
              <div className='info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10 sm:py-5 sm:group-hover:py-8'>
                <h3 className='text-center text-[20px] font-semibold'>
                  {_TXT.COUNTRY.TURKEY}
                  <span className='mr-1 font-normal'>({getCount('tr')})</span>
                </h3>
              </div>
            </Link>
          </div>
        </div>
        <CountryModalBtn />
      </div>
    </div>
  );
};
