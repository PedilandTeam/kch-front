import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import { UnitType } from "@/types/unit";
import joiner from "@/utils/joiner";
import { notFound } from "next/navigation";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";
import { CountryNamespace } from "@/types/country";
import { Suspense } from "react";
import Loading from "../_loading";
import FilterMobile from "./filter/filter.mobile";
import FilterModalMobile from "./filter/filterModal.mobile";
import Image from "next/image";
import PagesSearch from "./filter/pages.search";

type PagesListProps = {
  category: CategoryNamespace.category;
  country: CountryNamespace.GET;
  unit: UnitType;
  pageNumber: number;
  city: number | number[];
  search: string;
};

async function fetchCities(
  countryCode: string,
  categoryId: number
): Promise<CityNamespace.GET> {
  let cities: CityNamespace.GET;

  try {
    cities = await (
      await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {
        page: 1,
        limit: 100,
        categoryIds: joiner(categoryId),
      })
    ).json();
  } catch (e) {
    console.log(await e);
    throw new Error("error in get cities fetchCities");
  }

  return cities;
}

export default async function CategoryList({
  category,
  country,
  unit,
  pageNumber,
  city,
  search,
}: PagesListProps) {
  if (!country) return notFound();
  const cities = await fetchCities(country.code, category.id);

  return (
    <div className="pt-5 component _category-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="_page-content">
          <div className="_top-section">
            <div className="flex flex-wrap items-center justify-between w-full pb-5 sm:flex-nowrap">
              <div className="flex items-center gap-3 px-3 mb-4 sm:mb-0 sm:px-0">
                <h1 className="text-xl font-bold sm:text-2xl text-secondary">
                  لیست{" "}
                  {category?.seoTitle
                    ? category.seoTitle
                    : `${category.name} فارسی زبان`}{" "}
                  در {country?.name}
                </h1>
                <span className="hidden font-medium text-gray-500 sm:inline">
                  (130 آیتم)
                </span>
              </div>
              <ItemBreadCrumb
                unit={unit}
                category={category}
                country={{ name: country.name, code: country.code }}
              />
            </div>

            {/* Advertising Section P03 */}
            <div className="flex flex-wrap gap-3 px-3 sm:gap-5 sm:px-0">
              <div>
                <Image
                  src={"/images/banner/bnr-04.gif"}
                  width={562}
                  height={72}
                  alt="banner"
                />
              </div>
              <div className="hidden sm:block">
                <Image
                  src={"/images/banner/bnr-04.gif"}
                  width={562}
                  height={72}
                  alt="banner"
                />
              </div>
            </div>

            <div className="hidden sm:block _filter">
              <ListFilter cities={cities} />
            </div>
          </div>

          <div className="pt-2 sm:pt-0">
            <div className="sticky top-0 z-[9] p-3 bg-white sm:hidden">
              <FilterMobile />
              <FilterModalMobile cities={cities.items} />
            </div>
            <div className="px-3 pb-5 sm:hidden">
              <PagesSearch />
            </div>

            {/* Cards List */}
            <Suspense
              fallback={<Loading />}
              key={`unit-cardlist-${search}-${city}-${category}`}
            >
              <CardsList
                category={category}
                country={country}
                pageNumber={pageNumber}
                city={city}
                search={search}
              />
            </Suspense>
          </div>

          {/* Advertising Section P04 */}
          <div className="flex flex-wrap gap-3 px-3 sm:gap-5 sm:px-0 my-14">
            <div>
              <Image
                src={"/images/banner/bnr-04.gif"}
                width={562}
                height={72}
                alt="banner"
              />
            </div>
            <div>
              <Image
                src={"/images/banner/bnr-04.gif"}
                width={562}
                height={72}
                alt="banner"
              />
            </div>
          </div>

          {/* SEO Text */}
          <div className="overflow-hidden mx-7 _SEO-text sm:mx-0">
            <p className="font-normal text-justify text-gray-500">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
