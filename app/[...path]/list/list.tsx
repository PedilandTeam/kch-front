
import { UnitType } from "@/types/unit";
import { ItemBreadCrumb } from "./breadcrumb";
import { ListCards } from "./cards";
import { ListFilter } from "./filter";


type PagesListProps = {
  unit: UnitType
}
export default function PagesList({unit}: PagesListProps) {
  return (
    <div className="component mt-5 page-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-8 gap-y-4 sm:gap-8 px-3 sm:px-0">
          <div className="sidebar sm:col-span-2">
            <ListFilter />
          </div>
          <div className="page-content sm:col-span-6">
            <ItemBreadCrumb />
            <h1 className="text-[20px] font-bold mt-3 mb-5 text-pink-800">لیست مشاغل فارسی زبان</h1>
            <div className="list-card grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-4">
              <ListCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
