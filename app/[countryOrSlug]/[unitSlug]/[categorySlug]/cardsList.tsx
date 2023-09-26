import { PageNamespace } from "@/types/page";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";
import CardListItem from "../cardListItem";
import Pagination from "../pagination/pagination";

type CardsListType = {
  category: CategoryNamespace.category;
  country: CountryNamespace.GET;
  pages: PageNamespace.GET;
};

type ParsedSearchParamsType = {
  city?: string[] | string;
  category?: string[] | string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CardsList = ({ category, country, pages }: CardsListType) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="list-card min-h-[500px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-6">
          {pages?.items?.map((page: PageNamespace.Page, index: number) => {
            return (
              <CardListItem
                key={`unit-preview-item-${page.id}`}
                variant="unit"
                page={page}
                country={country}
              />
            );
          })}
        </div>
      </div>

      <Pagination pages={pages} />
    </div>
  );
};
