import { X } from "@/app/client-packages/phosphor-icons/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";

const DeleteFilter = () => {
  const searchParams = useSearchParams();
  const categoriesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).category;
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;

  const ENABELED =
    (!!citiesInQuery && citiesInQuery.length > 0) ||
    (!!categoriesInQuery && categoriesInQuery.length > 0);

  const pathname = usePathname();
  const router = useRouter();

  const deleteAllCategoryHandler = () => {
    router.replace(pathname);
  };

  return (
    <div className="tooltip" data-tip="حذف فیلترها">
      <button
        onClick={deleteAllCategoryHandler}
        className={`btn btn-sm btn-circle btn-outline hover:btn-error group ${
          !ENABELED ? "hidden" : ""
        }`}
      >
        <X className="w-5 h-5 group-hover:text-white" />
      </button>
    </div>
  );
};
export default DeleteFilter;
