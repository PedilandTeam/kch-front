import type { Country } from "@/schemas/country";
import type { GetPagesResponse, Page } from "@/types/page";

import { ItemCard, ListPagination } from "@components";

interface ItemCardsListProps {
  pages?: GetPagesResponse;
  country: Country;
}

export const ItemCardsList = ({
  pages,
  country,
}: ItemCardsListProps) => {

  return (
    <div className="_item-cards-list flex flex-col gap-4 px-4">
      <div className="space-y-3">
        {pages?.items?.map((page: Page) => {
          return (
            <ItemCard
              key={`unit-preview-item-${page.id}`}
              variant="unit"
              page={page}
              country={country}
            />
          );
        })}
      </div>

      {pages?.meta?.totalPages! > 1 ? <ListPagination pages={pages!} /> : null}
    </div>
  );
};
