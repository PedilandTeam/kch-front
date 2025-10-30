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
  console.log("🎯 ItemCardsList received pages:", pages);
  console.log("🎯 ItemCardsList pages.items:", pages?.items);
  console.log("🎯 ItemCardsList pages.items.length:", pages?.items?.length);
  
  // Debug first item structure
  if (pages?.items && pages.items.length > 0) {
    console.log("🔍 First item structure:", pages.items[0]);
    console.log("🔍 First item category:", pages.items[0].category);
    console.log("🔍 First item unit:", pages.items[0].unit);
    console.log("🔍 First item city:", pages.items[0].city);
  }

  return (
    <div className="_item-cards-list flex flex-col gap-4 px-4">
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
          <div className="text-center py-8 text-gray-500">
            {pages ? "No items found" : "Loading..."}
          </div>
        )}
      </div>

      {pages?.meta?.totalPages! > 1 ? <ListPagination pages={pages!} /> : null}
    </div>
  );
};
