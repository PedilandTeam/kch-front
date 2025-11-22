import type { Country } from "@/schemas/country";
import type { GetPagesResponse, Page } from "@/types/page";
import { ItemCard } from "./ItemCard";
import { ListPagination } from "../ListPagination";
import { WrapContainer } from "@/components/layout/WrapContainer";

interface ItemCardsListProps {
  pages?: GetPagesResponse;
  country: Country;
}

export const ItemCardsList = ({ pages, country }: ItemCardsListProps) => {
  return (
    <WrapContainer>
      <div className="_item-cards-list flex flex-col gap-4">
        <div className="space-y-3">
          {pages?.items && pages.items.length > 0 ? (
            pages.items.map((page: Page) => {
              return (
                <ItemCard
                  key={`unit-preview-item-${page.id}`}
                  variant="unit"
                  page={page}
                  country={country}
                />
              );
            })
          ) : (
            <div className="flex min-h-[420px] items-center justify-center py-8">
              <p className="text-center text-white">آیتمی وجود ندارد</p>
            </div>
          )}
        </div>

        {pages?.meta?.totalPages! > 1 ? (
          <ListPagination pages={pages!} />
        ) : null}
      </div>
    </WrapContainer>
  );
};
