import { PageNamespace } from "@/types/page";
import { UnitType } from "@/types/unit";
import { CountryNamespace } from "@/types/country";
import Pagination from "./pagination/pagination";
import CardListItem from "./cardListItem";

type CardsListType = {
  unit: UnitType;
  country: CountryNamespace.GET;
  pages: PageNamespace.GET,
};

type ParsedSearchParamsType = {
  city?: string[] | string;
  category?: string[] | string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CardsList = ({ unit, country, pages }: CardsListType) => {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="list-card min-h-[500px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-4">
          {pages?.items?.map((page: PageNamespace.Page, index: number) => {
            return <CardListItem key={`unit-preview-item-${page.id}`} variant="unit" page={page} pages={pages?.items} index={index} unit={unit} country={country}/>
          })}
        </div>
      </div>

      <Pagination pages={pages} />

    </div>

  );
};
