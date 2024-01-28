import { Metadata } from 'next';
import { HomeCountries } from './home/countries';
import { SliderMainHome } from './home/slider';
import HomeBottom from './home/bottom';

export const metadata: Metadata = {
  title: 'کوچا | جامعه ایرانیان مهاجر مقیم همه جا',
  description:
    'هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری و به سادگی رفع کنید. از معرفی مشاغل محلی گرفته تا پزشکانی که به زبان فارسی صحبت می کنند.',
};
export default function Page() {
  return (
    <div className='component page-home w-full sm:mx-auto sm:max-w-[95%]'>
      <SliderMainHome />
      <HomeCountries />
      <HomeBottom />
    </div>
  );
}
