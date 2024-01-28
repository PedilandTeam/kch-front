import DataBox from '@/components/global/dataBox';
import { useUser } from '@/store/useUser';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Overview() {
  const { user } = useUser();

  return (
    <div className='flex w-full flex-col items-center justify-center px-2 pt-12 lg:items-start lg:px-0 lg:pr-5'>
      <p className='text-xl font-medium'>
        خوش اومدی {user?.firstname} {user?.lastname}!
      </p>
      <p>از اینجا میتونی یکسری اطلاعات راجب آگهی‌هات ببینی</p>

      <div className='mt-12'></div>
      <div className='flex w-full flex-col gap-2 lg:flex-row'>
        <DataBox
          title='کل آگهی های تایید شده شما:'
          data={user?.ads?.length || 0}
          link={'/account/ads'}
          linkText={'مشاهده'}
        />
        <DataBox
          title='اعتبار'
          data={30}
          link={'/account/balance'}
          linkText={'مدیریت‌مالی'}
        />
      </div>
    </div>
  );
}
