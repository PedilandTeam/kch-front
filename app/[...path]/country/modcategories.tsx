import { MENU } from "@/components/allTexts";
import Image from "next/image";



export const ModCategories = () => {
  return (
    <div className="mod-categories my-8 sm:my-16">
      <div className="mod-header pr-3 pl-3 mb-7 sm:pr-4 sm:pl-0 border-r-[4px] sm:border-r-[5px] border-pink-600">
        <h2 className="text-[20px] sm:text-[24px] font-bold">
          دسته بندی های بروز شده:
        </h2>
      </div>
      <div className="tabs">
        <a className="tab tab-bordered border-b-[3px] border-orange-300  font-medium h-[46px] text-base tab-active">
          {MENU.BUSINESSES}
        </a>
        <a className="tab tab-bordered border-b-[3px] font-medium h-[46px] text-base">
          {MENU.DOCTORS}
        </a>
        <a className="tab tab-bordered border-b-[3px] font-medium h-[46px] text-base">
          {MENU.FREELANCERS}
        </a>
        <a className="tab tab-bordered border-b-[3px] font-medium h-[46px] text-base">
          {MENU.COMMUNITIES}
        </a>
      </div>
      <div className="content mt-6 grid sm:grid-cols-6 gap-4 mx-3 sm:mx-0">
        <div className="cat-card group">
          <Image
            src="/img/icon/cat-restaurant.svg"
            width="34"
            height="34"
            alt="Restaurant Icon"
          />
          <div className="w-full text-center my-3">رستوران ایرانی</div>
          <span className="tracking-[1px] text-sm group-hover:font-semibold">
            213
          </span>
        </div>
        <div className="cat-card group">
          <Image
            src="/img/icon/cat-restaurant.svg"
            width="34"
            height="34"
            alt="Restaurant Icon"
          />
          <div className="w-full text-center my-3">رستوران ایرانی</div>
          <span className="tracking-[1px] text-sm group-hover:font-semibold">
            213
          </span>
        </div>
        <div className="cat-card group">
          <Image
            src="/img/icon/cat-restaurant.svg"
            width="34"
            height="34"
            alt="Restaurant Icon"
          />
          <div className="w-full text-center my-3">رستوران ایرانی</div>
          <span className="tracking-[1px] text-sm group-hover:font-semibold">
            213
          </span>
        </div>
        <div className="cat-card group">
          <Image
            src="/img/icon/cat-restaurant.svg"
            width="34"
            height="34"
            alt="Restaurant Icon"
          />
          <div className="w-full text-center my-3">رستوران ایرانی</div>
          <span className="tracking-[1px] text-sm group-hover:font-semibold">
            213
          </span>
        </div>
        <div className="cat-card group">
          <Image
            src="/img/icon/cat-restaurant.svg"
            width="34"
            height="34"
            alt="Restaurant Icon"
          />
          <div className="w-full text-center my-3">رستوران ایرانی</div>
          <span className="tracking-[1px] text-sm group-hover:font-semibold">
            213
          </span>
        </div>
        <div className="cat-card group">
          <Image
            src="/img/icon/cat-restaurant.svg"
            width="34"
            height="34"
            alt="Restaurant Icon"
          />
          <div className="w-full text-center my-3">رستوران ایرانی</div>
          <span className="tracking-[1px] text-sm group-hover:font-semibold">
            213
          </span>
        </div>
        <div className="cat-card group">
          <Image
            src="/img/icon/cat-restaurant.svg"
            width="34"
            height="34"
            alt="Restaurant Icon"
          />
          <div className="w-full text-center my-3">رستوران ایرانی</div>
          <span className="tracking-[1px] text-sm group-hover:font-semibold">
            213
          </span>
        </div>
      </div>
    </div>
  );
};
