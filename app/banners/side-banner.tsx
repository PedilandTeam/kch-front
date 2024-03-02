import Link from 'next/link';

const SideBanner = () => {
    return (
        <div className='side-banners'>
            <div className="add-info flex flex-wrap rounded-xl bg-blue-900 bg-[url('/images/bg-01.png')] bg-contain bg-right-top bg-no-repeat p-5 pt-4 sm:max-h-[262px]">
                <p className='shadow-tlx w-full text-center text-[26px] font-semibold leading-[42px] text-white sm:text-[22px] sm:leading-[39px]'>
                    میدونسـتی
                    <br />
                    <span className='text-yellow-900'>ثـبـت اطلاعـات</span> در
                    <br />
                    راهنمای مشـاغـل کـوچـا
                    <br />
                    <span className='text-yellow-900'>رایـگـانـه؟؟؟</span>
                </p>
                <div className='mx-auto mt-3 text-center'>
                    <Link
                        href={'https://t.me/koochaa_support'}
                        target='_blank'
                        className='shadow-blx group flex h-[52px] items-center justify-center whitespace-pre rounded-full bg-white px-7 text-xl font-medium text-blue-900 transition-all duration-300 hover:bg-yellow-700 hover:text-black'
                    >
                        کافیه اینجا{' '}
                        <span className='text-yellow-900 transition-all duration-300 group-hover:text-black'>
                            کلیـک
                        </span>{' '}
                        کنی
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default SideBanner;
