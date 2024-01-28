import Image from 'next/image';
import phImage from '../../public/images/phead/ph-jobs-01.webp';
import phImageMobile from '../../public/images/phead/ph-jobs-01-m.webp';

const PageHead = () => {
  return (
    <div className='page-head'>
      <Image
        className='hidden h-[300px] rounded-xl object-cover brightness-[.60] sm:block'
        src={phImage}
        placeholder='blur'
        width={1700}
        height={300}
        alt='a tennis ball in field'
        priority
      />
      <Image
        className='rounded-xl object-cover brightness-[.60] sm:hidden'
        src={phImageMobile}
        placeholder='blur'
        width={430}
        height={430}
        alt='a tennis ball in field'
        priority
      />
      <div className='content'>
        <div className='wrap text-white'>
          <h1>فرصت‌های شغلی</h1>
          <h2>به دنبال‌ تخصص تـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHead;
